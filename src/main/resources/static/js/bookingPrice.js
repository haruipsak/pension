function selectAll(selectAll)  {
    const checkboxes
        = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkbox) => {
        checkbox.checked = selectAll.checked
    })
}

function savePrice(){
    const selectedRoomType = document.getElementById('roomTypeSelect').value;
    const roomPrice= document.getElementById('roomPrice').value;
    const roomSPrice= document.getElementById('roomSPrice').value;
    const roomUPrice= document.getElementById('roomUPrice').value;

    // 유효성 검사 (필요시)
    if (!selectedRoomType || selectedRoomType.includes(' ')) {
        alert('방 유형을 선택해주세요.');
        return;
    }

    if(roomPrice.length < 6){
        alert('설정 가격:' + Number(roomPrice).toLocaleString() + '원' +
            '\n설정 가격을 확인하세요')
    }else if(roomSPrice.length < 7){
        alert('설정 가격:' + Number(roomSPrice).toLocaleString() + '원' +
            '\n설정 가격을 확인하세요')
    }else if(roomUPrice.length <7){
        alert('설정 가격:' + Number(roomUPrice).toLocaleString() + '원' +
            '\n설정 가격을 확인하세요')
    }

    const params = new URLSearchParams({
        roomType: selectedRoomType,
        roomPrice: roomPrice,
        roomSPrice: roomSPrice,
        roomUPrice: roomUPrice,
    });

    // fetch 요청의 URL에 쿼리 파라미터를 추가합니다.
    fetch('/controlPrice?' + params, { // URL에 파라미터가 추가됩니다.
        method: 'POST', // POST 요청 유지
    }).then(data=>{window.location.reload()})
}

document.addEventListener('DOMContentLoaded', function() {
    const priceElements = document.querySelectorAll('.price-value'); // 클래스 선택

    priceElements.forEach(function(element) {
        let rawPrice = element.textContent; // 현재 텍스트(숫자 문자열) 가져오기
        let numericPrice = Number(rawPrice); // 숫자로 변환

    });
});