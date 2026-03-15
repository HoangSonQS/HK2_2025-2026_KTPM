package com.demo.tax.decorator;

public class VATDecorator extends TaxDecorator {
    public VATDecorator(TaxComponent component) {
        super(component);
    }

    @Override
    public double calculate(double amount) {
        double baseTax = super.calculate(amount);
        return baseTax + (amount * 0.10); // Add 10% VAT
    }
}
