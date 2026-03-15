# Báo cáo Demo và Phân tích Design Patterns

## 1. Tổng quan Project
Dự án này trình bày cách triển khai và so sánh ba mẫu thiết kế (design patterns) thuộc nhóm hành vi và cấu trúc: **State**, **Strategy**, và **Decorator**. Các mẫu này được áp dụng vào ba bài toán nghiệp vụ khác nhau để đánh giá sự phù hợp và tính hiệu quả của chúng.

### 1.1 Cấu trúc Project
Mã nguồn được tổ chức theo từng bài toán (problem domain), và mỗi bài toán đều được cài đặt thử nghiệm bằng cả ba mẫu thiết kế.

```text
src/com/demo/
  ├── order/          (Hệ thống quản lý đơn hàng)
  │   ├── state/          -> Cài đặt dùng mẫu State
  │   ├── strategy/       -> Cài đặt dùng mẫu Strategy
  │   └── decorator/      -> Cài đặt dùng mẫu Decorator
  ├── tax/            (Hệ thống tính thuế)
  │   ├── state/          -> Cài đặt dùng mẫu State
  │   ├── strategy/       -> Cài đặt dùng mẫu Strategy
  │   └── decorator/      -> Cài đặt dùng mẫu Decorator
  └── payment/        (Hệ thống xử lý thanh toán)
      ├── state/          -> Cài đặt dùng mẫu State
      ├── strategy/       -> Cài đặt dùng mẫu Strategy
      └── decorator/      -> Cài đặt dùng mẫu Decorator
```

Mỗi package con đều chứa một lớp `Main` hoàn toàn độc lập (ví dụ: `OrderStateMain`, `TaxStrategyMain`) để chạy và minh họa hành vi của pattern đó.

---

## 2. Phân tích So sánh

Các phần dưới đây phân tích việc áp dụng từng pattern vào ba bài toán, từ đó xác định xem pattern nào là lựa chọn phù hợp nhất cho từng kịch bản cụ thể dựa trên code thực tế.

### 2.1 Bài toán 1: Hệ thống Quản lý Đơn hàng (Order Management System)
**Kịch bản:** Một đơn hàng sẽ chuyển đổi qua nhiều giai đoạn (Mới tạo -> Đang xử lý -> Đã giao / Đã hủy). Một số hành động chỉ được phép thực hiện ở các giai đoạn nhất định và hành vi của đơn hàng thay đổi tùy thuộc vào giai đoạn hiện tại.

* **State Pattern (Phù hợp nhất):** Vòng đời của đơn hàng hoạt động giống như một **máy trạng thái hữu hạn (finite state machine)**, nơi hành vi phụ thuộc vào trạng thái hiện tại và các bước chuyển đổi được kiểm soát chặt chẽ. Mẫu State quản lý hiệu quả các quy tắc chuyển đổi nghiêm ngặt này (ví dụ: ngăn chặn việc hủy đơn sau khi đã giao) bằng cách đóng gói các hành vi riêng biệt vào từng lớp trạng thái cụ thể (`NewOrderState`, `ProcessingState`, `DeliveredState`, `CancelledState`).
* **Strategy Pattern:** Kém phù hợp. Mẫu Strategy tập trung vào việc **hoán đổi các thuật toán** (interchangeable algorithms), chứ không dùng để quản lý một vòng đời có thứ tự phụ thuộc vào ngữ cảnh trạng thái hiện tại.
* **Decorator Pattern:** Mẫu Decorator **không thể thực thi các quy tắc vòng đời** hay đảm bảo tính nhất quán của dữ liệu theo trạng thái. Tuy nhiên, nó vẫn có thể được dùng riêng lẻ để bổ sung các tính năng tùy chọn cho đơn hàng (ví dụ: gói quà, giao tốc hành).

### 2.2 Bài toán 2: Tính Thuế (Tax Calculation)
**Kịch bản:** Hệ thống cần tính thuế dựa trên khu vực hoặc loại khách hàng (ví dụ: VAT chuẩn 10%, Thuế giảm 5%, Miễn thuế 0%).

