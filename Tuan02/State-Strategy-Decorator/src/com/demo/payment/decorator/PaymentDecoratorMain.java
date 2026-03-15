package com.demo.payment.decorator;

public class PaymentDecoratorMain {
    public static void main(String[] args) {
        System.out.println("=== Payment Processing (Decorator Pattern) Demo ===");
        
        double paymentAmount = 250.0;
        System.out.println("\nPayment Amount: $" + paymentAmount);
        
        System.out.println("\n1. Standard Payment (No extra features)");
        PaymentComponent basicPayment = new BasePayment();
        basicPayment.process(paymentAmount);
        
        System.out.println("\n2. Payment with Processing Fee and Logging");
        PaymentComponent decoratedPayment1 = new LoggingDecorator(new ProcessingFeeDecorator(new BasePayment()));
        decoratedPayment1.process(paymentAmount);
        
        System.out.println("\n3. High Value Payment with Fraud Check, Discount, and Logging");
        double highValue = 15000.0;
        PaymentComponent decoratedPayment2 = new LoggingDecorator(new FraudCheckDecorator(new DiscountDecorator(new BasePayment())));
        decoratedPayment2.process(highValue);
        
        System.out.println("\n=== Demo Complete ===");
    }
}
