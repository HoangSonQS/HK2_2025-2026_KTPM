package com.demo.payment.decorator;

public abstract class PaymentDecorator implements PaymentComponent {
    protected PaymentComponent component;

    public PaymentDecorator(PaymentComponent component) {
        this.component = component;
    }

    @Override
    public void process(double amount) {
        component.process(amount);
    }
}
