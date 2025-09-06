# AdminPage - 관리자 관리 페이지

직원 정보를 관리할 수 있는 React 기반의 관리자 페이지입니다. 사용자 조회, 정렬, 추가, 삭제, 열 너비 조정 기능 등을 제공합니다.

## 주요 기능

* 직원 목록 테이블 표시
* 행 클릭 시 상세 정보 수정
* 직원 추가 기능
* 직원 검색 및 정렬 기능
* 열 너비 마우스로 조절
* 열 너비 더블 클릭 시 자동 맞춰지기
* 다중 선택 후 일괄 삭제

---

## 화면 구성

| 기능                 | 설명             |
| ------------------ | ------------------------ |
| `AddButton`        | 직원 추가 버튼      |
| `AdminInformation` | 직원 정보 수정      |
| `AddPersonModal`   | 직원 추가           |
| 검색 / 정렬               | 사원번호, 이름, 전화번호로 필터링 및 정렬 |
| 테이블 열 너비 조절        | 마우스로 드래그 및 더블클릭 자동 맞춰지기  |

---

## 디렉토리 구조

```
adminpage/
│
├── adminPage.js              # 메인 관리자 페이지
├── adminInformation.js       # 정보 수정 
├── addPersonModal.js         # 직원 추가 
├── adminAddBtn.js            # 추가 버튼 
├── js/
│   └── adminPageLogic.js     # 필터/정렬 API 호출 로직
└── ...
```

---

## 설치 및 실행

