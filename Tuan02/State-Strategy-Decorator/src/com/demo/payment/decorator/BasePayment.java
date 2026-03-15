package com.demo.payment.decorator;

public class BasePayment implements PaymentComponent {
    @Override
    public void process(double amount) {
        System.out.println("[Base Payment] Processing basic payment of $" + amount);
    }
}
