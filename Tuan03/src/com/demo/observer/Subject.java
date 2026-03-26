package com.demo.observer;

public interface Subject {
    void attach(Observer observer);
    void detach(Observer observer);
    // Lưu ý: Đã loại bỏ notifyObservers() khỏi public interface
    // Khách hàng không nên, và không được phép tự ý gọi hàm notify.
    // Subject phải tự gọi nội bộ (trigger) khi trạng thái (state) thay đổi.
}
