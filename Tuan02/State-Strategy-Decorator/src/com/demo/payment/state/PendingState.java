package com.demo.payment.state;

public class PendingState implements PaymentState {
    @Override
    public void pay(PaymentContext ctx, double amount) {
        System.out.println("[Pending] Initiating payment of $" + amount + "...");
        ctx.setState(new ProcessingState());
    }

    @Override
    public void refund(PaymentContext ctx) {
        System.out.println("[Pending] Cannot refund. Payment has not been processed yet.");
    }

    @Override
    public void fail(PaymentContext ctx) {
        System.out.println("[Pending] Payment failed before processing could start.");
        ctx.setState(new FailedState());
    }
}
