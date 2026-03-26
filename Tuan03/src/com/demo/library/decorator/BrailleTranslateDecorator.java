package com.demo.library.decorator;

/**
 * Decorator Pattern - Concrete Decorator: Yêu cầu bản dịch chữ nổi Braille.
 * Khi wrap lên một BorrowableItem, nó bổ sung thông tin
 * rằng sách cần được chuẩn bị ở phiên bản chữ nổi đặc biệt.
 */
public class BrailleTranslateDecorator extends LoanDecorator {

    public BrailleTranslateDecorator(BorrowableItem wrappedItem) {
        super(wrappedItem);
    }

    @Override
    public void borrow() {
        wrappedItem.borrow();
        System.out.println("  [+Braille] Yêu cầu cung cấp phiên bản chữ nổi Braille đặc biệt.");
    }
}
