package com.demo.payment.strategy;

public class CreditCardPayment implements PaymentMethod {
    @Override
    public void pay(double amount) {
        System.out.println("[Credit Card] Authorized and paid $" + amount + " via credit card processing network.");
    }

    @Override
    public String getName() {
        return "CreditCardPayment";
    }
}
