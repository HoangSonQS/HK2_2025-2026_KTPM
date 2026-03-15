package com.demo.payment.state;

public class PaymentStateMain {
    public static void main(String[] args) {
        System.out.println("=== Payment Processing (State Pattern) Demo ===");
        
        PaymentContext payment = new PaymentContext();
        double amount = 50.0;
        
        System.out.println("\n-- Triggering a payment");
        payment.pay(amount); // Moves to Processing, then Success
        
        System.out.println("\n-- Attempting to pay again (already processing/completed)");
        payment.pay(amount);
        
        System.out.println("\n-- Refunding");
        payment.refund(); // Processes a refund
        
        System.out.println("\n=== Demo Complete ===");
    }
}
