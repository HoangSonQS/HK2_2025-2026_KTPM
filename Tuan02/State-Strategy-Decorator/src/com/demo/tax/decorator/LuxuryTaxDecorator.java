package com.demo.tax.decorator;

public class LuxuryTaxDecorator extends TaxDecorator {
    public LuxuryTaxDecorator(TaxComponent component) {
        super(component);
    }

    @Override
    public double calculate(double amount) {
        double baseTax = super.calculate(amount);
        return baseTax + (amount * 0.20); // Add 20% Luxury Tax
    }
}
