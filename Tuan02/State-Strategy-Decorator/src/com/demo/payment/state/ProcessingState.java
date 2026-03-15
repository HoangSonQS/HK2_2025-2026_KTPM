package com.demo.payment.state;

public class ProcessingState implements PaymentState {
    @Override
    public void pay(PaymentContext ctx, double amount) {
        System.out.println("[Processing] Payment is currently being processed by the gateway...");
        ctx.setState(new SuccessState());
    }

    @Override
    public void refund(PaymentContext ctx) {
        System.out.println("[Processing] Cannot refund while payment is processing.");
    }

    @Override
    public void fail(PaymentContext ctx) {
        System.out.println("[Processing] Payment processing failed.");
        ctx.setState(new FailedState());
    }
}
