class Validation {
  // Tài khoản: 4-6 ký số, không để trống
  validateAccount(account) {
    if (!account || account.trim() === "") return "Tài khoản không được để trống.";
    if (!/^\d{4,6}$/.test(account.trim())) return "Tài khoản phải là 4-6 chữ số.";
    return "";
  }

  // Họ tên: chỉ chữ cái (kể cả tiếng Việt) và khoảng trắng, không để trống
  validateName(name) {
    if (!name || name.trim() === "") return "Họ tên không được để trống.";
    if (!/^[\p{L}\s]+$/u.test(name.trim())) return "Họ tên chỉ được chứa chữ cái.";
    return "";
  }

  // Email đúng định dạng, không để trống
  validateEmail(email) {
    if (!email || email.trim() === "") return "Email không được để trống.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Email không đúng định dạng.";
    return "";
  }

  // Mật khẩu 6-10 ký tự, có ít nhất 1 số, 1 hoa, 1 ký tự đặc biệt
  validatePassword(password) {
    if (!password || password.trim() === "") return "Mật khẩu không được để trống.";
    const pw = password.trim();
    if (pw.length < 6 || pw.length > 10) return "Mật khẩu phải từ 6-10 ký tự.";
    if (!/[0-9]/.test(pw)) return "Mật khẩu phải chứa ít nhất 1 chữ số.";
    if (!/[A-Z]/.test(pw)) return "Mật khẩu phải chứa ít nhất 1 chữ hoa.";
    if (!/[!@#$%^&*()\-_=+\[\]{};':"\\|,.<>\/?]/.test(pw)) return "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt.";
    return "";
  }

  // Ngày làm: không để trống, định dạng mm/dd/yyyy
  validateDate(date) {
    if (!date || date.trim() === "") return "Ngày làm không được để trống.";
    if (!/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/.test(date.trim())) {
      return "Ngày làm phải đúng định dạng mm/dd/yyyy.";
    }
    return "";
  }

  // Lương cơ bản: 1,000,000 - 20,000,000
  validateSalary(salary) {
    if (salary === "" || salary === null || salary === undefined) return "Lương cơ bản không được để trống.";
    const num = Number(salary);
    if (isNaN(num)) return "Lương cơ bản phải là số.";
    if (num < 1000000 || num > 20000000) return "Lương cơ bản phải từ 1.000.000 đến 20.000.000.";
    return "";
  }

  // Chức vụ hợp lệ
  validatePosition(position) {
    const valid = ["Giám đốc", "Trưởng Phòng", "Nhân Viên"];
    if (!position || !valid.includes(position.trim())) {
      return "Vui lòng chọn chức vụ hợp lệ.";
    }
    return "";
  }

  // Giờ làm: 80 - 200 giờ
  validateHour(hour) {
    if (hour === "" || hour === null || hour === undefined) return "Số giờ làm không được để trống.";
    const num = Number(hour);
    if (isNaN(num)) return "Số giờ làm phải là số.";
    if (num < 80 || num > 200) return "Số giờ làm phải từ 80 đến 200 giờ.";
    return "";
  }

  // Validate toàn bộ, trả về true nếu hợp lệ
  validateAll(account, name, email, password, date, salary, position, hour) {
    const errors = {
      account:  this.validateAccount(account),
      name:     this.validateName(name),
      email:    this.validateEmail(email),
      password: this.validatePassword(password),
      date:     this.validateDate(date),
      salary:   this.validateSalary(salary),
      position: this.validatePosition(position),
      hour:     this.validateHour(hour),
    };

    document.getElementById("tbTKNV").innerText    = errors.account;
    document.getElementById("tbTen").innerText     = errors.name;
    document.getElementById("tbEmail").innerText   = errors.email;
    document.getElementById("tbMatKhau").innerText = errors.password;
    document.getElementById("tbNgay").innerText    = errors.date;
    document.getElementById("tbLuongCB").innerText = errors.salary;
    document.getElementById("tbChucVu").innerText  = errors.position;
    document.getElementById("tbGiolam").innerText  = errors.hour;

    return Object.values(errors).every((e) => e === "");
  }

  // Xóa tất cả thông báo lỗi
  clearErrors() {
    ["tbTKNV","tbTen","tbEmail","tbMatKhau","tbNgay","tbLuongCB","tbChucVu","tbGiolam"].forEach((id) => {
      document.getElementById(id).innerText = "";
    });
  }
}
