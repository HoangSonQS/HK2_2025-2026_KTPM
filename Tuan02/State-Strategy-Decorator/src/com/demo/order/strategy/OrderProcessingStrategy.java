package com.demo.order.strategy;

public interface OrderProcessingStrategy {
    void process(Order order);
    String getName();
}
