package com.demo.library.factory;

import com.demo.library.model.Book;
import com.demo.library.model.PaperBook;
import com.demo.library.model.EBook;
import com.demo.library.model.AudioBook;

/**
 * Factory Method Pattern - Creator.
 * Đóng gói logic khởi tạo các loại Book. Khi cần thêm loại sách mới,
 * chỉ cần tạo class mới và bổ sung một case vào đây (OCP).
 */
public class SimpleBookFactory {

    public static final String PAPER = "paper";
    public static final String EBOOK = "ebook";
    public static final String AUDIO = "audio";

    public Book createBook(String type, String title, String author, String category) {
        switch (type.toLowerCase()) {
            case PAPER: return new PaperBook(title, author, category);
            case EBOOK: return new EBook(title, author, category);
            case AUDIO: return new AudioBook(title, author, category);
            default:
                throw new IllegalArgumentException("Loại sách không hợp lệ: " + type);
        }
    }
}
