package com.demo.payment.strategy;

public interface PaymentMethod {
    void pay(double amount);
    String getName();
}
