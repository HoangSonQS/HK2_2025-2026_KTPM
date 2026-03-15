package com.demo.payment.state;

public interface PaymentState {
    void pay(PaymentContext ctx, double amount);
    void refund(PaymentContext ctx);
    void fail(PaymentContext ctx);
}
