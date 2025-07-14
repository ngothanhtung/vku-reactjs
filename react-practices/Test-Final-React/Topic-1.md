# **Đề bài 1: Ứng dụng quản lý người dùng (User Management)**

**Mô tả**: Xây dựng ứng dụng quản lý người dùng, cho phép thêm người dùng, xem danh sách, và chi tiết người dùng trên các trang khác nhau.

## **Câu 1 (4 điểm)**  

Tạo form `UserForm.jsx` thêm người dùng mới, hiển thị lỗi validation, console.log dữ liệu khi submit.

**Bảng: Trường và validation**

| Trường   | Kiểu dữ liệu | Bắt buộc | Quy tắc validation                  | Thông báo lỗi                              |
|----------|--------------|----------|-------------------------------------|--------------------------------------------|
| name     | Text         | Có       | Required, min 2 ký tự               | "Name is required", "Minimum 2 characters" |
| email    | Text         | Có       | Required, định dạng email           | "Email is required", "Invalid email"       |
| age      | Number       | Không    | Nếu nhập, > 0                       | "Age must be positive"                     |

**Yêu cầu**:  

1. Form `UserForm.jsx` với 3 trường, nút submit (1 điểm).  
2. Validation name + lỗi (1 điểm).  
3. Validation email + lỗi (1 điểm).  
4. Validation age + console.log (1 điểm).

**Điểm**: Đầy đủ: 4 điểm; thiếu 1-2 yêu cầu: 2-3 điểm; không hoạt động: 0-1 điểm.

---

## **Câu 2 (3 điểm)**  

Quản lý danh sách người dùng toàn cục (`{ id, name, email, age }`). Tích hợp form từ Câu 1 để thêm người dùng. Hiển thị danh sách với name, email, age.

**Yêu cầu**:  

1. Quản lý trạng thái toàn cục  `UserProvider.jsx` (1 điểm).  
2. Tích hợp form thêm người dùng (1 điểm).  
3. Hiển thị danh sách `UserList.jsx` (age: "N/A" nếu không có) (1 điểm).

**Điểm**: Đầy đủ: 3 điểm; thiếu tích hợp/danh sách: 1-2 điểm; không có trạng thái: 0 điểm.

---

## **Câu 3 (3 điểm)**  

Tạo điều hướng với 3 trang, thêm navigation, hiển thị chi tiết người dùng.

**Bảng: Route và component**

| Path           | Component            | Mô tả                                                      |
|----------------|----------------------|------------------------------------------------------------|
| `/`            | `UserForm`, `UserList` | Form và danh sách người dùng.                              |
| `/users`       | `UserList`           | Danh sách, mỗi user có link đến `/users/:id`.              |
| `/users/:id`   | `UserDetail`         | Chi tiết user (name, email, age) hoặc "User not found".    |

**Yêu cầu**:  

1. Cấu hình 3 route (1 điểm).  
2. Navigation "Home", "Users" (1 điểm).  
3. `UserDetail.jsx`: Chi tiết user hoặc "User not found" và trong `UserList` Link đến `/users/:id` (1 điểm).

**Điểm**: Đầy đủ: 3 điểm; thiếu route/navigation: 1-2 điểm; không hoạt động: 0 điểm.
