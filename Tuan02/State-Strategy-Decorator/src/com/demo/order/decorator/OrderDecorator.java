package com.demo.order.decorator;

public abstract class OrderDecorator implements OrderComponent {
    protected OrderComponent component;

    public OrderDecorator(OrderComponent component) {
        this.component = component;
    }

    @Override
    public String getDescription() {
        return component.getDescription();
    }

    @Override
    public double getCost() {
        return component.getCost();
    }
}
