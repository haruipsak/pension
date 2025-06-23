const dummyRoomDetails = {
    '43925': { name: '101호(커플침대룸)', imageUrl: 'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fnaverbooking-phinf.pstatic.net%2F20211006_16%2F1633531300243AmJfv_JPEG%2Fimage.jpg', description: '기준인원: 2명 | 최대인원: 3명', capacityMin: 2, capacityMax: 3, price: 100000 },
    '43928': { name: '102호(일반투룸)', imageUrl: 'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fnaverbooking-phinf.pstatic.net%2F20211006_175%2F1633531313083gpRoY_JPEG%2Fimage.jpg', description: '기준인원: 4명 | 최대인원: 6명', capacityMin: 4, capacityMax: 6, price: 100000 },
    '43933': { name: '103호(일반투룸)', imageUrl: 'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fnaverbooking-phinf.pstatic.net%2F20211006_9%2F1633531313907TJhRs_JPEG%2Fimage.jpg', description: '기준인원: 4명 | 최대인원: 6명', capacityMin: 4, capacityMax: 6, price: 100000 },
    '43926': { name: '104호(커플온돌룸)', imageUrl: 'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fnaverbooking-phinf.pstatic.net%2F20211006_81%2F1633531305288ztblT_JPEG%2Fimage.jpg', description: '기준인원: 2명 | 최대인원: 3명', capacityMin: 2, capacityMax: 3, price: 100000 },
    '43931': { name: '201호(커플침대룸)', imageUrl: 'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fnaverbooking-phinf.pstatic.net%2F20211006_16%2F1633531300243AmJfv_JPEG%2Fimage.jpg', description: '기준인원: 2명 | 최대인원: 3명', capacityMin: 2, capacityMax: 3, price: 100000 },
    '43934': { name: '202호(일반투룸)', imageUrl: 'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fnaverbooking-phinf.pstatic.net%2F20211006_175%2F1633531313083gpRoY_JPEG%2Fimage.jpg', description: '기준인원: 4명 | 최대인원: 6명', capacityMin: 4, capacityMax: 6, price: 100000 },
    '43935': { name: '203호(일반투룸)', imageUrl: 'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fnaverbooking-phinf.pstatic.net%2F20211006_175%2F1633531313083gpRoY_JPEG%2Fimage.jpg', description: '기준인원: 4명 | 최대인원: 6명', capacityMin: 4, capacityMax: 6, price: 100000 },
    '43927': { name: '204호(일반온돌룸)', imageUrl: 'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fnaverbooking-phinf.pstatic.net%2F20211006_233%2F1633531309001gmyLI_JPEG%2Fimage.jpg', description: '기준인원: 4명 | 최대인원: 6명', capacityMin: 4, capacityMax: 6, price: 100000 },
    '43932': { name: '301호(커플침대룸)', imageUrl: 'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fnaverbooking-phinf.pstatic.net%2F20211006_16%2F1633531300243AmJfv_JPEG%2Fimage.jpg', description: '기준인원: 2명 | 최대인원: 3명', capacityMin: 2, capacityMax: 3, price: 100000 },
    '43930': { name: '302호(복층투룸)', imageUrl: 'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fnaverbooking-phinf.pstatic.net%2F20211006_220%2F1633531327926lqJ9I_JPEG%2Fimage.jpg', description: '기준인원: 6명 | 최대인원: 10명', capacityMin: 6, capacityMax: 10, price: 100000 },
    '43936': { name: '303호(복층투룸)', imageUrl: 'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fnaverbooking-phinf.pstatic.net%2F20211006_220%2F1633531327926lqJ9I_JPEG%2Fimage.jpg', description: '기준인원: 6명 | 최대인원: 10명', capacityMin: 6, capacityMax: 10, price: 100000 },
    '43929': { name: '304호(복층원룸)', imageUrl: 'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fnaverbooking-phinf.pstatic.net%2F20211006_142%2F1633531321090R6pkN_JPEG%2Fimage.jpg', description: '기준인원: 5명 | 최대인원: 7명', capacityMin: 5, capacityMax: 7, price: 100000 }
};

let selectedCheckInDate = null;
let selectedCheckOutDate = null;
let selectedAdults = 2;
let selectedChildren = 0;

