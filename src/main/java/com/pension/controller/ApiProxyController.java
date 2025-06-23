package com.pension.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.CollectionUtils;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiProxyController {

    private final RestTemplate restTemplate;

    @Value("${booking.api.base}")
    private String bookingApiBase;

    public ApiProxyController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /**
     * 1) JS에서 호출하는 달력 데이터 프록시
     * GET /api/calendar/accommodation/{id}/reservation-calendar?month=...&calendarTypeCode=...&zoneIds=...
     * → https://booking.ddnayo.com/booking-calendar-api/calendar/accommodation/{id}/reservation-calendar?... 로 포워딩
     */
    @GetMapping("/calendar/accommodation/{accId}/reservation-calendar")
    public ResponseEntity<String> calendarProxy(
            @PathVariable String accId,
            @RequestParam Map<String, String> queryParams) {

        MultiValueMap<String,String> params = new LinkedMultiValueMap<>();
        queryParams.forEach(params::add);

        // 1. 외부 URL 조립
        URI uri = UriComponentsBuilder
                .fromHttpUrl(bookingApiBase + "/calendar/accommodation/" + accId + "/reservation-calendar")
                .queryParams(CollectionUtils.toMultiValueMap(params))
                .build(true)
                .toUri();

        // 2. 헤더 세팅 (필요시 인증/쿠키 등 추가)
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        // 3. 외부 API 호출
        HttpEntity<Void> req = new HttpEntity<>(headers);
        ResponseEntity<String> resp = restTemplate.exchange(uri, HttpMethod.GET, req, String.class);

        // 4. 받은 응답 그대로 내려주기
        return ResponseEntity
                .status(resp.getStatusCode())
                .headers(resp.getHeaders())
                .body(resp.getBody());
    }

    /**
     * 2) 예약 생성 API 프록시 (기존 POST /reservation 과 역할이 겹치면 하나로 합치셔도 됩니다)
     */
    @PostMapping(path = "/reservation", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> reservationProxy(@RequestBody Map<String, Object> payload) {
        String url = bookingApiBase + "/reserve";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);
        ResponseEntity<String> resp = restTemplate.exchange(url, HttpMethod.POST, request, String.class);

        return ResponseEntity
                .status(resp.getStatusCode())
                .headers(resp.getHeaders())
                .body(resp.getBody());
    }
}
