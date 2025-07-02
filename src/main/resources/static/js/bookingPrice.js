function savePrice(){
    const selectedRoomType = document.getElementById('roomTypeSelect').value;
    const roomPrice= document.getElementById('roomPrice').value;
    const roomSPrice= document.getElementById('roomSPrice').value;
    const roomUPrice= document.getElementById('roomUPrice').value;
    const roomSfPrice= document.getElementById('roomSfPrice').value;

    // 유효성 검사 (필요시)
    if (!selectedRoomType || selectedRoomType.includes(' ')) {
        alert('방 유형을 선택해주세요.');
        return;
    }

    if((roomPrice.length || roomPrice.length || roomUPrice.length ) < 5){
        alert('설정 가격을 확인하세요')
    }

    const params = new URLSearchParams({
        roomType: selectedRoomType,
        roomPrice: roomPrice,
        roomSPrice: roomSPrice,
        roomUPrice: roomUPrice,
        roomSfPrice: roomSfPrice,
    });

    // fetch 요청의 URL에 쿼리 파라미터를 추가합니다.
    fetch('/savePrice?' + params, { // URL에 파라미터가 추가됩니다.
        method: 'POST', // POST 요청 유지
    }).then(data=>{window.location.reload()})
}

function savePeriod(){
    const beachOpenDate = document.getElementById('beachOpenDate').value;
    const beachCloseDate = document.getElementById('beachCloseDate').value;
    const festivalOpenDate = document.getElementById('festivalOpenDate').value;
    const festivalCloseDate = document.getElementById('festivalCloseDate').value;
    const specialStart = document.getElementById('specialStart').value;
    const specialEnd = document.getElementById('specialEnd').value;

    const params = new URLSearchParams({
        beachOpenDate: beachOpenDate,
        beachCloseDate: beachCloseDate,
        festivalOpenDate: festivalOpenDate,
        festivalCloseDate: festivalCloseDate,
        specialStart: specialStart,
        specialEnd: specialEnd,
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

   flatpickr("#beachOpenDate", {
        mode: "range",
        enableTime: false,
        dateFormat: "Y-m-d",
        locale: "ko",
        onClose: function(selectedDates, dateStr, instance) {
            const beachCloseDateInput = document.getElementById('beachCloseDate');
            if (selectedDates.length === 2) {
                const startDate = instance.formatDate(selectedDates[0], "Y-m-d");
                const endDate = instance.formatDate(selectedDates[1], "Y-m-d");
                beachCloseDateInput.value = endDate;
                if (beachCloseDateInput._flatpickr) {
                    beachCloseDateInput._flatpickr.setDate(endDate, true);
                }
            } else {
                beachCloseDateInput.value = '';
                if (beachCloseDateInput._flatpickr) {
                    beachCloseDateInput._flatpickr.clear();
                }
                console.log("개장 기간이 선택되지 않았습니다.");
            }
        },
        onReady: function(selectedDates, dateStr, instance) {
            const beachCloseDateInput = document.getElementById('beachCloseDate');
            beachCloseDateInput._flatpickr = instance;
            beachCloseDateInput.addEventListener('focus', () => instance.open());
        }
    });

    // 2. 머드 축제 기간 설정 (시작일 - 종료일)
    flatpickr("#festivalOpenDate", {
        mode: "range",
        enableTime: false,
        dateFormat: "Y-m-d",
        locale: "ko",
        onClose: function(selectedDates, dateStr, instance) {
            const festivalCloseDateInput = document.getElementById('festivalCloseDate');
            if (selectedDates.length === 2) {
                const startDate = instance.formatDate(selectedDates[0], "Y-m-d");
                const endDate = instance.formatDate(selectedDates[1], "Y-m-d");

                festivalCloseDateInput.value = endDate;
                if (festivalCloseDateInput._flatpickr) {
                    festivalCloseDateInput._flatpickr.setDate(endDate, true);
                }
            } else {
                festivalCloseDateInput.value = '';
                if (festivalCloseDateInput._flatpickr) {
                    festivalCloseDateInput._flatpickr.clear();
                }
                console.log("축제 기간이 선택되지 않았습니다.");
            }
        },
        onReady: function(selectedDates, dateStr, instance) {
            const festivalCloseDateInput = document.getElementById('festivalCloseDate');
            festivalCloseDateInput._flatpickr = instance;
            festivalCloseDateInput.addEventListener('focus', () => instance.open());
        }
    });
    // 3. 특별 축제 기간 설정 (시작일 - 종료일)
    flatpickr("#specialStart", {
        mode: "range",
        enableTime: false,
        dateFormat: "Y-m-d",
        locale: "ko",
        onClose: function(selectedDates, dateStr, instance) {
            const specialEndInput = document.getElementById('specialEnd');

            if (selectedDates.length === 2) {
                const startDate = instance.formatDate(selectedDates[0], "Y-m-d");
                const endDate = instance.formatDate(selectedDates[1], "Y-m-d");

                specialEndInput.value = endDate;
                if (specialEndInput._flatpickr) {
                    specialEndInput._flatpickr.setDate(endDate, true);
                }
            } else {
                // 선택이 불완전할 경우 specialEndInput 초기화
                specialEndInput.value = '';
                if (specialEndInput._flatpickr) {
                    specialEndInput._flatpickr.clear();
                }
                console.log("특별 기간이 선택되지 않았습니다.");
            }
        },
        onReady: function(selectedDates, dateStr, instance) {
            const specialEndInput = document.getElementById('specialEnd');
            specialEndInput._flatpickr = instance;
            specialEndInput.addEventListener('focus', () => instance.open());
        }
    });
});

function selectType(){
    const roomTypeSelect = document.getElementById('roomTypeSelect');
    if (roomTypeSelect) {
        roomTypeSelect.addEventListener('change', function() {
            const selectedType = this.value; // 선택된 방 유형 (예: "coupleRoom")
            const selectSpecific = 'Y';

            if (selectedType && selectedType.trim() !== '' && selectedType.trim() !== ' ') {
                fetch(`/controlPrice?roomType=${selectedType}&selectSpecific=${selectSpecific}`, {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' }
                }).then(response => {
                    return response.json();
                }).then(roomData => {
                    document.getElementById('roomPrice').value = roomData.roomPrice ? roomData.roomPrice: '';
                    document.getElementById('roomSPrice').value = roomData.roomSPrice ? roomData.roomSPrice : '';
                    document.getElementById('roomUPrice').value = roomData.roomUPrice ? roomData.roomUPrice : '';
                }).catch(error => {
                    alert('가격을 불러오는 데 실패했습니다.')
                });
            }
        });
    }
}
