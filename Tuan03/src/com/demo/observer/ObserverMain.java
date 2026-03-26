package com.demo.observer;

public class ObserverMain {
    public static void main(String[] args) {
        System.out.println("=== Observer Pattern (Stock Market) Demo ===");
        
        // 1. Tạo một Object Observable (Subject)
        Stock appleStock = new Stock("AAPL", 150.0);
        
        // 2. Tạo các Observers
        Investor investor1 = new Investor("Hoàng Sơn");
        Investor investor2 = new Investor("Trần Văn A");
        Investor investor3 = new Investor("Nguyễn Thị B");
        
        System.out.println("\n[Action] Các nhà đầu tư đăng ký thông báo (Subscribe)");
        appleStock.attach(investor1);
        appleStock.attach(investor2);
        appleStock.attach(investor3);
        
        // 3. Thay đổi trạng thái -> Trigger Tự động Push notification
        appleStock.setPrice(152.5);
        
        System.out.println("\n[Action] Khách hàng B hủy đăng ký (Unsubscribe)");
        appleStock.detach(investor3);
        
        // 4. Thay đổi lần 2
        appleStock.setPrice(149.0);
        
        System.out.println("\n=== Demo Complete ===");
    }
}