* **State Pattern:** Lệch chuẩn về mặt khái niệm. Việc tính thuế không bao hàm các lần chuyển đổi trạng thái (state transitions) theo thời gian; thay vào đó, nó dựa trên việc lựa chọn một quy tắc cụ thể dựa vào các điều kiện bên ngoài.
* **Strategy Pattern (Phù hợp nhất):** Các quy tắc tính thuế đại diện cho **các thuật toán tính toán thay thế được chọn tại thời điểm chạy (runtime)**. Mẫu Strategy cho phép ứng dụng linh hoạt đổi phương pháp tính thuế (`VATStrategy`, `FlatTaxStrategy`, `ExemptStrategy`) mà không cần sửa đổi ngữ cảnh cốt lõi (`TaxCalculator`).
* **Decorator Pattern:** Có thể hoạt động khi các quy tắc thuế là **các lớp bồi đắp cộng dồn (additive layers)** (ví dụ: Thuế cơ bản + Phí bảo vệ môi trường). Tuy nhiên, nó không phù hợp khi các quy tắc thuế là những thuật toán loại trừ lẫn nhau (nơi công thức của khu vực này hoàn toàn thay thế công thức của khu vực khác). Trong các trường hợp đó, Strategy cung cấp một kiến trúc sạch sẽ hơn nhiều.

### 2.3 Bài toán 3: Xử lý Thanh toán (Payment Processing)
**Kịch bản:** Mở rộng chức năng thanh toán cốt lõi bằng cách thêm linh hoạt các tính năng cắt ngang (cross-cutting concerns) như: Phí xử lý, Tiện ích ghi log, Kiểm tra Gian lận.

* **State Pattern:** Có thể dùng để mô hình hóa vòng đời của một giao dịch thanh toán (ví dụ: đang chờ -> đang xử lý -> thành công -> thất bại). Nó hữu ích để theo dõi giai đoạn của một sự kiện thanh toán đơn lẻ, nhưng không giải quyết được vấn đề đắp thêm các hành vi xử lý.
* **Strategy Pattern:** Thích hợp cho việc **lựa chọn phương thức thanh toán** (ví dụ: thẻ tín dụng, PayPal, chuyển khoản) tại runtime, nhưng thiếu linh hoạt trong việc xếp chồng đồng thời nhiều tính năng bổ sung vì Context thường chỉ chứa một Strategy duy nhất.
* **Decorator Pattern:** **Cực kỳ phù hợp để thêm vào các trách nhiệm cắt ngang (cross-cutting responsibilities)**. Nó đặc biệt hữu dụng cho việc **đắp chồng (stack) các hành vi xử lý tùy chọn một cách linh hoạt tại runtime**. Mẫu này cho phép bọc logic thanh toán cơ bản bằng nhiều lớp độc lập (`LoggingDecorator`, `FraudCheckDecorator`, `ProcessingFeeDecorator`) theo bất kỳ tổ hợp nào, mà không làm thay đổi các lớp cơ sở (base classes) bên dưới.

---

## 3. Kết luận

Dựa trên quá trình cài đặt thực tế và phân tích kiến trúc:

1. **State Pattern:** Tốt nhất cho các **hành vi mang tính vòng đời hoặc điều khiển bởi trạng thái**, chẳng hạn như việc theo dõi các giai đoạn của hệ thống **Quản lý Đơn hàng**. Nó ngăn chặn việc sử dụng các khối `if-else`/`switch` phức tạp để chuyển đổi trạng thái.
2. **Strategy Pattern:** Tốt nhất cho các **thuật toán có thể hoán đổi** quyết định tại runtime, chẳng hạn như **Tính Thuế**. Nó thúc đẩy Nguyên lý Open/Closed cho các logic nghiệp vụ.
3. **Decorator Pattern:** Tốt nhất cho việc **linh hoạt đính kèm thêm các trách nhiệm (responsibilities)** mà không làm thay đổi component cốt lõi, chẳng hạn như việc xếp chồng các xử lý phụ trợ trong **Xử lý Thanh toán**.
