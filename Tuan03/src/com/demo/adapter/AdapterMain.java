package com.demo.adapter;

public class AdapterMain {
    public static void main(String[] args) {
        System.out.println("=== Adapter Pattern (XML to JSON) Demo ===");
        
        // 1. Tạo Dịch vụ đích (Web Service hiện đại chỉ nhận chuẩn JSON)
        JsonWebService webService = new JsonWebService();
        
        // 2. Tạo Adapter để kết nối (bọc bao) web servicex
        // Đầu vào của Adapter này trên Interface sẽ là dữ liệu XML
        XmlCompatibleService adapter = new XmlToJsonAdapter(webService);
        
        // 3. Khởi tạo một Hệ thống Cũ kĩ (Legacy System)
        // Hệ thống này chỉ biết ném dữ liệu XML ra cho một Target service tương thích
        LegacyXmlSystem clientSystem = new LegacyXmlSystem(adapter);
        
        // 4. Chạy hệ thống giả lập
        System.out.println("\n[Action] Gọi hàm thực thi từ Hệ thống Client...");
        clientSystem.executeTask();
        
        System.out.println("\n=== Demo Complete ===");
    }
}
