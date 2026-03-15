package com.demo.tax.state;

public class TaxStateMain {
    public static void main(String[] args) {
        System.out.println("=== Tax Calculation (State Pattern) Demo ===");
        
        TaxContext calculator = new TaxContext();
        double amount = 1000.0;
        
        System.out.println("\n-- Customer in Standard Region");
        System.out.println("Applying tax for $" + amount + " -> Tax: $" + calculator.applyTax(amount));
        
        System.out.println("\n-- Customer moves to Reduced Region");
        calculator.setState(new ReducedTaxState());
        System.out.println("Applying tax for $" + amount + " -> Tax: $" + calculator.applyTax(amount));
        
        System.out.println("\n-- Customer becomes Tax Exempt");
        calculator.setState(new ExemptState());
        System.out.println("Applying tax for $" + amount + " -> Tax: $" + calculator.applyTax(amount));
        
        System.out.println("\n=== Demo Complete ===");
    }
}
