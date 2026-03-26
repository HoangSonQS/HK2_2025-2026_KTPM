package com.demo.library.observer;

/** Concrete Observer - Đại diện cho nhân viên/thủ thư của thư viện */
public class Librarian implements Observer {
    private final String name;

    public Librarian(String name) {
        this.name = name;
    }

    @Override
    public void update(String message) {
        System.out.println("  [Thủ thư: " + name + "] Nhận thông báo: " + message);
    }
}
