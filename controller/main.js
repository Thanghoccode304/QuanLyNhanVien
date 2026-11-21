const validation = new Validation();
const action = new Action();

let editingAccount = null;

$(document).ready(function () {
  // Sidebar toggle
  $("#sidebarCollapse").on("click", function () {
    $("#sidebar").toggleClass("active");
  });

  // ========== MỞ MODAL THÊM MỚI ==========
  $("#btnThem").on("click", function () {
    action.clearForm();
    validation.clearErrors();
    editingAccount = null;
    document.getElementById("header-title").innerText = "Thêm nhân viên";
    document.getElementById("btnThemNV").style.display = "inline-block";
    document.getElementById("btnCapNhat").style.display = "none";
  });

  // ========== THÊM NHÂN VIÊN ==========
  $("#btnThemNV").on("click", function () {
    const account = $("#tknv").val().trim();
    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const password = $("#password").val().trim();
    const date = $("#datepicker").val().trim();
    const salary = $("#luongCB").val().trim();
    const position = $("#chucvu").val();
    const hour = $("#gioLam").val().trim();

    // Debug - mở F12 Console để xem
    console.log("=== THÊM NV ===", {
      account,
      name,
      email,
      password,
      date,
      salary,
      position,
      hour,
    });
    console.log("Lỗi TK:", validation.validateAccount(account));
    console.log("Lỗi Tên:", validation.validateName(name));
    console.log("Lỗi Email:", validation.validateEmail(email));
    console.log("Lỗi MK:", validation.validatePassword(password));
    console.log("Lỗi Ngày:", validation.validateDate(date));
    console.log("Lỗi Lương:", validation.validateSalary(salary));
    console.log("Lỗi CV:", validation.validatePosition(position));
    console.log("Lỗi Giờ:", validation.validateHour(hour));

    if (
      !validation.validateAll(
        account,
        name,
        email,
        password,
        date,
        salary,
        position,
        hour,
      )
    )
      return;

    if (action.getStaffByAccount(account)) {
      document.getElementById("tbTKNV").innerText = "Tài khoản đã tồn tại.";
      return;
    }

    const staff = new Staff(
      account,
      name,
      email,
      password,
      date,
      salary,
      position,
      hour,
    );
    action.addStaff(staff);
    action.renderTable(action.staffList);
    action.clearForm();
    validation.clearErrors();
    $("#myModal").modal("hide");
  });

  // ========== CẬP NHẬT NHÂN VIÊN ==========
  $("#btnCapNhat").on("click", function () {
    const account = editingAccount;
    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const password = $("#password").val().trim();
    const date = $("#datepicker").val().trim();
    const salary = $("#luongCB").val().trim();
    const position = $("#chucvu").val();
    const hour = $("#gioLam").val().trim();

    if (
      !validation.validateAll(
        account,
        name,
        email,
        password,
        date,
        salary,
        position,
        hour,
      )
    )
      return;

    const updatedStaff = new Staff(
      account,
      name,
      email,
      password,
      date,
      salary,
      position,
      hour,
    );
    action.updateStaff(account, updatedStaff);
    action.renderTable(action.staffList);
    action.clearForm();
    validation.clearErrors();
    editingAccount = null;
    $("#myModal").modal("hide");
  });

  // ========== TÌM KIẾM THEO LOẠI ==========
  $("#btnTimNV").on("click", function () {
    action.renderTable(action.searchByRank($("#searchName").val()));
  });

  $("#searchName").on("input", function () {
    action.renderTable(action.searchByRank($(this).val()));
  });

  // Render bảng lần đầu
  action.renderTable(action.staffList);
});

// ========== XÓA NHÂN VIÊN ==========
function handleDelete(account) {
  if (!confirm("Bạn có chắc muốn xóa nhân viên: " + account + "?")) return;
  action.deleteStaff(account);
  action.renderTable(action.staffList);
}

// ========== SỬA NHÂN VIÊN ==========
function handleEdit(account) {
  const staff = action.getStaffByAccount(account);
  if (!staff) return;

  editingAccount = account;
  action.fillForm(staff);
  validation.clearErrors();

  document.getElementById("header-title").innerText = "Cập nhật nhân viên";
  document.getElementById("btnThemNV").style.display = "none";
  document.getElementById("btnCapNhat").style.display = "inline-block";

  $("#myModal").modal("show");
}
