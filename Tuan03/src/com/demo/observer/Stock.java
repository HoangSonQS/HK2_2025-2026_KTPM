package com.demo.observer;

import java.util.ArrayList;
import java.util.List;

public class Stock implements Subject {
    private List<Observer> observers;
    private String symbol;
    private double price;

    public Stock(String symbol, double price) {
        this.symbol = symbol;
        this.price = price;
        this.observers = new ArrayList<>();
    }

    @Override
    public void attach(Observer observer) {
        if (!observers.contains(observer)) {
            observers.add(observer);
        }
    }

    @Override
    public void detach(Observer observer) {
        observers.remove(observer);
    }

    // Hàm gọi nội bộ (private) để đóng gói Logic
    private void notifyObservers() {
        for (Observer observer : observers) {
            // Push model: đẩy thẳng dữ liệu mới
            observer.update(symbol, price);
        }
    }

    public void setPrice(double newPrice) {
        if (this.price != newPrice) {
            System.out.println("\n[System] Cổ phiếu " + symbol + " thay đổi giá: $" + this.price + " -> $" + newPrice);
            this.price = newPrice;
            // Tự động kích hoạt (trigger) thông báo khi có sự thay đổi
            notifyObservers();
        }
    }
    
    public String getSymbol() { return symbol; }
    public double getPrice() { return price; }
}
