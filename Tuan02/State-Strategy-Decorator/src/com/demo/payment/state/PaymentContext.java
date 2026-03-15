package com.demo.payment.state;

public class PaymentContext {
    private PaymentState state;

    public PaymentContext() {
        this.state = new PendingState(); // Initial state
    }

    public void setState(PaymentState state) {
        System.out.println("  [Payment Transition] -> " + state.getClass().getSimpleName());
        this.state = state;
    }

    public void pay(double amount) {
        state.pay(this, amount);
    }

    public void refund() {
        state.refund(this);
    }

    public void fail() {
        state.fail(this);
    }
}
