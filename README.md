## 1. 서버
  - 개인 NAS 사용
  - Docker: jenkins, tomcat container 사용

## 2. 도메인
  - 호스팅케이알
  - 기존 홈페이지 관리 업체로부터 도메인 소유권 이전

## 3. 커밋 - 배포 과정
  - issue 별 브랜치 생성
  - 작업 종료 후 main 브랜치 full request (issue 닫힘)
  - jenkins build 진행
      1. nas 기존 war 파일 삭제
      2. 신규 war 파일 전송
      3. 톰캣 재시작

## 4. 사용 언어
  - javascript, java, thymeleaf

## 5. 개발 배경
  - 최초는 자체적으로 예약 프로그램 가능하도록 진행
  - 사용자가 관리의 불편함으로 인해 떠나요 예약프로그램 사용 희망하여 변경

## 6. 주소 : https://ndpension.com/
