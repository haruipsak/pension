function savePrice(){
    const selectedRoomType = document.getElementById('roomTypeSelect').value;
    const roomWkPrice= document.getElementById('roomWkPrice').value;
    const roomWkndPrice= document.getElementById('roomWkndPrice').value;
    const roomSWkPrice= document.getElementById('roomSWkPrice').value;
    const roomSWkndPrice= document.getElementById('roomSWkndPrice').value;
    const roomUWkPrice= document.getElementById('roomUWkPrice').value;
    const roomUWkndPrice= document.getElementById('roomUWkndPrice').value;
    const roomSfWkPrice= document.getElementById('roomSfWkPrice').value;
    const roomSfWkndPrice= document.getElementById('roomSfWkndPrice').value;

    // 유효성 검사 (필요시)
    if (!selectedRoomType || selectedRoomType.includes(' ')) {
        alert('방 유형을 선택해주세요.');
        return;
    }

    if((roomWkPrice.length || roomWkndPrice.length ||
        roomSWkPrice.length || roomSWkndPrice.length ||
        roomUWkPrice.length || roomUWkndPrice.length
       ) < 5){
        alert('설정 가격을 확인하세요')
    }

    const params = new URLSearchParams({
        roomType: selectedRoomType,
        roomWkPrice : roomWkPrice,
        roomWkndPrice : roomWkndPrice,
        roomSWkPrice : roomSWkPrice,
        roomSWkndPrice : roomSWkndPrice,
        roomUWkPrice : roomUWkPrice,
        roomUWkndPrice : roomUWkndPrice,
        roomSfWkPrice : roomSfWkPrice,
        roomSfWkndPrice : roomSfWkndPrice
    });

    // fetch 요청의 URL에 쿼리 파라미터를 추가합니다.
    fetch('/savePrice?' + params, { // URL에 파라미터가 추가됩니다.
        method: 'POST', // POST 요청 유지
    }).then(data=>{window.location.reload()})
}

function changePeriod(periodNum, periodNm, periodStart, periodEnd){
    if(periodNm === '해수욕장 개장'){
        periodNm = 'beachOpen';
    }else if(periodNm === '머드 축제'){
        periodNm = 'mudFest';
    }else if(periodNm === '특별 가격'){
        periodNm = 'special' ;
    }

    document.getElementById('slctNum').value = periodNum;
    document.getElementById('slctType').value = periodNm;
    document.getElementById('periodStart').value = periodStart
    document.getElementById('periodEnd').value = periodEnd
}

function deletePeriod(periodNum){
    let params = new URLSearchParams({
        periodNum :periodNum,
    });

    // fetch 요청의 URL에 쿼리 파라미터를 추가합니다.
    fetch('/dltPeriod?' + params, { // URL에 파라미터가 추가됩니다.
        method: 'POST', // POST 요청 유지
    }).then(data=>{window.location.reload()})
}

function savePeriod(){
    let periodNum = document.getElementById('slctNum').value ? document.getElementById('slctNum').value : null;
    let roomTypeSelect = document.getElementById('slctType').value;
    let periodStart = document.getElementById('periodStart').value;
    let periodEnd = document.getElementById('periodEnd').value;

    if((periodStart || periodEnd) == null){
        alert('기간을 설정해주세요')
    }else if(slctType === ' ') {
        alert('기간 이름을 선택해주세요')
    }

    let params = new URLSearchParams({
        periodNum : periodNum,
        periodStart :periodStart,
        periodEnd: periodEnd,
        periodNm : roomTypeSelect,
    });

    // fetch 요청의 URL에 쿼리 파라미터를 추가합니다.
    fetch('/savePeriod?' + params, { // URL에 파라미터가 추가됩니다.
        method: 'POST', // POST 요청 유지
    }).then(data=>{window.location.reload()})
}

document.addEventListener('DOMContentLoaded', function() {
    const priceElements = document.querySelectorAll('.price-value'); // 클래스 선택

    priceElements.forEach(function(element) {
        let rawPrice = element.textContent; // 현재 텍스트(숫자 문자열) 가져오기
        let numericPrice = Number(rawPrice); // 숫자로 변환
        element.textContent = numericPrice.toLocaleString();
    });

    function initRange(startSelector, endSelector) {
        flatpickr(startSelector, {
            locale: "ko",
            dateFormat: "Y-m-d",
            enableTime: false,
            disableMobile: true,
            plugins: [
                new rangePlugin({ input: endSelector })
            ]
        });
    }
        initRange("#periodStart", "#periodEnd");
    });

function selectType(){
    const roomTypeSelect = document.getElementById('roomTypeSelect');
    if (roomTypeSelect) {
        roomTypeSelect.addEventListener('change', function() {
            const selectedType = this.value; // 선택된 방 유형 (예: "coupleRoom")

            if (selectedType && selectedType.trim() !== '' && selectedType.trim() !== ' ') {
                fetch(`/controlPrice?roomType=${selectedType}`, {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' }
                }).then(response => {
                    return response.json();
                }).then(roomData => {
                    document.getElementById('roomWkPrice').value = roomData.roomWkPrice ? roomData.roomWkPrice: 0;
                    document.getElementById('roomWkndPrice').value = roomData.roomWkndPrice ? roomData.roomWkndPrice : 0;
                    document.getElementById('roomSWkPrice').value = roomData.roomSWkPrice ? roomData.roomSWkPrice : 0;
                    document.getElementById('roomSWkndPrice').value = roomData.roomSWkndPrice ? roomData.roomSWkndPrice: 0;
                    document.getElementById('roomUWkPrice').value = roomData.roomUWkPrice ? roomData.roomUWkPrice : 0;
                    document.getElementById('roomUWkndPrice').value = roomData.roomUWkndPrice ? roomData.roomUWkndPrice : 0;
                    document.getElementById('roomSfWkPrice').value = roomData.roomSfWkPrice ? roomData.roomSfWkPrice : 0;
                    document.getElementById('roomSfWkndPrice').value = roomData.roomSfWkndPrice ? roomData.roomSfWkndPrice : 0;
                }).catch(error => {
                    alert('가격을 불러오는 데 실패했습니다.')
                });
            }
        });
    }
}
