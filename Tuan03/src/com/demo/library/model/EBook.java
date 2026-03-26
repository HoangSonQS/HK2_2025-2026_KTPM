package com.demo.library.model;

/** Sách điện tử - Concrete Product của Factory Method */
public class EBook implements Book {
    private final String title;
    private final String author;
    private final String category;

    public EBook(String title, String author, String category) {
        this.title = title;
        this.author = author;
        this.category = category;
    }

    @Override public String getTitle()    { return title; }
    @Override public String getAuthor()   { return author; }
    @Override public String getCategory() { return category; }

    @Override
    public String toString() {
        return "[EBook] " + title + " - " + author + " (" + category + ")";
    }
}
