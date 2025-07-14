# Đề bài 2: Ứng dụng quản lý giỏ hàng (Cart Management)

**Mô tả**: Xây dựng ứng dụng quản lý giỏ hàng, cho phép thêm sản phẩm từ lưới sản phẩm và nhập thông tin người mua trên trang giỏ hàng.

## **Câu 1 (4 điểm)**  

Tạo form  `BuyerForm.jsx`  nhập thông tin người mua, hiển thị lỗi validation, console.log dữ liệu khi submit.

**Bảng: Trường và validation**

| Trường   | Kiểu dữ liệu | Bắt buộc | Quy tắc validation                  | Thông báo lỗi                              |
|----------|--------------|----------|-------------------------------------|--------------------------------------------|
| name     | Text         | Có       | Required, min 2 ký tự               | "Name is required", "Minimum 2 characters" |
| email    | Text         | Có       | Required, định dạng email           | "Email is required", "Invalid email"       |
| address  | Text         | Có       | Required, min 5 ký tự               | "Address is required", "Minimum 5 characters" |

**Yêu cầu**:  

1. Form `BuyerForm.jsx` với 3 trường, nút submit (1 điểm).  
2. Validation name + lỗi (1 điểm).  
3. Validation email + lỗi (1 điểm).  
4. Validation address + console.log (1 điểm).


**Điểm**: Đầy đủ: 4 điểm; thiếu 1-2 yêu cầu: 2-3 điểm; không hoạt động: 0-1 điểm.

---

## **Câu 2 (3 điểm)**  

Quản lý giỏ hàng toàn cục (`{ id, name, price }`). Tạo lưới sản phẩm (giả lập, ít nhất 3 sản phẩm) với nút "Add to Cart". Hiển thị danh sách giỏ hàng với name, price.

**Yêu cầu**:  

1. Quản lý trạng thái giỏ hàng toàn cục `CartProvider.jsx` (1 điểm).  
2. Lưới sản phẩm  ( `ProductList.jsx` - min 3) với nút "Add to Cart" (1 điểm).  
3. Hiển thị danh sách giỏ  `CartList.jsx` (name, price) (1 điểm).

**Điểm**: Đầy đủ: 3 điểm; thiếu lưới/tích hợp: 1-2 điểm; không có trạng thái: 0 điểm.

---

## **Câu 3 (3 điểm)**  

Tạo điều hướng với 2 trang, thêm navigation, hiển thị giỏ hàng kèm form người mua.

**Bảng: Route và component**

| Path           | Component            | Mô tả                                                      |
|----------------|----------------------|------------------------------------------------------------|
| `/`            | `ProductList`        | Lưới sản phẩm với nút "Add to Cart".                       |
| `/cart`        | `CartList`, `BuyerForm` | Danh sách giỏ hàng và form người mua.                     |

**Yêu cầu**:  

1. Cấu hình 2 route (1 điểm).  
2. Navigation "Home", "Cart" (1 điểm).  
3. `CartList` + `BuyerForm` trên `/cart` (1 điểm).

**Điểm**: Đầy đủ: 3 điểm; thiếu route/navigation: 1-2 điểm; không hoạt động: 0 điểm.
