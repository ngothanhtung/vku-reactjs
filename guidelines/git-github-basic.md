Dưới đây là danh sách các lệnh Git cơ bản và cách chúng tương ứng với các thao tác Source Control trong Visual Studio Code (VSCode). VSCode tích hợp sẵn Git, cho phép bạn thực hiện hầu hết các thao tác Git thông qua giao diện đồ họa (GUI) mà không cần gõ lệnh trực tiếp. Tuy nhiên, tôi sẽ liệt kê cả lệnh Git dòng lệnh (CLI) và cách thực hiện tương ứng trong VSCode.

### 1. Khởi tạo và cấu hình Git

| **Lệnh Git (CLI)**                                   | **Mô tả**                                        | **Thao tác trong VSCode**                                                                                                    |
| ---------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `git init`                                           | Khởi tạo một kho Git mới trong thư mục hiện tại. | Trong VSCode, vào **Source Control** (Ctrl+Shift+G), nhấp vào **Initialize Repository** để khởi tạo Git trong thư mục dự án. |
| `git config --global user.name "Tên"`                | Thiết lập tên người dùng cho Git.                | Không có giao diện trực tiếp trong VSCode. Bạn cần chạy lệnh này trong **Terminal** (Ctrl+`) của VSCode.                     |
| `git config --global user.email "email@example.com"` | Thiết lập email cho Git.                         | Tương tự, chạy trong **Terminal** của VSCode.                                                                                |

### 2. Quản lý thay đổi (Working Directory & Staging)

| **Lệnh Git (CLI)**            | **Mô tả**                                                         | **Thao tác trong VSCode**                                                                           |
| ----------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `git status`                  | Kiểm tra trạng thái của kho (các file đã thay đổi, staged, v.v.). | Trong **Source Control**, danh sách các file thay đổi (Changes) được hiển thị tự động.              |
| `git add <file>`              | Thêm file cụ thể vào khu vực staging.                             | Trong **Source Control**, nhấp vào dấu **+** bên cạnh file trong phần **Changes** để stage file đó. |
| `git add .`                   | Thêm tất cả các file thay đổi vào staging.                        | Nhấp vào **Stage All Changes** (biểu tượng dấu **+** trên đầu danh sách Changes).                   |
| `git restore --staged <file>` | Gỡ file khỏi khu vực staging (unstage).                           | Nhấp vào dấu **-** bên cạnh file trong phần **Staged Changes** để unstage.                          |
| `git restore <file>`          | Hủy bỏ thay đổi trên file (quay về trạng thái trước).             | Nhấp chuột phải vào file trong **Changes**, chọn **Discard Changes**.                               |

### 3. Commit

| **Lệnh Git (CLI)**                  | **Mô tả**                                                    | **Thao tác trong VSCode**                                                                                            |
| ----------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `git commit -m "Thông điệp commit"` | Lưu các thay đổi đã staged vào kho với thông điệp.           | Trong **Source Control**, nhập thông điệp commit vào ô trên cùng, sau đó nhấp vào **Commit** (biểu tượng dấu check). |
| `git commit --amend`                | Sửa đổi commit trước đó (thêm thay đổi hoặc sửa thông điệp). | Nhấp vào **...** (More Actions) trong **Source Control**, chọn **Commit > Amend Last Commit**.                       |

### 4. Quản lý Branch

| **Lệnh Git (CLI)**             | **Mô tả**                                          | **Thao tác trong VSCode**                                                                                                  |
| ------------------------------ | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `git branch`                   | Liệt kê các branch hiện có.                        | Trong **Source Control**, nhấp vào tên branch ở góc dưới bên trái để xem danh sách branch.                                 |
| `git branch <tên-branch>`      | Tạo một branch mới.                                | Nhấp vào tên branch hiện tại (góc dưới bên trái), chọn **Create Branch**, nhập tên branch.                                 |
| `git checkout <tên-branch>`    | Chuyển sang branch khác.                           | Nhấp vào tên branch hiện tại, chọn branch muốn chuyển từ danh sách.                                                        |
| `git checkout -b <tên-branch>` | Tạo và chuyển sang branch mới.                     | Tương tự như tạo branch, sau khi nhập tên, VSCode tự động chuyển sang branch mới.                                          |
| `git merge <tên-branch>`       | Hợp nhất branch được chỉ định vào branch hiện tại. | Chuyển sang branch đích, nhấp vào **...** trong **Source Control**, chọn **Branch > Merge Branch**, chọn branch cần merge. |
| `git branch -d <tên-branch>`   | Xóa branch.                                        | Nhấp vào **...**, chọn **Branch > Delete Branch**, chọn branch cần xóa.                                                    |

### 5. Làm việc với Remote Repository

| **Lệnh Git (CLI)**             | **Mô tả**                               | **Thao tác trong VSCode**                                                                                          |
| ------------------------------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `git remote add origin <URL>`  | Thêm remote repository (ví dụ: GitHub). | Chạy lệnh này trong **Terminal** của VSCode.                                                                       |
| `git push origin <tên-branch>` | Đẩy branch lên remote repository.       | Nhấp vào **...** trong **Source Control**, chọn **Push** hoặc **Publish Branch** (nếu branch chưa có trên remote). |
| `git pull origin <tên-branch>` | Kéo thay đổi từ remote repository về.   | Nhấp vào **...**, chọn **Pull** để kéo thay đổi từ branch hiện tại.                                                |
| `git clone <URL>`              | Sao chép một kho từ remote về máy.      | Trong VSCode, mở **Command Palette** (Ctrl+Shift+P), gõ `Git: Clone`, nhập URL kho, chọn thư mục lưu.              |
| `git fetch`                    | Lấy dữ liệu từ remote mà không merge.   | Nhấp vào **...**, chọn **Fetch**.                                                                                  |

### 6. Xem lịch sử và so sánh

| **Lệnh Git (CLI)** | **Mô tả**                           | **Thao tác trong VSCode**                                                                                  |
| ------------------ | ----------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `git log`          | Xem lịch sử commit.                 | Nhấp vào **...**, chọn **Show Git Output** hoặc sử dụng extension như **GitLens** để xem lịch sử chi tiết. |
| `git diff`         | Xem sự khác biệt giữa các thay đổi. | Trong **Source Control**, nhấp đúp vào file trong **Changes** để mở chế độ so sánh (diff view).            |

### 7. Xử lý xung đột (Merge Conflict)

- Khi xảy ra xung đột trong quá trình merge hoặc pull, VSCode sẽ hiển thị các file có xung đột trong **Source Control**.
- Mở file xung đột, VSCode cung cấp giao diện trực quan với các tùy chọn như **Accept Current Change**, **Accept Incoming Change**, hoặc **Accept Both Changes** để giải quyết xung đột.
- Sau khi giải quyết, stage file và commit lại (tương đương `git add` và `git commit`).

### Lưu ý khi sử dụng Git trong VSCode

- **Kích hoạt Source Control**: Mở tab **Source Control** (Ctrl+Shift+G) để quản lý Git.
- **Terminal tích hợp**: Nếu cần chạy lệnh Git phức tạp, sử dụng **Terminal** trong VSCode (Ctrl+`).
- **Extension hỗ trợ**: Cài đặt các extension như **GitLens** hoặc **Git Graph** để có trải nghiệm Git mạnh mẽ hơn (xem lịch sử, biểu đồ branch, v.v.).
- **Cập nhật Git**: Đảm bảo Git được cài đặt trên máy và cấu hình đúng để VSCode nhận diện.

Nếu bạn cần giải thích chi tiết hơn về lệnh cụ thể hoặc cách xử lý tình huống cụ thể trong VSCode, hãy cho tôi biết!
