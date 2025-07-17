# Afternoon Practices

# Task 1

Tích hợp xác thực và phân quyền người dùng cho project `Task Management` hôm trước với các tiêu chí:

1. Nếu chưa đăng nhập thì không vào được phần quản lý tasks và chuyển hướng lại trang login
2. Trong giao diện quản lý task: Phải kiểm tra - Nếu chưa đăng nhập thì chuyến hướng lại trang login
3. Tại giao diện login: Nếu đã login rồi thì chuyển hướng lại trang quản lý task
4. Dựa vào thông tin `roles` của user vừa login. Hãy phân quyền các Button xử lý sự kiện: Thêm, Sửa, Xóa. Nếu có quyền `Administrator` thì mới hiển thị.

Lưu ý: Sử dụng `axios client`, `useAuthStore` như đã hướng dẫn.
