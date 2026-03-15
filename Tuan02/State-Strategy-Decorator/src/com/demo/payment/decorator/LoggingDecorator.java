package com.demo.payment.decorator;

public class LoggingDecorator extends PaymentDecorator {
    public LoggingDecorator(PaymentComponent component) {
        super(component);
    }

    @Override
    public void process(double amount) {
        System.out.println("  [Log] Initiating payment processing for amount: $" + amount + " at " + java.time.LocalDateTime.now());
        super.process(amount);
        System.out.println("  [Log] Payment processing complete.");
    }
}
