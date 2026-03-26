package com.demo.library.observer;

/**
 * Observer Pattern - Subject Interface.
 * Đảm bảo ConcreateSubject (LibraryNotifier) phải có đủ attach/detach/notify.
 */
public interface Subject {
    void attach(Observer observer);
    void detach(Observer observer);
    void notifyObservers(String message);
}
