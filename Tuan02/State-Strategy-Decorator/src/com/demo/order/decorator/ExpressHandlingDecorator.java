package com.demo.order.decorator;

public class ExpressHandlingDecorator extends OrderDecorator {
    public ExpressHandlingDecorator(OrderComponent component) {
        super(component);
    }

    @Override
    public String getDescription() {
        return super.getDescription() + ", Express Handling";
    }

    @Override
    public double getCost() {
        return super.getCost() + 35.0; // Express handling cost
    }
}
