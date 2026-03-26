package com.demo.library.decorator;

import java.time.LocalDate;

/**
 * Decorator Pattern - Concrete Decorator: Gia hạn thêm thời gian mượn.
 * Khi wrap lên một BorrowableItem, nó tự động gia hạn thêm 14 ngày
 * và ghi đè lại logic isOverdue() để tính đúng hạn mới.
 */
public class ExtendedTimeDecorator extends LoanDecorator {
    private static final int EXTENSION_DAYS = 14;
    private final LocalDate extendedDueDate;

    public ExtendedTimeDecorator(BorrowableItem wrappedItem) {
        super(wrappedItem);
        // Tính ngày gia hạn: Lấy hạn gốc + 14 ngày
        if (wrappedItem instanceof BaseBookLoan) {
            extendedDueDate = ((BaseBookLoan) wrappedItem).getDueDate().plusDays(EXTENSION_DAYS);
        } else {
            extendedDueDate = LocalDate.now().plusDays(EXTENSION_DAYS);
        }
    }

    @Override
    public void borrow() {
        wrappedItem.borrow();
        System.out.println("  [+ExtendedTime] Đã gia hạn thêm " + EXTENSION_DAYS
                + " ngày. Hạn mới: " + extendedDueDate);
    }

    @Override
    public boolean isOverdue() {
        return LocalDate.now().isAfter(extendedDueDate);
    }
}
