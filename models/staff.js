class Staff {
  constructor(account, name, email, password, date, salary, position, hour) {
    this.account = account;
    this.name = name;
    this.email = email;
    this.password = password;
    this.date = date;
    this.salary = Number(salary);
    this.position = position;
    this.hour = Number(hour);
    this.totalSalary = this.calculateSalary();
    this.rank = this.calculateRank();
  }

  // Tính tổng lương theo chức vụ
  calculateSalary() {
    if (this.position === "Giám đốc") return this.salary * 3;
    if (this.position === "Trưởng Phòng") return this.salary * 2;
    return this.salary * 1; // Nhân Viên
  }

  // Xếp loại theo giờ làm
  calculateRank() {
    if (this.hour >= 192) return "Xuất sắc";
    if (this.hour >= 176) return "Giỏi";
    if (this.hour >= 160) return "Khá";
    return "Trung bình";
  }
}
