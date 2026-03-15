package com.demo.payment.strategy;

public class PaymentStrategyMain {
    public static void main(String[] args) {
        System.out.println("=== Payment Processing (Strategy Pattern) Demo ===");
        
        PaymentService service = new PaymentService();
        double amount = 150.0;
        
        System.out.println("\n-- Processing with default strategy (Credit Card)");
        service.processPayment(amount);
        
        System.out.println("\n-- Switching to PayPal");
        service.setMethod(new PaypalPayment());
        service.processPayment(amount);
        
        System.out.println("\n-- Switching to Bank Transfer");
        service.setMethod(new BankTransferPayment());
        service.processPayment(amount);
        
        System.out.println("\n=== Demo Complete ===");
    }
}
