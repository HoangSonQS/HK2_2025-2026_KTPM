package com.demo.order.state;

public class OrderStateMain {
    public static void main(String[] args) {
        System.out.println("=== Order Management (State Pattern) Demo ===");
        
        OrderContext order = new OrderContext();
        
        // Initial state is New
        System.out.println("\n-- Attempting to process newly created order");
        order.processOrder();
        
        System.out.println("\n-- Checking the order");
        order.checkOrder(); // Moves to Processing
        
        System.out.println("\n-- Processing the order");
        order.processOrder();
        
        System.out.println("\n-- Delivering the order");
        order.deliverOrder(); // Moves to Delivered
        
        System.out.println("\n-- Attempting to cancel a delivered order");
        order.cancelOrder();
        
        System.out.println("\n=== Demo Complete ===");
    }
}
