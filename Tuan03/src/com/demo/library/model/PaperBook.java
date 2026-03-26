package com.demo.library.model;

/** Sách giấy - Leaf / Concrete Product của Factory Method */
public class PaperBook implements Book {
    private final String title;
    private final String author;
    private final String category;

    public PaperBook(String title, String author, String category) {
        this.title = title;
        this.author = author;
        this.category = category;
    }

    @Override public String getTitle()    { return title; }
    @Override public String getAuthor()   { return author; }
    @Override public String getCategory() { return category; }

    @Override
    public String toString() {
        return "[PaperBook] " + title + " - " + author + " (" + category + ")";
    }
}
