class Action {
  constructor() {
    this.staffList = [];
  }

  addStaff(staff) {
    this.staffList.push(staff);
  }

  deleteStaff(account) {
    this.staffList = this.staffList.filter((s) => s.account !== account);
  }

  getStaffByAccount(account) {
    return this.staffList.find((s) => s.account === account) || null;
  }

  updateStaff(account, updatedStaff) {
    const idx = this.staffList.findIndex((s) => s.account === account);
    if (idx !== -1) this.staffList[idx] = updatedStaff;
  }

  // Tìm kiếm theo xếp loại
  searchByRank(keyword) {
    if (!keyword || keyword.trim() === "") return this.staffList;
    const kw = keyword.trim().toLowerCase();
    return this.staffList.filter((s) => s.rank.toLowerCase().includes(kw));
  }

  // Render bảng danh sách nhân viên
  renderTable(list) {
    const tbody = document.getElementById("tableDanhSach");
    tbody.innerHTML = "";

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="text-center text-muted">Không có nhân viên nào.</td></tr>`;
      return;
    }

    list.forEach((staff) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${staff.account}</td>
        <td>${staff.name}</td>
        <td>${staff.email}</td>
        <td>${staff.date}</td>
        <td>${staff.position}</td>
        <td>${staff.totalSalary.toLocaleString("vi-VN")} đ</td>
        <td>${staff.rank}</td>
        <td>
          <button class="btn btn-warning btn-sm mr-1" onclick="handleEdit('${staff.account}')">
            <i class="fa fa-edit"></i>
          </button>
          <button class="btn btn-danger btn-sm" onclick="handleDelete('${staff.account}')">
            <i class="fa fa-trash"></i>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Điền dữ liệu vào form khi sửa
  fillForm(staff) {
    document.getElementById("tknv").value = staff.account;
    document.getElementById("name").value = staff.name;
    document.getElementById("email").value = staff.email;
    document.getElementById("password").value = staff.password;
    document.getElementById("datepicker").value = staff.date;
    document.getElementById("luongCB").value = staff.salary;
    document.getElementById("chucvu").value = staff.position;
    document.getElementById("gioLam").value = staff.hour;
    document.getElementById("tknv").readOnly = true;
  }

  // Xóa sạch form
  clearForm() {
    [
      "tknv",
      "name",
      "email",
      "password",
      "datepicker",
      "luongCB",
      "gioLam",
    ].forEach((id) => {
      document.getElementById(id).value = "";
    });
    document.getElementById("chucvu").value = "";
    document.getElementById("tknv").readOnly = false;
  }
}
