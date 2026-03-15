package com.demo.tax.decorator;

public abstract class TaxDecorator implements TaxComponent {
    protected TaxComponent component;

    public TaxDecorator(TaxComponent component) {
        this.component = component;
    }

    @Override
    public double calculate(double amount) {
        return component.calculate(amount);
    }
}
