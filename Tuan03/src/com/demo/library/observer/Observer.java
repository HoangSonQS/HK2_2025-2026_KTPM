package com.demo.library.observer;

/**
 * Observer Pattern - Observer Interface.
 * Mọi người muốn nhận thông báo từ thư viện phải implement interface này.
 */
public interface Observer {
    void update(String message);
}
