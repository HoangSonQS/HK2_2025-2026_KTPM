package com.demo.adapter;

public class XmlToJsonAdapter implements XmlCompatibleService {
    private JsonWebService jsonService;

    public XmlToJsonAdapter(JsonWebService jsonService) {
        this.jsonService = jsonService;
    }

    @Override
    public void sendXmlData(String xmlData) {
        System.out.println("[Adapter] Đang nhận luồng dữ liệu XML...");
        
        String convertedJson = convertXmlToJson(xmlData);
        System.out.println("[Adapter] Hoàn tất chuyển đổi XML -> JSON.");
        
        jsonService.processJsonData(convertedJson);
    }

    private String convertXmlToJson(String xml) {
        return "{ \"data\": \"converted_from_xml\", \"original\": \"" + xml + "\" }";
    }
}
