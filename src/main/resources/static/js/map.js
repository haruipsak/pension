let mapContainer = document.getElementById('map'), // 지도의 중심좌표
    mapOption = {
        center: new kakao.maps.LatLng(36.312218, 126.515834), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

let map = new kakao.maps.Map(mapContainer, mapOption);

// 지도에 마커
let marker = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(36.312218, 126.515834)
});

let content = '<div class="wrap">' +
    '    <div class="info">' +
    '        <div class="title">' +
    '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
    '        </div>' +
    '        <div class="body">' +
    '            <div class="img">' +
    '                <img src="../img/nemoLogo.jpg"  width="100%">' +
    '           </div>' +
    '            <div class="desc">' +
    '                <div class="ellipsis">충남 보령시 고잠2길 20-5</div>' +
    '                <div><a href="https://map.kakao.com/link/to/난다펜션,36.312218, 126.515834" target="_blank" class="link">길찾기</a></div>' +
    '            </div>' +
    '        </div>' +
    '    </div>' +
    '</div>';

// 마커 위에 커스텀오버레이를 표시합니다
// 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
let overlay = new kakao.maps.CustomOverlay({
    content: content,
    map: map,
    position: marker.getPosition()
});

// 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
kakao.maps.event.addListener(marker, 'click', function() {
    overlay.setMap(map);
});

// 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
function closeOverlay() {
    overlay.setMap(null);
}