package com.demo.payment.decorator;

public class DiscountDecorator extends PaymentDecorator {
    public DiscountDecorator(PaymentComponent component) {
        super(component);
    }

    @Override
    public void process(double amount) {
        // Apply a 5% discount
        double discountedAmount = amount - (amount * 0.05);
        System.out.println("  [Discount] Applied 5% discount. New amount: $" + discountedAmount);
        super.process(discountedAmount);
    }
}
