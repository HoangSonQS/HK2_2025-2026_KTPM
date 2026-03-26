package com.demo.library.decorator;

import com.demo.library.model.Book;
import java.time.LocalDate;

/**
 * Decorator Pattern - Concrete Component.
 * Đại diện cho một phiên mượn sách cơ bản với thông tin: sách, người mượn, hạn trả.
 */
public class BaseBookLoan implements BorrowableItem {
    private final Book book;
    private final String borrower;
    protected LocalDate dueDate;

    public BaseBookLoan(Book book, String borrower, int loanDays) {
        this.book = book;
        this.borrower = borrower;
        this.dueDate = LocalDate.now().plusDays(loanDays);
    }

    @Override
    public void borrow() {
        System.out.println("  → Mượn sách: " + book.getTitle()
                + " | Người mượn: " + borrower
                + " | Hạn trả: " + dueDate);
    }

    @Override
    public void returnItem() {
        System.out.println("  → Trả sách: " + book.getTitle()
                + " của " + borrower + ". Cảm ơn!");
    }

    @Override
    public boolean isOverdue() {
        return LocalDate.now().isAfter(dueDate);
    }

    public Book getBook() {
        return book;
    }

    public String getBorrower() {
        return borrower;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }
}