const dateModal = document.getElementById('dateModal');
const calendarContainer = document.getElementById('calendarContainer');

const personModal = document.getElementById('personModal');
const adultsInput = document.getElementById('adultsInput');
const childrenInput = document.getElementById('childrenInput');

// Custom Alert Modal Elements
const customAlertModal = document.getElementById('customAlertModal');
const alertTitle = document.getElementById('alertTitle');
const alertMessage = document.getElementById('alertMessage');
const alertButtons = document.getElementById('alertButtons');

async function fetchHolidays(year) {
    const url = `https://raw.githubusercontent.com/hyunbinseo/holidays-kr/refs/heads/main/public/${year}.json`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status} for ${url}`);
            return {};
        }
        const data = await response.json();

        const parsedHolidays = {};
        for (const date in data) {
            if (data.hasOwnProperty(date)) {
                parsedHolidays[date] = data[date][0];
            }
        }
        return parsedHolidays;
    } catch (error) {
        console.error("공휴일 데이터를 가져오는 데 실패했습니다:", error);
        return {};
    }
}

async function renderCalendar() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayFormattedForComparison = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

    const currentYearForHolidays = today.getFullYear();
    const holidays = await fetchHolidays(currentYearForHolidays);

    calendarContainer.innerHTML = '';

    for (let i = 0; i < 6; i++) {
        const monthDate = new Date(today.getFullYear(), today.getMonth() + i, 1);
        const year = monthDate.getFullYear();
        const month = monthDate.getMonth();

        const monthDiv = document.createElement('div');
        monthDiv.classList.add('month-section');

        const monthHeader = document.createElement('div');
        monthHeader.classList.add('KtcAG');
        monthHeader.innerHTML = `<strong class="yQfq8">${year}년 ${month + 1}월</strong>`;
        monthDiv.appendChild(monthHeader);

        const daysOfWeekTable = document.createElement('table');
        daysOfWeekTable.classList.add('SNZYD');
        daysOfWeekTable.innerHTML = `
            <thead>
                <tr>
                    <th scope="col" aria-label="sun">일</th>
                    <th scope="col" aria-label="mon">월</th>
                    <th scope="col" aria-label="tue">화</th>
                    <th scope="col" aria-label="wed">수</th>
                    <th scope="col" aria-label="thurs">목</th>
                    <th scope="col" aria-label="fri">금</th>
                    <th scope="col" aria-label="sat">토</th>
                </tr>
            </thead>
        `;
        monthDiv.appendChild(daysOfWeekTable);


        const table = document.createElement('table');
        table.classList.add('pWTpv');
        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
        monthDiv.appendChild(table);

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let dateCounter = 1;
        for (let week = 0; week < 6; week++) {
            const row = tbody.insertRow();
            for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
                const cell = row.insertCell();

                let currentDate = null;
                let formattedDate = '';
                let isBeforeToday = false;
                let currentDay = '';
                let additionalText = '';

                if (week === 0 && dayOfWeek < firstDayOfMonth) {
                    cell.classList.add('kg1ve');
                    cell.innerHTML = `<div><div class="erbXg"></div><div class="xPc8w"></div></div>`;
                } else if (dateCounter > daysInMonth) {
                    cell.classList.add('kg1ve');
                    cell.innerHTML = `<div><div class="erbXg"></div><div class="xPc8w"></div></div>`;
                } else {
                    currentDate = new Date(year, month, dateCounter);

                    const displayYear = currentDate.getFullYear();
                    const displayMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                    const displayDay = currentDate.getDate().toString().padStart(2, '0');
                    formattedDate = `${displayYear}-${displayMonth}-${displayDay}`;

                    currentDay = displayDay;

                    isBeforeToday = currentDate < today;

                    if (holidays[formattedDate]) {
                        additionalText = holidays[formattedDate];
                        cell.classList.add('KR_3L');
                    }

                    if (formattedDate === todayFormattedForComparison) {
                        cell.classList.add('dzBq7');
                        additionalText = '오늘';
                    }

                    if (formattedDate === selectedCheckInDate) {
                        cell.classList.add('ZsGD3');
                        additionalText = '입실';
                    }
                    if (formattedDate === selectedCheckOutDate) {
                        if (formattedDate === selectedCheckInDate) {
                            cell.classList.add('Y0Ikc');
                            additionalText = '입/퇴실';
                        } else {
                            cell.classList.add('Y0Ikc');
                            additionalText = '퇴실';
                        }
                    }
                    const cellDateObj = new Date(formattedDate);
                    const selectedInDateObj = selectedCheckInDate ? new Date(selectedCheckInDate) : null;
                    const selectedOutDateObj = selectedCheckOutDate ? new Date(selectedCheckOutDate) : null;

                    if (selectedInDateObj && selectedOutDateObj &&
                        cellDateObj > selectedInDateObj && cellDateObj < selectedOutDateObj) {
                        cell.classList.add('fGPWW');
                    }

                    if (isBeforeToday) {
                        cell.classList.add('inactive');
                        const link = cell.querySelector('.a_ThU');
                        if (link) link.removeAttribute('href');
                    } else {
                        cell.addEventListener('click', () => handleDateSelection(formattedDate));
                    }

                    if (dayOfWeek === 0) {
                        cell.classList.add('h9Yq1'); // 일요일
                    }
                    if (dayOfWeek === 6) {
                        cell.classList.add('h9Yq1'); // 토요일
                    }

                    cell.innerHTML = `
                        <a href="#" target="_self" role="button" class="a_ThU" data-date="${formattedDate}">
                            <div>
                                <div class="erbXg">${currentDay}</div>
                                <div class="xPc8w">${additionalText}</div>
                            </div>
                        </a>
                    `;

                    dateCounter++;
                }
            }
            if (dateCounter > daysInMonth && week > 0 && row.children.length === 0) {
                break;
            }
        }
        calendarContainer.appendChild(monthDiv);
    }
}

function handleDateSelection(dateString) {
    const clickedDate = new Date(dateString);
    clickedDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (clickedDate < today) {
        return;
    }

    if (!selectedCheckInDate || selectedCheckOutDate) {
        selectedCheckInDate = dateString;
        selectedCheckOutDate = null;
    } else {
        const currentCheckInDateObj = new Date(selectedCheckInDate);
        currentCheckInDateObj.setHours(0, 0, 0, 0);

        if (clickedDate < currentCheckInDateObj) {
            selectedCheckInDate = dateString;
            selectedCheckOutDate = null;
        } else {
            selectedCheckOutDate = dateString;
        }
    }
    renderCalendar();
}

function applyDateSelection() {
    if (!selectedCheckInDate) {
        showCustomAlert('알림', '체크인 날짜를 선택해주세요.');
        return;
    }
    if (!selectedCheckOutDate) {
        selectedCheckOutDate = selectedCheckInDate;
    }
    if (new Date(selectedCheckInDate) > new Date(selectedCheckOutDate)) {
        showCustomAlert('알림', '체크아웃 날짜는 체크인 날짜보다 늦거나 같아야 합니다.');
        selectedCheckInDate = null;
        selectedCheckOutDate = null;
        renderCalendar();
        return;
    }

    updateSelectionDisplays();
    fetchAndFilterRooms();
    closeDateModal();
}

function openDateModal() {
    dateModal.style.display = 'flex';
    renderCalendar();
}

function closeDateModal() {
    dateModal.style.display = 'none';
}

function openPersonModal() {
    personModal.style.display = 'flex';
    adultsInput.value = selectedAdults;
    childrenInput.value = selectedChildren;
    updatePersonCounterButtons();
}

function closePersonModal() {
    personModal.style.display = 'none';
}

function changePersonCount(type, delta) {
    let currentAdults = parseInt(adultsInput.value);
    let currentChildren = parseInt(childrenInput.value);

    const MAX_TOTAL_GUESTS = 15;

    if (type === 'adults') {
        const newAdults = currentAdults + delta;
        const newTotal = newAdults + currentChildren;
        if (newAdults >= 1 && newTotal <= MAX_TOTAL_GUESTS) {
            adultsInput.value = newAdults;
            selectedAdults = newAdults;
        }
    } else if (type === 'children') {
        const newChildren = currentChildren + delta;
        const newTotal = currentAdults + newChildren;
        if (newChildren >= 0 && newTotal <= MAX_TOTAL_GUESTS) {
            childrenInput.value = newChildren;
            selectedChildren = newChildren;
        }
    }
    updatePersonCounterButtons();
}

function updatePersonCounterButtons() {
    const currentAdults = parseInt(adultsInput.value);
    const currentChildren = parseInt(childrenInput.value);
    const totalPeople = currentAdults + currentChildren;

    const MAX_TOTAL_GUESTS = 15;

    document.getElementById('adultsDecreaseBtn').disabled = currentAdults <= 1;
    document.getElementById('adultsIncreaseBtn').disabled = totalPeople >= MAX_TOTAL_GUESTS;

    document.getElementById('childrenDecreaseBtn').disabled = currentChildren <= 0;
    document.getElementById('childrenIncreaseBtn').disabled = totalPeople >= MAX_TOTAL_GUESTS;
}

function applyPersonSelection() {
    updateSelectionDisplays();
    fetchAndFilterRooms();
    closePersonModal();
}

async function fetchAndFilterRooms() {
    const roomListElement = document.getElementById('roomList');
    roomListElement.innerHTML = '<p>객실 정보를 불러오는 중...</p>';

    if (!selectedCheckInDate || !selectedCheckOutDate) {
        roomListElement.innerHTML = '<p>날짜를 먼저 선택해주세요.</p>';
        return;
    }

    const checkInMonth = selectedCheckInDate.substring(0, 7).replace('-', '');
    const apiUrl = `/api/calendar/accommodation/3815/reservation-calendar?month=${checkInMonth}&calendarTypeCode=RESERVATION_CALENDAR&zoneIds=`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const success = data.success;

        if (success === true) {
            const roomAvailabilityData = [];
            let currentDate = new Date(selectedCheckInDate);
            const endDate = new Date(selectedCheckOutDate);
            endDate.setHours(0, 0, 0, 0);

            if (currentDate.toISOString().split('T')[0] === endDate.toISOString().split('T')[0]) {
                endDate.setDate(endDate.getDate() + 1);
            }

            let isAvailableForAllDates = true;
            let commonAvailableRoomIds = new Set();

            const initialDayData = data.data.rowDtos.find(row =>
                row.columnDtos.some(col => col.date === selectedCheckInDate)
            );
            const initialRoomsForThisDay = initialDayData?.columnDtos.find(col => col.date === selectedCheckInDate)?.detailDtos;

            if (initialRoomsForThisDay && initialRoomsForThisDay.length > 0) {
                initialRoomsForThisDay.filter(detail => detail.statusCode === '0010')
                    .forEach(detail => commonAvailableRoomIds.add(detail.roomId));
            } else {
                isAvailableForAllDates = false;
            }

            currentDate.setDate(currentDate.getDate() + 1);

            while (currentDate < endDate && isAvailableForAllDates) {
                const currentFormattedDate = currentDate.toISOString().split('T')[0];
                const dayData = data.data.rowDtos.find(row =>
                    row.columnDtos.some(col => col.date === currentFormattedDate)
                );

                if (!dayData) {
                    isAvailableForAllDates = false;
                    break;
                }

                const roomsForThisDay = dayData.columnDtos.find(col => col.date === currentFormattedDate)?.detailDtos;

                if (!roomsForThisDay || roomsForThisDay.length === 0) {
                    isAvailableForAllDates = false;
                    break;
                }

                const availableTodayIds = new Set(roomsForThisDay
                    .filter(detail => detail.statusCode === '0010')
                    .map(detail => detail.roomId)
                );

                const intersection = new Set();
                commonAvailableRoomIds.forEach(id => {
                    if (availableTodayIds.has(id)) {
                        intersection.add(id);
                    }
                });
                commonAvailableRoomIds = intersection;

                if (commonAvailableRoomIds.size === 0) {
                    isAvailableForAllDates = false;
                    break;
                }

                currentDate.setDate(currentDate.getDate() + 1);
            }

            if (isAvailableForAllDates && commonAvailableRoomIds.size > 0) {
                commonAvailableRoomIds.forEach(roomId => {
                    const roomDetailOnCheckInDate = initialRoomsForThisDay?.find(detail => detail.roomId === roomId && detail.statusCode === '0010');

                    if (roomDetailOnCheckInDate) {
                        const roomDetails = dummyRoomDetails[roomId];
                        const totalPersons = selectedAdults + selectedChildren;

                        if (roomDetails && totalPersons <= roomDetails.capacityMax) {
                            roomAvailabilityData.push({
                                roomId: roomId,
                                roomName: roomDetailOnCheckInDate.roomName,
                                statusCode: roomDetailOnCheckInDate.statusCode,
                                salePrice: roomDetails.price || "가격 정보 없음",
                                name: roomDetails.name,
                                imageUrl: roomDetails.imageUrl,
                                description: roomDetails.description,
                                capacityMin: roomDetails.capacityMin,
                                capacityMax: roomDetails.capacityMax
                            });
                        }
                    }
                });
                displayAvailableRooms(roomAvailabilityData);

            } else {
                roomListElement.innerHTML = '<p>선택하신 기간 동안 모든 날짜에 예약 가능한 객실이 없습니다.</p>';
            }

        } else {
            roomListElement.innerHTML = '<p>객실 정보를 불러오는 데 실패했습니다.</p>';
        }
    } catch (error) {
        console.error('객실 데이터를 가져오는 중 오류 발생:', error);
        roomListElement.innerHTML = '<p>객실 정보를 불러오는 중 오류가 발생했습니다.</p>';
    }
}

function displayAvailableRooms(availableRoomsData) {
    const roomListElement = document.getElementById('roomList');
    roomListElement.innerHTML = '';

    if (availableRoomsData.length === 0) {
        roomListElement.innerHTML = '<p>선택하신 날짜와 인원 조건에 맞는 예약 가능한 객실이 없습니다.</p>';
        return;
    }

    availableRoomsData.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

    availableRoomsData.forEach(room => {
        const priceDisplay = typeof room.salePrice === 'number' ? `${room.salePrice.toLocaleString()}원` : room.salePrice;

        const roomItem = `
            <li class="room-item">
                <img src="${room.imageUrl}" alt="${room.name}" loading="lazy">
                <div class="room-details">
                    <h3>${room.name}</h3>
                    <p class="price">
                        <em>${priceDisplay}</em>
                    </p>
                    <p class="info">${room.description}</p>
                    <button class="book-button" data-room-id="${room.roomId}" data-room-name="${room.name}" data-room-price="${room.salePrice}">예약하기</button>
                </div>
            </li>
        `;
        roomListElement.innerHTML += roomItem;
    });
}

async function bookRoom(roomId, roomName, roomPrice) {
    // 1. 객실 정보 확인 및 인원 추가 요금 계산
    const roomDetails = dummyRoomDetails[roomId];
    if (!roomDetails) {
        showCustomAlert('오류', '객실 정보를 찾을 수 없습니다.');
        return;
    }
    const totalPersons = selectedAdults + selectedChildren;
    const baseCapacity = roomDetails.capacityMin;
    let extraPersonCharge = 0;
    let extraPersonInfo = '';

    if (totalPersons > baseCapacity) {
        extraPersonCharge = (totalPersons - baseCapacity) * 20000;
        extraPersonInfo = `인원 추가: ${extraPersonCharge.toLocaleString()}원 (${totalPersons - baseCapacity}명)\n`;
    }

    const finalRoomPrice = roomPrice + extraPersonCharge;

    // 2. 바베큐 이용 여부 확인
    const useBbq = await showCustomConfirm("바베큐 추가", "바베큐를 이용하시겠습니까?");

    // 3. 바베큐 이용 시 가격 계산
    let bbqPrice = 0;
    let bbqInfo = '';
    if (useBbq) {
        if (totalPersons >= 1 && totalPersons <= 4) {
            bbqPrice = 20000;
            bbqInfo = `바베큐 금액: ${bbqPrice.toLocaleString()}원\n`;
        } else if (totalPersons >= 5 && totalPersons <= 6) {
            bbqPrice = 30000;
            bbqInfo = `바베큐 금액: ${bbqPrice.toLocaleString()}원\n`;
        } else if (totalPersons >= 7 && totalPersons <= 8) {
            bbqPrice = 40000;
            bbqInfo = `바베큐 금액: ${bbqPrice.toLocaleString()}원\n`;
        } else { // 8인 초과
            bbqInfo = '바베큐: 방문하여 문의해주세요.\n';
        }
    }

    // 4. 최종 예약 정보 메시지 구성
    const totalPrice = finalRoomPrice + bbqPrice;
    let finalMessage =
        `객실 기본 금액: ${roomPrice.toLocaleString()}원\n` +
        extraPersonInfo +
        bbqInfo;

    if (extraPersonInfo || bbqInfo) {
        finalMessage += `--------------------\n`;
    }

    finalMessage += `총 금액: ${totalPrice.toLocaleString()}원\n\n` +
        `위 내용으로 예약을 진행하시겠습니까?`;

    // 5. 최종 예약 확인 (확인/취소 버튼)
    const isConfirmed = await showCustomConfirm(`${roomName} 예약 확인`, finalMessage, "확인", "취소");

    if (isConfirmed) {
        // 실제 예약 처리 로직은 여기에 추가 (예: 서버로 데이터 전송)
        showCustomAlert('예약 완료', '예약이 성공적으로 완료되었습니다.');
    }
    // '취소'를 누르면 아무 동작 없이 팝업만 닫힘
}

function closeCustomAlertModal() {
    customAlertModal.style.display = 'none';
}

function showCustomAlert(title, message) {
    alertTitle.innerText = title;
    alertMessage.innerText = message;
    alertButtons.innerHTML = `<button onclick="closeCustomAlertModal()">확인</button>`;
    customAlertModal.style.display = 'flex';
}

function showCustomConfirm(title, message, confirmText = '예', cancelText = '아니오') {
    return new Promise((resolve) => {
        alertTitle.innerText = title;
        alertMessage.innerText = message;
        alertButtons.innerHTML = `
            <button id="confirmBtnYes" class="primary">${confirmText}</button>
            <button id="confirmBtnNo" class="secondary">${cancelText}</button>
        `;
        customAlertModal.style.display = 'flex';

        document.getElementById('confirmBtnYes').onclick = () => {
            closeCustomAlertModal();
            resolve(true);
        };
        document.getElementById('confirmBtnNo').onclick = () => {
            closeCustomAlertModal();
            resolve(false);
        };
    });
}

function updateSelectionDisplays() {
    const checkInDisplay = document.getElementById('checkInDisplay');
    const checkOutDisplay = document.getElementById('checkOutDisplay');
    const personsDisplay = document.getElementById('personsDisplay');

    const formatKoreanDate = (dateString) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        const date = new Date(year, month - 1, day);
        const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
        return `${parseInt(month)}월 ${parseInt(day)}일 (${dayOfWeek})`;
    };

    if (checkInDisplay) {
        checkInDisplay.innerText = selectedCheckInDate ? formatKoreanDate(selectedCheckInDate) : '체크인 날짜';
    }
    if (checkOutDisplay) {
        checkOutDisplay.innerText = selectedCheckOutDate ? formatKoreanDate(selectedCheckOutDate) : '체크아웃 날짜';
    }
    if (personsDisplay) {
        personsDisplay.innerText = `성인 ${selectedAdults}명` + (selectedChildren > 0 ? `, 아동 ${selectedChildren}명` : '');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    selectedCheckInDate = tomorrow.toISOString().split('T')[0];
    selectedCheckOutDate = dayAfterTomorrow.toISOString().split('T')[0];

    document.getElementById('adultsInput').value = selectedAdults;
    document.getElementById('childrenInput').value = selectedChildren;
    updatePersonCounterButtons();

    updateSelectionDisplays();
    await fetchAndFilterRooms();
});

document.getElementById('dateSelectionBtn').addEventListener('click', openDateModal);
document.getElementById('personSelectionBtn').addEventListener('click', openPersonModal);

// Event delegation for booking buttons
document.getElementById('roomList').addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('book-button')) {
        const button = event.target;
        const roomId = button.dataset.roomId;
        const roomName = button.dataset.roomName;
        const roomPrice = parseInt(button.dataset.roomPrice, 10);
        bookRoom(roomId, roomName, roomPrice);
    }
});

window.addEventListener('click', (event) => {
    if (event.target === dateModal) {
        closeDateModal();
        updateSelectionDisplays();
        fetchAndFilterRooms();
    }
    if (event.target === personModal) {
        closePersonModal();
        updateSelectionDisplays();
        fetchAndFilterRooms();
    }
});