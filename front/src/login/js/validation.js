export const validation = async ({ id, password, admin_code, role, rgxCnd, setErrors }) => {
    const idRegex = role === "admin" ? rgxCnd.adminId : rgxCnd.staffId;
    const passwordRegex = role === "admin" ? rgxCnd.adminPassword : rgxCnd.staffPw;
    const otpRegex = role === "admin" ? rgxCnd.adminOtp : null;

    const newErrors = {
        idError: idRegex.test(id) ? "" : "아이디를 잘못 입력하셨습니다",
        passwordError: passwordRegex.test(password) ? "" : "비밀번호를 잘못 입력하셨습니다",
        admin_codeError: ""
    };

    if (role === "admin") {
        if (!admin_code || admin_code.length !== 6) {
            newErrors.admin_codeError = "인증코드는 6자리 숫자여야 합니다.";
        } else if (!otpRegex.test(admin_code)) {
            newErrors.admin_codeError = "인증코드 형식이 올바르지 않습니다.";
        }
    }

    setErrors(newErrors);

    if (newErrors.idError || newErrors.passwordError || newErrors.admin_codeError) {
        return false;
    }

    return {
        success: true,
        dataType: role === "admin" ? "check_admin_login" : "check_user_login"
    };
};
