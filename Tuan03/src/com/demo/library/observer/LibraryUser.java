package com.demo.library.observer;

/** Concrete Observer - Đại diện cho người dùng mượn sách */
public class LibraryUser implements Observer {
    private final String name;

    public LibraryUser(String name) {
        this.name = name;
    }

    @Override
    public void update(String message) {
        System.out.println("  [User: " + name + "] Nhận thông báo: " + message);
    }
}
