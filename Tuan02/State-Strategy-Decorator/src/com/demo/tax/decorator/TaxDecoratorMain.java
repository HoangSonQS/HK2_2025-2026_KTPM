package com.demo.tax.decorator;

public class TaxDecoratorMain {
    public static void main(String[] args) {
        System.out.println("=== Tax Calculation (Decorator Pattern) Demo ===");
        
        double saleAmount = 5000.0;
        System.out.println("\nSale Amount: $" + saleAmount);
        
        // 1. Base Tax only (5%)
        TaxComponent tax1 = new BaseTax();
        System.out.println("\n1. Base Tax Calculation: $" + tax1.calculate(saleAmount));
        
        // 2. Base Tax + VAT (5% + 10%)
        TaxComponent tax2 = new VATDecorator(new BaseTax());
        System.out.println("2. Base + VAT Tax Calculation: $" + tax2.calculate(saleAmount));
        
        // 3. Base Tax + Luxury Tax + Discount 
        TaxComponent tax3 = new DiscountDecorator(new LuxuryTaxDecorator(new BaseTax()));
        System.out.println("3. Base + Luxury Tax, minus Discount: $" + tax3.calculate(saleAmount));
        
        System.out.println("\n=== Demo Complete ===");
    }
}
