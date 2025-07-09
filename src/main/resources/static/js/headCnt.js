function selectType(){
    const roomTypeSelect = document.getElementById('roomTypeSelect');
    if (roomTypeSelect) {
        roomTypeSelect.addEventListener('change', function() {
            const selectedType = this.value; // 선택된 방 유형 (예: "coupleRoom")

            if (selectedType && selectedType.trim() !== '' && selectedType.trim() !== ' ') {
                fetch(`/controlRoom?roomType=${selectedType}`, {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' }
                }).then(response => {
                    return response.json();
                }).then(roomData => {
                    document.getElementById('roomType').value = roomData.roomType;
                    document.getElementById('roomCnt').value = roomData.roomCnt;
                    document.getElementById('roomFull').value = roomData.roomFull;
                }).catch(error => {
                    alert('인원을 불러오는 데 실패했습니다.')
                });
            }
        });
    }
}

function saveHead(){
    let roomType = document.getElementById('roomType').value
    let roomCnt = document.getElementById('roomCnt').value
    let roomFull = document.getElementById('roomFull').value

    let params = new URLSearchParams({
        roomType : roomType,
        roomCnt :roomCnt,
        roomFull: roomFull
    });
    // fetch 요청의 URL에 쿼리 파라미터를 추가합니다.
    fetch('/saveHead?' + params, { // URL에 파라미터가 추가됩니다.
        method: 'POST', // POST 요청 유지
    }).then(data=>{window.location.reload()})
}