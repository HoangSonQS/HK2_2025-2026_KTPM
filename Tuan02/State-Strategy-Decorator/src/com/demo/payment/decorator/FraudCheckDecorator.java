package com.demo.payment.decorator;

public class FraudCheckDecorator extends PaymentDecorator {
    public FraudCheckDecorator(PaymentComponent component) {
        super(component);
    }

    @Override
    public void process(double amount) {
        System.out.println("  [Security] Performing fraud check for amount: $" + amount);
        if (amount > 10000) {
            System.out.println("  [Security Alert] Transaction flagged as potentially fraudulent. Requires manual review.");
            // In a real system, we might throw an exception or halt processing here
        } else {
             System.out.println("  [Security] Fraud check passed.");
        }
        super.process(amount);
    }
}
