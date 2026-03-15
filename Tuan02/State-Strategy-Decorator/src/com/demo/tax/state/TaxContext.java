package com.demo.tax.state;

public class TaxContext {
    private TaxState state;

    public TaxContext() {
        this.state = new StandardTaxState(); // Default
    }

    public void setState(TaxState state) {
        System.out.println("  [Tax Region Changed] -> " + state.getDescription());
        this.state = state;
    }

    public double applyTax(double amount) {
        return state.applyTax(amount);
    }
    
    public String getDescription() {
        return state.getDescription();
    }
}
