package com.demo.order.decorator;

public class InsuranceDecorator extends OrderDecorator {
    public InsuranceDecorator(OrderComponent component) {
        super(component);
    }

    @Override
    public String getDescription() {
        return super.getDescription() + ", includes Insurance";
    }

    @Override
    public double getCost() {
        return super.getCost() + 50.0; // Insurance cost
    }
}
