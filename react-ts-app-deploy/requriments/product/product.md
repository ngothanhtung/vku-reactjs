# Product Requirements

**User Story**  là một cách tiếp cận phổ biến trong phát triển phần mềm theo Agile/Scrum. Cách này giúp chuyển đổi nhu cầu người dùng thành các yêu cầu rõ ràng, dễ hiểu và dễ lập trình.

---

## ✅ 1. Cấu trúc chuẩn của một User Story

```
As a [loại người dùng],
I want [điều tôi muốn làm],
So that [lý do/mục tiêu tôi cần làm việc đó].
```

### Ví dụ:

> As a **registered user**,
> I want to **reset my password**,
> So that **I can regain access to my account if I forget it**.

---

## ✅ 2. Cách viết chi tiết một User Story

Mỗi User Story nên bao gồm:

| Thành phần                    | Nội dung                                                      |
| ----------------------------- | ------------------------------------------------------------- |
| **User Story**                | Câu mô tả theo mẫu ở trên                                     |
| **Acceptance Criteria**       | Các điều kiện để story được chấp nhận, dạng checklist rõ ràng |
| **Priority**                  | Mức độ ưu tiên: High / Medium / Low                           |
| **Story Points** *(tuỳ chọn)* | Độ phức tạp tương đối để ước lượng effort (ví dụ: 3 points)   |
| **Notes / UI design**         | Ghi chú thêm hoặc đính kèm thiết kế UI (Figma, ảnh...)        |

---

## ✅ 3. Ví dụ đầy đủ về một User Story

### 🧩 **User Story #1: Đăng ký tài khoản**

* **User Story:**
  As a **new visitor**,
  I want to **sign up for an account**,
  So that **I can save my preferences and access member features**.

* **Acceptance Criteria:**

  * [ ] Người dùng có thể nhập Họ, Tên, Email, Mật khẩu
  * [ ] Trường hợp thiếu thông tin hiển thị lỗi rõ ràng
  * [ ] Mật khẩu tối thiểu 8 ký tự
  * [ ] Email không trùng với người dùng khác
  * [ ] Gửi email xác nhận sau khi đăng ký thành công

* **Priority:** High

* **Story Points:** 5

* **UI Design:** Figma link / Ảnh đính kèm

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

