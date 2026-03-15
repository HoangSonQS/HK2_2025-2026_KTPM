package com.demo.tax.decorator;

public class DiscountDecorator extends TaxDecorator {
    public DiscountDecorator(TaxComponent component) {
        super(component);
    }

    @Override
    public double calculate(double amount) {
        double currentTax = super.calculate(amount);
        return currentTax - (currentTax * 0.10); // 10% discount on the calculated tax
    }
}
