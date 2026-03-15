package com.demo.order.decorator;

public class GiftWrapDecorator extends OrderDecorator {
    public GiftWrapDecorator(OrderComponent component) {
        super(component);
    }

    @Override
    public String getDescription() {
        return super.getDescription() + ", with Gift Wrap";
    }

    @Override
    public double getCost() {
        return super.getCost() + 15.0; // Gift wrap cost
    }
}
