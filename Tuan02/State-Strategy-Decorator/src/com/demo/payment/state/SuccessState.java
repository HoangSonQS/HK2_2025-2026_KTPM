package com.demo.payment.state;

public class SuccessState implements PaymentState {
    @Override
    public void pay(PaymentContext ctx, double amount) {
        System.out.println("[Success] Payment already completed successfully.");
    }

    @Override
    public void refund(PaymentContext ctx) {
        System.out.println("[Success] Processing full refund for the payment.");
        // Usually transitions to a RefundedState, but we'll end here for simplicity
        System.out.println("  [Refunded] Money sent back to customer.");
    }

    @Override
    public void fail(PaymentContext ctx) {
        System.out.println("[Success] Cannot fail a completed payment.");
    }
}
