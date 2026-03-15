package com.demo.payment.decorator;

public class ProcessingFeeDecorator extends PaymentDecorator {
    public ProcessingFeeDecorator(PaymentComponent component) {
        super(component);
    }

    @Override
    public void process(double amount) {
        // Add a 2$ flat processing fee
        double amountWithFee = amount + 2.0;
        System.out.println("  [Fee Added] Applying $2.00 processing fee. New amount: $" + amountWithFee);
        super.process(amountWithFee);
    }
}