### 1. 패키지 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm start
```

---

## API 호출 예시

`fetchFilteredPeople` 함수는 다음과 같은 형태로 데이터를 요청합니다:

```
js
fetchFilteredPeople({
  filters: {
    employee_number: "1234",
    user_name: "홍길동",
  },
  sort: {
    key: "user_name",
    direction: "asc",
  },
});
```

---

# Calenderinfo - 유저 페이지

## 개요
`Calenderinfo` 유저페이지는 **작업자의 하루 작업 내역을 입력하고 DB에 전송하는 폼**입니다.  
작업 시간, 장소, 잔업, 중식, 특근까지 기록할 수 있도록 구성되어 있습니다.

---

## 주요 기능

- 작업 시간 선택 (`시작 ~ 종료`)
- 장소 선택 및 자동 입력
- 총 작업 시간 자동 계산
- 잔업 / 중식 / 특근 시간 개별 입력
- 시간 입력 시 자동 `HH:mm` 포맷 처리
- 서버로 데이터 전송 및 전송 후 폼 초기화

---

## 화면 구성

| 항목                  | 설명                                         |
|-----------------------|----------------------------------------------|
| 작업 시간             | 리스트에서 시간 선택 → 시작~종료 자동 지정   |
| 장소                  | 리스트에서 업체/장소 선택                    |
| 총 작업 시간          | 시작~종료 시간으로 자동 계산                 |
| 잔업 / 중식 / 특근    | 체크박스로 항목 활성화 → 개별 시간 입력 가능 |
| 추가 버튼             | 전체 데이터를 서버에 전송하고 폼 초기화      |

---

## 사용 방법

1. **작업 시간 선택**
   - `+` 버튼 클릭 시 시간 리스트 표시
   - 원하는 시간 구간 선택 → 총 작업 시간 자동 계산

2. **작업 장소 선택**
   - `+` 버튼 클릭 시 장소 리스트 표시
   - 클릭하여 장소 선택

3. **잔업, 중식, 특근 시간 입력 (선택 사항)**
   - 각 항목의 체크박스 클릭 시 입력란 활성화
   - 시간은 숫자로 입력하면 자동으로 `HH:mm` 형식으로 변환됨  
     (예: `1730` → `17:30`)

4. **정보 전송**
   - 모든 필수 항목을 입력 후 `추가` 버튼 클릭
   - 서버로 정보 전송 후 폼 초기화

---

## 주요 상태 변수

| 변수명 | 설명 |
|--------|------|
| `location` | 선택한 장소 |
| `startTime`, `finishTime` | 작업 시작/종료 시간 |
| `overtimeChecked`, `lunchChecked`, `specialWorkChecked` | 항목별 입력 여부 체크 |
| `overtimeStart`, `overtimeFinish` 등 | 항목별 시작/종료 시간 |
| `totalWorkTime`, `overtimeDuration`, 등 | 자동 계산된 소요 시간 |

---

## 주의사항

- `작업 시간`과 `장소`는 필수 입력 항목입니다.
- 시간 입력은 `HH:mm` 형식이며, 숫자만 입력해도 자동 포맷됩니다.
- 서버 통신 실패 시 콘솔에 에러 메시지가 표시됩니다.

---

## 디렉토리 구조

```
TRAMPROJECT_
│
├── Back/
│     ├── myproject/
│          ├── myapp/
│                └── apps.py                     # Django 앱 설정 등록 
│                └── auth_utils.py               # 용자 및 관리자 로그인 인증 함수 구현
│                └── models.py                   # user(사용자), admin(관리자), 근무정보, 급여 데이터 모델 정의
│                └── serializers.py              # 모델 데이터를 JSON으로 직렬화/역직렬화 처리
│                └── urls.py                     # API 엔드포인트 라우팅 (현재 `/items/` 단일 경로)
│                └── views.py                    # API 요청 분기 처리, `data_type`에 따라 기능 실행
│     ├── dbsqlite3                              # Django 내장 데이터베이스, 데이터베이스 스키마와 데이터를 파일 기반 저장
│     ├── manage.py                              # Django 프로젝트 관리 커맨드 실행
│
├── Front/
│     ├── src/
│          ├── calenderTest/
│              ├── calenderFront/
│                └── calender.js                 # 캘린더 날짜 강조 및 옵션 표시
│                └── calenderinfo.js             # 작업 기록 입력
│
│          ├── js/
│                └── submitWorkInfo.js           # 근정 정보 전송
│                └── timeUtils.js                # 작업 시간 계산
│                └── locationsList.js            # 근무지 
│                └── workTimeList.js             # 작업 시간
│ 
│     ├── adminpage/
│          ├── adminpag-Font/
│                └── adminPage.js                # 사원 관리 페이지 (추가·수정·삭제·검색/정렬)
│                └── adminInformation.js         # 사원 정보 수정 
│                └── addPersonModal.js           # 사원 정보 입력 
│                └── adminAddBtn.js              # 직원 추가·삭제·검색 버튼
│                └── addPanel.js                 # 회사명·일급 입력 
│                └── adminResizableTable.js      # 테이블 행·열 크기 조절(Dashborad 사용으로 삭제 예정)
│                └── admnsButon.js               # 회사별 일급 수정
│
│          ├── js/
│                └── adminPageAddPerson.js       # 신규 사용자 서버 전송 
│                └── adminPageDelete.js          # 선택 사원 삭제 서버 함수
│                └── adminPageLogic.js           # 사원 필터링/정렬 서버 조회 함수
│                └── adminPageUpdate.js          # 사원 정보 업데이트 서버 함수
│                └── admnsdbPost.js              # 사원 목록 조회 서버 함수
│                └── useAddPersonLogic.js        # 사원 추가
│                └── useAdminInformationLogic.js # 사원 정보 모달 로직
│                └── useAdminpanelLogic.js       # 일급 관리 패널 로직
│                └── utils.js                    # 사원 주민등록번호·전화번호 포맷
│
│     ├── dashboard/
│                └── dashboard.js                # Dashboard 레이아웃
│          ├── components/
│                └── FinalCahart.js              # 월별 수입·지출 차트 표시
│                └── Header.js                   # 관리자 문구와 로그아웃 버튼 표시
│                └── sideBar.js                  # 사이드바 메뉴와 Total Sales 하위 메뉴 표시 및 활성 상태 강조
│          ├── adminpag-Font/
│                └── employeeData.js             # 직원 근무·상태·시간·위치 등 데이터 배열
│                └── googleAuth.js               # 구글 OAuth 토큰 연동
│          ├── adminpag-Font/
│                └── ApprovalPage.js             # 사원 목록과 승인/거절 관리
│                └── DailyPayPage.js             # 일급 관리 페이지 표시
│                └── EmployeeList.js             # AdminPage 렌더링
│                └── overview.js                 # Google Calendar 연동과 총 지출/승인 대기 사원 표시 컴포넌트
│                └── TotalSalesPage.js           # 업체별 매출, 지출 및 순이익 그래프
│
│     ├──  login/
│          ├── login-Font/
│                └── login.js                    # 로그인 컴포넌트
│
│          ├── js/
│                └── validation.js               # 로그인 API 호출
│                └── userContext.js              # 로그인 사용자 정보 관리
│                └── user_login_info.js          # 로그인 유효성 검사
│                └── admin_login_info.js         # 로그인 유효성 검사
```
---
## 서버 전송 예시

```
submitWorkInfo({
  user,
  employeeNumber,
  selectedDate,
  startTime,
  finishTime,
  totalWorkTime,
  location,

  overtimeChecked,
  overtimeStart: overtimeChecked ? overtimeStart : "",
  overtimeFinish: overtimeChecked ? overtimeFinish : "",
  overtimeDuration: overtimeChecked ? overtimeDuration : "",

  lunchChecked,
  lunchStart: lunchChecked ? lunchStart : "",
  lunchFinish: lunchChecked ? lunchFinish : "",
  lunchDuration: lunchChecked ? lunchDuration : "",

  specialWorkChecked,
  specialWorkStart: specialWorkChecked ? specialWorkStart : "",
  specialWorkFinish: specialWorkChecked ? specialWorkFinish : "",
  specialWorkDuration: specialWorkChecked ? specialWorkDuration : "",
});
```
---

## 사용된 기술

* React
* JavaScript
* CSS
* Context API
* HTML Canvas API

---

```
Library

* "@chakra-ui/react": "^2.10.9"    ( 명령어 : npm install @chakra-ui/react@2  )
* "@emotion/react": "^11.14.0"     ( 명령어 : npm install @emotion/react  )
* "@emotion/styled": "^11.14.1"    ( 명령어 : npm install @emotion/styled )
* "recharts": "^3.1.2"             ( 명령어 : npm install recharts )
* "date-fns": "^4.1.0"             ( 명령어 : npm install date-fns  )
* "framer-motion": "^12.23.12"     ( 명령어 : npm install framer-motion )
* "moment": "^2.30.1"              ( 명령어 : npm install moment  )
* "react": "^19.0.0"               ( 명령어 : npm install react )
* "react-big-calendar": "^1.19.4"  ( 명령어 : npm install react-big-calendar )
* "react-dom": "^19.0.0"           ( 명령어 : npm install react-dom )
* "react-icons": "^5.5.0"          ( 명령어 : npm install react-icons )
* "react-router-dom": "^7.3.0"     ( 명령어 : npm install react-router-dom )
* "concurrently": "^9.1.2"         ( 명령어 : npm install -D concurrently )
* "nodemon": "^3.1.9"              ( 명령어 : npm install -D nodemon ) 
* "eslint": "^8.56.0"              ( 명령어 : npm install -D eslint )
```
---
