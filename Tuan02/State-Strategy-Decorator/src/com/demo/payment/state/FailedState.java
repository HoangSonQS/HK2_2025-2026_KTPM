package com.demo.payment.state;

public class FailedState implements PaymentState {
    @Override
    public void pay(PaymentContext ctx, double amount) {
        System.out.println("[Failed] Retrying payment of $" + amount + "...");
        ctx.setState(new ProcessingState()); // Retry logic
    }

    @Override
    public void refund(PaymentContext ctx) {
        System.out.println("[Failed] Cannot refund a failed payment.");
    }

    @Override
    public void fail(PaymentContext ctx) {
        System.out.println("[Failed] Payment has already failed.");
    }
}
