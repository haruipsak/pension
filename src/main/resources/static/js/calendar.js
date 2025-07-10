// calendar.js - 달력 이동 및 버튼 동작 구현

(function() {
  const today = new Date();
  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth();
  let selectedDay = { year: today.getFullYear(), month: today.getMonth(), day: today.getDate() };

  // 샘플 예약 데이터
  const reservSample = [
    { cusName: '홍길동', cusPhone: '010-1234-5678', cusCount: 2, reservRoomId: '101', reservDate: '2025-07-09' },
    { cusName: '김영희', cusPhone: '010-2222-3333', cusCount: 4, reservRoomId: '102', reservDate: '2025-07-12' },
    { cusName: '이철수', cusPhone: '010-4444-5555', cusCount: 3, reservRoomId: '201', reservDate: '2025-07-15' },
    { cusName: '박민수', cusPhone: '010-6666-7777', cusCount: 1, reservRoomId: '202', reservDate: '2025-07-19' },
    { cusName: '최지우', cusPhone: '010-8888-9999', cusCount: 2, reservRoomId: '301', reservDate: '2025-07-21' },
    { cusName: '테스트1', cusPhone: '010-0000-0001', cusCount: 2, reservRoomId: '101', reservDate: '2025-07-20' },
    { cusName: '테스트2', cusPhone: '010-0000-0002', cusCount: 4, reservRoomId: '102', reservDate: '2025-07-20' },
    { cusName: '테스트3', cusPhone: '010-0000-0003', cusCount: 2, reservRoomId: '103', reservDate: '2025-07-20' },
    { cusName: '테스트4', cusPhone: '010-0000-0004', cusCount: 2, reservRoomId: '104', reservDate: '2025-07-20' },
    { cusName: '테스트5', cusPhone: '010-0000-0005', cusCount: 2, reservRoomId: '201', reservDate: '2025-07-20' },
    { cusName: '테스트6', cusPhone: '010-0000-0006', cusCount: 2, reservRoomId: '202', reservDate: '2025-07-20' },
    { cusName: '테스트7', cusPhone: '010-0000-0007', cusCount: 4, reservRoomId: '203', reservDate: '2025-07-20' },
    { cusName: '테스트8', cusPhone: '010-0000-0008', cusCount: 4, reservRoomId: '204', reservDate: '2025-07-20' },
    { cusName: '테스트9', cusPhone: '010-0000-0009', cusCount: 2, reservRoomId: '301', reservDate: '2025-07-20' },
    { cusName: '테스트10', cusPhone: '010-0000-0010', cusCount: 6, reservRoomId: '302', reservDate: '2025-07-20' },
    { cusName: '테스트11', cusPhone: '010-0000-0011', cusCount: 6, reservRoomId: '303', reservDate: '2025-07-20' },
    { cusName: '테스트12', cusPhone: '010-0000-0012', cusCount: 5, reservRoomId: '304', reservDate: '2025-07-20' }
  ];

  // 샘플 방정보 데이터 (room 테이블과 동일하게 12개)
  const roomSample = [
    { roomId: '101', roomNm: '101호', roomCnt: 2, roomFull: 3, roomType: 'coupleRoom' },
    { roomId: '102', roomNm: '102호', roomCnt: 4, roomFull: 6, roomType: 'familyTwo' },
    { roomId: '103', roomNm: '103호', roomCnt: 2, roomFull: 4, roomType: 'familyTwo' },
    { roomId: '104', roomNm: '104호', roomCnt: 2, roomFull: 3, roomType: 'coupleRoom' },
    { roomId: '201', roomNm: '201호', roomCnt: 2, roomFull: 3, roomType: 'coupleRoom' },
    { roomId: '202', roomNm: '202호', roomCnt: 2, roomFull: 3, roomType: 'coupleRoom' },
    { roomId: '203', roomNm: '203호', roomCnt: 4, roomFull: 6, roomType: 'familyTwo' },
    { roomId: '204', roomNm: '204호', roomCnt: 4, roomFull: 6, roomType: 'familyOne' },
    { roomId: '301', roomNm: '301호', roomCnt: 2, roomFull: 3, roomType: 'coupleRoom' },
    { roomId: '302', roomNm: '302호', roomCnt: 6, roomFull: 10, roomType: 'duplexTwo' },
    { roomId: '303', roomNm: '303호', roomCnt: 6, roomFull: 10, roomType: 'duplexTwo' },
    { roomId: '304', roomNm: '304호', roomCnt: 5, roomFull: 7, roomType: 'duplexOne' }
  ];

  // DOM
  const calendarTitle = document.getElementById('calendarTitle');
  const calendarGrid = document.getElementById('calendarGrid');
  const todayLabel = document.getElementById('todayLabel');
  const roomCardList = document.getElementById('roomCardList');

  function pad(n) { return n < 10 ? '0' + n : n; }

  function renderCalendar(year, month) {
    // 타이틀
    calendarTitle.textContent = `${year}년 ${pad(month+1)}월`;
    // 날짜 그리드
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    let html = '';
    html += '<div class="MuiGrid-root jss91 MuiGrid-container MuiGrid-align-items-xs-center">';
    ['일','월','화','수','목','금','토'].forEach(d => html += `<div>${d}</div>`);
    html += '</div>';
    let day = 1;
    let started = false;
    for (let w = 0; w < 6; w++) {
      html += '<div class="MuiGrid-root jss92 MuiGrid-container MuiGrid-align-items-xs-center">';
      for (let d = 0; d < 7; d++) {
        if (!started && d === firstDay.getDay()) started = true;
        if (!started || day > lastDay.getDate()) {
          html += '<div class="jss94"><span class="jss95"></span></div>';
        } else {
          let classes = 'jss93 jss94 calendar-day';
          // 예약 상태 계산
          const dateStr = `${year}-${pad(month+1)}-${pad(day)}`;
          const reservsForDay = reservSample.filter(r => r.reservDate === dateStr);
          let dayStatus = '';
          if (reservsForDay.length > 0) {
            // 전체 예약완료: 모든 방이 예약됨
            if (roomSample.every(room => reservsForDay.some(r => r.reservRoomId === room.roomId))) {
              dayStatus = 'all-reserved';
            } else {
              dayStatus = 'partial-reserved';
            }
          }
          if (d === 0) classes += ' jss102'; // 일요일
          if (d === 6) classes += ' jss103'; // 토요일
          // 오늘 날짜는 주황색 네모
          if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) classes += ' today-box';
          if (selectedDay && selectedDay.year === year && selectedDay.month === month && selectedDay.day === day) classes += ' selected-day';
          if (dayStatus === 'all-reserved') classes += ' all-reserved';
          else if (dayStatus === 'partial-reserved') classes += ' partial-reserved';
          html += `<div class="${classes}" data-day="${day}"><span class="jss95">${day}</span></div>`;
          day++;
        }
      }
      html += '</div>';
      if (day > lastDay.getDate()) break;
    }
    calendarGrid.innerHTML = html;
    // 날짜 클릭 이벤트 바인딩
    document.querySelectorAll('.calendar-day').forEach(function(el) {
      el.onclick = function() {
        selectedDay = { year, month, day: parseInt(this.getAttribute('data-day')) };
        renderCalendar(currentYear, currentMonth);
        // 날짜 선택 시 방 카드 상태 갱신
        const selectedDateStr = `${year}-${pad(month+1)}-${pad(selectedDay.day)}`;
        renderRoomCards(selectedDateStr);
      };
    });
    // 날짜 선택 후에도 방 카드 상태 갱신
    if (selectedDay && selectedDay.year === year && selectedDay.month === month) {
      const selectedDateStr = `${year}-${pad(month+1)}-${pad(selectedDay.day)}`;
      renderRoomCards(selectedDateStr);
    } else {
      renderRoomCards();
    }
  }

  // 예약하기 팝업 입력칸 우측 정렬
  function showReservationForm(defaultRoomId, defaultDateStr) {
    // 방 드롭다운 옵션
    const roomOptions = roomSample.map(room => `<option value="${room.roomId}"${room.roomId===defaultRoomId?' selected':''}>${room.roomNm}</option>`).join('');
    // 오늘 날짜(예약 날짜 기본값)
    const todayStr = defaultDateStr || (today.getFullYear() + '-' + pad(today.getMonth()+1) + '-' + pad(today.getDate()));
    let html = `<div style='font-size:18px;font-weight:bold;margin-bottom:8px;'>예약하기</div>`;
    html += `<form id='reservationForm' style='font-size:14px;'>
      <div style='margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;'><label style='flex:1;'>이름</label><input name='cusName' required style='width:120px;text-align:right;flex:1;'></div>
      <div style='margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;'><label style='flex:1;'>휴대폰번호</label><input name='cusPhone' required style='width:120px;text-align:right;flex:1;'></div>
      <div style='margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;'><label style='flex:1;'>인원수</label><input name='cusCount' type='number' min='1' max='20' required style='width:60px;text-align:right;flex:1;'></div>
      <div style='margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;'><label style='flex:1;'>방 선택</label><select name='reservRoomId' required style='width:120px;text-align:right;flex:1;'>${roomOptions}</select></div>
      <div style='margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;'><label style='flex:1;'>예약 날짜</label><input name='reservDate' type='date' required value='${todayStr}' style='width:120px;text-align:right;flex:1;'></div>
      <div style='text-align:right;margin-top:18px;'><button type='submit' style='padding:6px 18px;font-size:15px;'>예약</button></div>
    </form>`;
    // 팝업 생성
    let popup = document.createElement('div');
    popup.innerHTML = `<div id='popupBg' style='position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.3);z-index:9999;'></div><div style='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;padding:32px 24px 16px 24px;border-radius:12px;z-index:10000;min-width:320px;box-shadow:0 4px 24px #aaa;'><button id='closePopupBtn' style='position:absolute;top:8px;right:12px;font-size:18px;background:none;border:none;cursor:pointer;'>&times;</button>${html}</div>`;
    document.body.appendChild(popup);
    document.getElementById('closePopupBtn').onclick = function() { popup.remove(); };
    document.getElementById('popupBg').onclick = function() { popup.remove(); };
    document.getElementById('reservationForm').onsubmit = function(e) {
      e.preventDefault();
      alert('예약 저장 기능은 추후 구현 예정입니다.');
      popup.remove();
    };
  }

  function renderRoomCards(selectedDateStr) {
    roomCardList.innerHTML = roomSample.map(room => {
      // 방 타입 한글 변환
      let typeKor = '';
      switch(room.roomType) {
        case 'coupleRoom': typeKor = '커플침대룸'; break;
        case 'familyTwo': typeKor = '일반투룸'; break;
        case 'familyOne': typeKor = '일반온돌룸'; break;
        case 'duplexTwo': typeKor = '복층투룸'; break;
        case 'duplexOne': typeKor = '복층원룸'; break;
        default: typeKor = room.roomType;
      }
      // 예약 상태 확인
      let isReserved = false;
      if (selectedDateStr) {
        isReserved = reservSample.some(r => r.reservRoomId === room.roomId && r.reservDate === selectedDateStr);
      }
      const statusClass = isReserved ? 'reserved' : 'available';
      return `
      <div class="room-card-box">
        <div class="MuiPaper-root MuiPaper-elevation1 MuiCard-root jss168 MuiPaper-rounded room-card ${statusClass}" data-roomid="${room.roomId}" style="width:100%;cursor:pointer;">
          <div class="MuiCardHeader-root jss169">
            <div class="MuiCardHeader-content">
              <span class="MuiTypography-root MuiCardHeader-title MuiTypography-body2 MuiTypography-displayBlock">${room.roomNm}(${typeKor})</span>
            </div>
          </div>
          <div class="MuiCardActions-root jss184 MuiCardActions-spacing">
            <button class="MuiButtonBase-root MuiButton-root MuiButton-outlined jss66 jss63 MuiButton-outlinedPrimary MuiButton-outlinedSizeSmall MuiButton-sizeSmall reserv-btn" tabindex="0" type="button" data-roomid="${room.roomId}" data-date="${selectedDateStr||''}"><span class="MuiButton-label"><span>예약하기</span></span></button>
            <button class="MuiButtonBase-root MuiButton-root MuiButton-outlined jss66 jss63 MuiButton-outlinedSecondary MuiButton-outlinedSizeSmall MuiButton-sizeSmall" tabindex="0" type="button" onclick="event.stopPropagation();alert('방막기 기능은 추후 구현');"><span class="MuiButton-label"><span>방막기</span></span></button>
          </div>
        </div>
      </div>
      `;
    }).join('');
    // 카드 클릭 이벤트
    document.querySelectorAll('.room-card').forEach(card => {
      card.onclick = function() {
        const roomId = this.getAttribute('data-roomid');
        showReservPopup(roomId, selectedDateStr);
      };
    });
    // 예약하기 버튼 이벤트
    document.querySelectorAll('.reserv-btn').forEach(btn => {
      btn.onclick = function(e) {
        e.stopPropagation();
        const roomId = this.getAttribute('data-roomid');
        const dateStr = this.getAttribute('data-date');
        showReservationForm(roomId, dateStr);
      };
    });
  }

  // 예약내역 팝업
  function showReservPopup(roomId, selectedDateStr) {
    const room = roomSample.find(r => r.roomId === roomId);
    // 선택된 날짜가 있으면 해당 날짜만, 없으면 전체 예약
    let reservs = reservSample.filter(r => r.reservRoomId === roomId);
    if (selectedDateStr) {
      reservs = reservs.filter(r => r.reservDate === selectedDateStr);
    }
    let html = `<div style='font-size:18px;font-weight:bold;margin-bottom:8px;'>${room.roomNm} 예약내역</div>`;
    if (reservs.length === 0) {
      html += '<div style="color:#888;">예약 내역이 없습니다.</div>';
    } else {
      html += '<table style="width:100%;border-collapse:collapse;font-size:13px;">';
      html += '<thead><tr style="background:#f8f8f8;"><th style="border:1px solid #ddd;padding:4px 8px;">이름</th><th style="border:1px solid #ddd;padding:4px 8px;">휴대폰 번호</th><th style="border:1px solid #ddd;padding:4px 8px;">예약 인원</th><th style="border:1px solid #ddd;padding:4px 8px;">날짜</th></tr></thead><tbody>';
      html += reservs.map(r => `<tr><td style='border:1px solid #ddd;padding:4px 8px;'>${r.cusName}</td><td style='border:1px solid #ddd;padding:4px 8px;'>${r.cusPhone}</td><td style='border:1px solid #ddd;padding:4px 8px;'>${r.cusCount}</td><td style='border:1px solid #ddd;padding:4px 8px;'>${r.reservDate}</td></tr>`).join('');
      html += '</tbody></table>';
    }
    // 팝업 생성
    let popup = document.createElement('div');
    popup.innerHTML = `<div id='popupBg' style='position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.3);z-index:9999;'></div><div style='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;padding:32px 24px 16px 24px;border-radius:12px;z-index:10000;min-width:320px;box-shadow:0 4px 24px #aaa;'><button id='closePopupBtn' style='position:absolute;top:8px;right:12px;font-size:18px;background:none;border:none;cursor:pointer;'>&times;</button>${html}</div>`;
    document.body.appendChild(popup);
    document.getElementById('closePopupBtn').onclick = function() { popup.remove(); };
    document.getElementById('popupBg').onclick = function() { popup.remove(); };
  }

  function updateTodayLabel() {
    todayLabel.textContent = `오늘 : ${today.getFullYear()}.${pad(today.getMonth()+1)}.${pad(today.getDate())}`;
  }

  // 버튼 이벤트
  document.getElementById('prevMonthBtn').onclick = function() {
    if (currentMonth === 0) {
      currentYear--;
      currentMonth = 11;
    } else {
      currentMonth--;
    }
    renderCalendar(currentYear, currentMonth);
  };
  document.getElementById('nextMonthBtn').onclick = function() {
    if (currentMonth === 11) {
      currentYear++;
      currentMonth = 0;
    } else {
      currentMonth++;
    }
    renderCalendar(currentYear, currentMonth);
  };

  // 최초 렌더링 (DOMContentLoaded 보장)
  document.addEventListener('DOMContentLoaded', function() {
    // 오늘 날짜를 기본 선택
    selectedDay = { year: today.getFullYear(), month: today.getMonth(), day: today.getDate() };
    renderCalendar(currentYear, currentMonth);
    // 오늘 날짜에 맞는 카드 상태로 렌더링
    const selectedDateStr = `${today.getFullYear()}-${pad(today.getMonth()+1)}-${pad(today.getDate())}`;
    renderRoomCards(selectedDateStr);
    // 오늘 라벨 제거 (todayLabel)
    if (todayLabel) todayLabel.style.display = 'none';
    // 오늘 범례가 없으면 추가
    var legend = document.querySelector('.jss121.jss119');
    if (legend && !document.getElementById('legend-today')) {
      var li = document.createElement('li');
      li.id = 'legend-today';
      li.innerHTML = '<span class="legend-today"></span>오늘';
      legend.appendChild(li);
    }
  });
})();
