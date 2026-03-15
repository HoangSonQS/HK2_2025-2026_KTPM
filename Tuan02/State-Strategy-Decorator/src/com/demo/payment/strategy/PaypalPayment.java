package com.demo.payment.strategy;

public class PaypalPayment implements PaymentMethod {
    @Override
    public void pay(double amount) {
        System.out.println("[PayPal] Authorized $" + amount + " from PayPal wallet.");
    }

    @Override
    public String getName() {
        return "PaypalPayment";
    }
}
