package com.demo.order.decorator;

public class BaseOrder implements OrderComponent {
    @Override
    public String getDescription() {
        return "Base Order";
    }

    @Override
    public double getCost() {
        return 100.0; // Base cost
    }
}
