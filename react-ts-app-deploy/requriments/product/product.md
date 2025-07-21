# Product Requirements

## 🧩 **User Story #1: Đăng ký tài khoản**

* **User Story:**
  As a **new visitor**,
  I want to **sign up for an account**,
  So that **I can save my preferences and access member features**.

  [jkd](./product.md)

* **Acceptance Criteria:**

  * [ ] Người dùng có thể nhập Họ, Tên, Email, Mật khẩu
  * [ ] Trường hợp thiếu thông tin hiển thị lỗi rõ ràng
  * [ ] Mật khẩu tối thiểu 8 ký tự
  * [ ] Email không trùng với người dùng khác
  * [ ] Gửi email xác nhận sau khi đăng ký thành công

* **Priority:** High

* **Story Points:** 5

* **UI Design:** Figma link / Ảnh đính kèm

!['mo ta'](./img/photo.png)

---

### 🧩 **User Story #2: Tìm kiếm sản phẩm**

* **User Story:**
  As a **shopper**,
  I want to **search for products by name**,
  So that **I can quickly find the items I’m looking for**.

* **Acceptance Criteria:**

  * [ ] Có ô tìm kiếm trên header
  * [ ] Kết quả hiển thị ngay khi gõ (optional: debounce 300ms)
  * [ ] Không có kết quả thì hiển thị thông báo “Không tìm thấy sản phẩm”
  * [ ] Tìm kiếm không phân biệt chữ hoa/thường

* **Priority:** Medium

* **Story Points:** 3

* **UI Design:** Giao diện có sẵn trong file `SearchResults.png`

---

## ✅ 4. Gợi ý cho từng loại tính năng

| Tính năng        | User                       | Mong muốn                                     | Mục tiêu đạt được                     |
| ---------------- | -------------------------- | --------------------------------------------- | ------------------------------------- |
| Đăng nhập        | Người dùng đã có tài khoản | Đăng nhập bằng email/mật khẩu                 | Truy cập vào hệ thống cá nhân         |
| Quản lý sản phẩm | Admin                      | Thêm/sửa/xoá sản phẩm                         | Quản lý danh mục sản phẩm dễ dàng hơn |
| Giỏ hàng         | Người mua                  | Thêm sản phẩm vào giỏ và tiến hành thanh toán | Mua hàng nhanh chóng và thuận tiện    |
| Báo cáo thống kê | Quản lý                    | Xem báo cáo doanh thu theo thời gian          | Theo dõi hiệu quả kinh doanh          |

---

## ✅ 5. Mẹo khi viết User Story

* Viết từ góc nhìn **người dùng**, không phải developer
* Tránh dùng từ kỹ thuật (tech stack, thuật toán…)
* Dễ đọc, rõ ràng, có thể đưa cho tester viết test case
* Kèm theo ảnh mockup, luồng UX nếu có

---

Nếu bạn có một **dự án cụ thể** (ví dụ: hệ thống quản lý người dùng, trang thương mại điện tử, hệ thống CRM...), bạn có thể gửi các tính năng hoặc mô tả tổng thể, mình sẽ giúp bạn soạn bộ **User Story + Acceptance Criteria đầy đủ** cho từng tính năng.

Bạn muốn bắt đầu với module nào?
