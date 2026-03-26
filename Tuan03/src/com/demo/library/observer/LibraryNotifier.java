package com.demo.library.observer;

import java.util.ArrayList;
import java.util.List;

/**
 * Observer Pattern - Concrete Subject.
 * Quản lý danh sách đăng ký và phân phối thông báo.
 * Library được inject LibraryNotifier để gọi khi cần thông báo.
 */
public class LibraryNotifier implements Subject {
    private final List<Observer> observers = new ArrayList<>();

    @Override
    public void attach(Observer observer) {
        observers.add(observer);
        System.out.println("[NotificationHub] Đăng ký theo dõi thành công.");
    }

    @Override
    public void detach(Observer observer) {
        observers.remove(observer);
        System.out.println("[NotificationHub] Hủy đăng ký thành công.");
    }

    @Override
    public void notifyObservers(String message) {
        System.out.println("\n[NotificationHub] Broadcasting: \"" + message + "\"");
        for (Observer o : observers) {
            o.update(message);
        }
    }
}
