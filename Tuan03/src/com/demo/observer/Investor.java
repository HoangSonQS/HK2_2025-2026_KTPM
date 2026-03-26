package com.demo.observer;

public class Investor implements Observer {
    private String name;

    public Investor(String name) {
        this.name = name;
    }

    @Override
    public void update(String symbol, double price) {
        System.out.println("  [Push Notification -> " + name + "] CỔ PHIẾU " + symbol + " có dữ liệu giá mới: $" + price);
    }
}
