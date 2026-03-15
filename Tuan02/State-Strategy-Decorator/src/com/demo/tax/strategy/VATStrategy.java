package com.demo.tax.strategy;

public class VATStrategy implements TaxStrategy {
    @Override
    public double calculate(double amount) {
        return amount * 0.10; // 10% VAT
    }

    @Override
    public String getName() {
        return "Value Added Tax (10%)";
    }
}
