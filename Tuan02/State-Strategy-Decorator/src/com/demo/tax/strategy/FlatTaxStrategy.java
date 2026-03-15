package com.demo.tax.strategy;

public class FlatTaxStrategy implements TaxStrategy {
    @Override
    public double calculate(double amount) {
        return amount * 0.08; // 8% flat tax
    }

    @Override
    public String getName() {
        return "Flat Tax (8%)";
    }
}
