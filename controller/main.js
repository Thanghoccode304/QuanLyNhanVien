import Staff from "./../models/staff.js";
import Action from "./../models/action.js";
import Validation from "./../models/validation.js";

const validation = new Validation();
const action = new Action();

let editingAccount = null; // Lưu account đang được sửa

// ===================== KHỞI TẠO =====================
document.addEventListener("DOMContentLoaded", () => {
  // Datepicker (jQuery UI)
  if (typeof $ !== "undefined" && $.fn.datepicker) {
    $("#datepicker").datepicker({ dateFormat: "mm/dd/yy" });
  }

  // Ẩn btn Cập nhật khi mở modal Thêm mới
  document.getElementById("btnThem").addEventListener("click", () => {
    action.clearForm();
    validation.clearErrors();
    editingAccount = null;
    document.getElementById("header-title").innerText = "Thêm nhân viên";
    document.getElementById("btnThemNV").style.display = "inline-block";
    document.getElementById("btnCapNhat").style.display = "none";
  });

  // ===================== THÊM NHÂN VIÊN =====================
  document.getElementById("btnThemNV").addEventListener("click", () => {
    const account  = document.getElementById("tknv").value;
    const name     = document.getElementById("name").value;
    const email    = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const date     = document.getElementById("datepicker").value;
    const salary   = document.getElementById("luongCB").value;
    const position = document.getElementById("chucvu").value;
    const hour     = document.getElementById("gioLam").value;

    const isValid = validation.validateAll(account, name, email, password, date, salary, position, hour);
    if (!isValid) return;

    // Kiểm tra tài khoản đã tồn tại chưa
    if (action.getStaffByAccount(account.trim())) {
      document.getElementById("tbTKNV").innerText = "Tài khoản đã tồn tại.";
      return;
    }

    const staff = new Staff(account.trim(), name.trim(), email.trim(), password.trim(), date.trim(), salary, position, hour);
    action.addStaff(staff);
    action.renderTable(action.staffList);
    action.clearForm();
    validation.clearErrors();

    // Đóng modal
    $("#myModal").modal("hide");
  });

  // ===================== CẬP NHẬT NHÂN VIÊN =====================
  document.getElementById("btnCapNhat").addEventListener("click", () => {
    const account  = editingAccount; // Giữ nguyên account cũ
    const name     = document.getElementById("name").value;
    const email    = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const date     = document.getElementById("datepicker").value;
    const salary   = document.getElementById("luongCB").value;
    const position = document.getElementById("chucvu").value;
    const hour     = document.getElementById("gioLam").value;

    const isValid = validation.validateAll(account, name, email, password, date, salary, position, hour);
    if (!isValid) return;

    const updatedStaff = new Staff(account, name.trim(), email.trim(), password.trim(), date.trim(), salary, position, hour);
    action.updateStaff(account, updatedStaff);
    action.renderTable(action.staffList);
    action.clearForm();
    validation.clearErrors();
    editingAccount = null;

    $("#myModal").modal("hide");
  });

  // ===================== TÌM KIẾM THEO LOẠI =====================
  document.getElementById("btnTimNV").addEventListener("click", () => {
    const keyword = document.getElementById("searchName").value;
    const result = action.searchByRank(keyword);
    action.renderTable(result);
  });

  // Tìm kiếm realtime khi gõ
  document.getElementById("searchName").addEventListener("input", () => {
    const keyword = document.getElementById("searchName").value;
    const result = action.searchByRank(keyword);
    action.renderTable(result);
  });

  // Render bảng lần đầu (rỗng)
  action.renderTable(action.staffList);
});

// ===================== XÓA NHÂN VIÊN =====================
// Dùng window để gọi từ onclick trong HTML
window.handleDelete = function (account) {
  if (!confirm(`Bạn có chắc muốn xóa nhân viên có tài khoản: ${account}?`)) return;
  action.deleteStaff(account);
  action.renderTable(action.staffList);
};

// ===================== SỬA NHÂN VIÊN =====================
window.handleEdit = function (account) {
  const staff = action.getStaffByAccount(account);
  if (!staff) return;

  editingAccount = account;
  action.fillForm(staff);
  validation.clearErrors();

  document.getElementById("header-title").innerText = "Cập nhật nhân viên";
  document.getElementById("btnThemNV").style.display = "none";
  document.getElementById("btnCapNhat").style.display = "inline-block";

  $("#myModal").modal("show");
};
