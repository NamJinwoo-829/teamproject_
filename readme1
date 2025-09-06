# 로그인 컴포넌트 개요

이 로그인 컴포넌트는 사원과 관리자 두 사용자 유형을 지원하며,  
역할에 따라 입력 폼과 유효성 검사, 로그인 요청을 처리합니다.  
로그인 성공 시 각 역할에 맞는 대시보드로 라우팅되고, 세션 저장과 애니메이션 효과를 제공합니다.

- 역할에 따라 입력 필드 전환
- 입력값 유효성 검사
- 로그인 후 역할별 페이지 이동
- 세션 저장 및 페이드아웃 UX 제공

---

## 요약 테이블

| 항목         | 설명                                    |
|--------------|-----------------------------------------|
| 역할 전환     | framer-motion으로 폼 전환 처리           |
| 입력 관리     | 역할별 입력 상태 업데이트                 |
| 유효성 검사   | validation 모듈로 정규식 기반 검사        |
| 로그인 처리   | 역할별 API 호출, 세션 저장, 페이지 이동   |
| 오류 처리     | 로그인 실패 시 메시지 출력                |
| UX           | 로그인 성공 시 페이드아웃 효과            |

```
---
## 역할 전환 UI
* 버튼 클릭 시 role 상태 변경 → 폼 전환

```jsx
const [role, setRole] = useState("user");

<MotionBox
  left={role === "admin" ? "0" : "50%"}
  w="50%"
  h="100%"
  bg="blue.500"
/>

<Button onClick={() => setRole("admin")}>관리자</Button>
<Button onClick={() => setRole("user")}>사원</Button>
---
```

```
---
##입력 필드 관리
* 역할별로 입력 상태를 분기 처리
* 숫자만 허용

const handleChange = (e) => {
  const { id, value } = e.target;

  switch (id) {
    case "adminId":
    case "userId": setId(value); break;
    case "adminPassword":
    case "userPassword": setPassword(value); break;
    case "adminCode": if (/^\d*$/.test(value)) setAdminCode(value); break;
    default: break;
  }
};
---
```

```
---
## 유효성 검사
* 검사 실패 시 setErrors로 메시지 표시
* 성공 시 로그인 진행

const isValid = await validation({
  id: currentId,
  setId: role === "admin" ? setAdminId : setUserId,
  password: currentPassword,
  setPassword: role === "admin" ? setAdminPassword : setUserPassword,
  admin_code: adminCode,
  setadmin_code: setAdminCode,
  role,
  validation_Patterns,
  setErrors,
});
---
```

```
---
## 로그인 처리

if (role === "admin") {
  const result = await HandleLogin(currentId, currentPassword, adminCode);
  if (result.success === "admin") {
    setFadeOut(true);
    setUser("admin");
    setUserData(result.user_Data);
    sessionStorage.setItem("userRole","admin");
    sessionStorage.setItem("userData", JSON.stringify(result.user_Data));
    setTimeout(() => navigate("/dashboard"), 500);
  } else setAdminLoginError("아이디, 비밀번호 또는 인증코드 오류");
} else {
  const result = await Handle_User_Login(currentId, currentPassword);
  if (result.success === "user") {
    setFadeOut(true);
    setUser(result.name);
    setEmployeeNumber(result.employee_number);
    sessionStorage.setItem("userRole","user");
    sessionStorage.setItem("userName", result.name);
    sessionStorage.setItem("employeeNumber", result.employee_number);
    setTimeout(() => navigate("/data"), 500);
  } else setUserLoginError("아이디 또는 비밀번호 오류");
}
---
```

```
---
## 오류 처리
* 서버 응답이 JSON이 아닐 때와 통신 오류 처리

try {
  const response = await fetch("/api/check_user_login/", {...});
  data = await response.json();
} catch {
  const text = await response.text();
  console.error("서버 오류:", text);
  return { success: false, message: "서버 오류" };
}
---
```

```
---
## Context 관리
* 사용자 정보, 사원 번호, 관리자 데이터를 Context로 관리
* 새로고침 시 sessionStorage에서 불러오기

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [employeeNumber, setEmployeeNumber] = useState(null);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUserData = sessionStorage.getItem("userData");
    if (savedUserData) setUserData(JSON.parse(savedUserData));
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, employeeNumber, setEmployeeNumber, userData, setUserData, loading }}>
      {children}
    </UserContext.Provider>
  );
};
---
```

## 개선사항
|개선 항목	 |                    설명                                   |
|세션 최적화 |	로그인 시 sessionStorage 정보 최소화/정리                |
|실시간 검증 |	로그인 시 DB 실시간 검증 적용                            |
|상태 관리   |추상화	useLogin 훅으로 로직 분리 → 재사용 및 테스트 용이  |
