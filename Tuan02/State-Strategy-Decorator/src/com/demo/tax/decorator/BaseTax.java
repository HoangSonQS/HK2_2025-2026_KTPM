package com.demo.tax.decorator;

public class BaseTax implements TaxComponent {
    @Override
    public double calculate(double amount) {
        return amount * 0.05; // Base 5% tax
    }
}
