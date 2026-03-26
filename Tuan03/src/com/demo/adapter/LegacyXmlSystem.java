package com.demo.adapter;

public class LegacyXmlSystem {
    private XmlCompatibleService targetService;

    public LegacyXmlSystem(XmlCompatibleService targetService) {
        this.targetService = targetService;
    }

    public void executeTask() {
        System.out.println("[Legacy System] Khởi tạo quy trình xuất dữ liệu...");
        String legacyData = "<user><name>Hoang Son</name><action>login</action></user>";
        System.out.println("[Legacy System] Gửi dữ liệu XML: " + legacyData);
        
        targetService.sendXmlData(legacyData);
    }
}
