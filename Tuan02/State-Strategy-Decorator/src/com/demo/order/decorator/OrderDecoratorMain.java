package com.demo.order.decorator;

public class OrderDecoratorMain {
    public static void main(String[] args) {
        System.out.println("=== Order Management (Decorator Pattern) Demo ===");
        
        // Base order
        OrderComponent myOrder = new BaseOrder();
        System.out.println("\n1. " + myOrder.getDescription() + " -> $" + myOrder.getCost());
        
        // Add gift wrap
        myOrder = new GiftWrapDecorator(myOrder);
        System.out.println("2. " + myOrder.getDescription() + " -> $" + myOrder.getCost());
        
        // Add express handling
        myOrder = new ExpressHandlingDecorator(myOrder);
        System.out.println("3. " + myOrder.getDescription() + " -> $" + myOrder.getCost());
        
        // Another order with insurance
        OrderComponent highValueOrder = new InsuranceDecorator(new BaseOrder());
        System.out.println("\nAnother Order:");
        System.out.println("- " + highValueOrder.getDescription() + " -> $" + highValueOrder.getCost());
        
        System.out.println("\n=== Demo Complete ===");
    }
}
