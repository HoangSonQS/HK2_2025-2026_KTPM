package com.demo.library.model;

/**
 * Component chung (Interface) đại diện cho mọi loại sách trong hệ thống.
 * Mọi loại sách (PaperBook, EBook, AudioBook) đều implement interface này.
 * Đây là điểm trung tâm để Factory tạo ra và Strategy/Decorator thao tác lên.
 */
public interface Book {
    String getTitle();
    String getAuthor();
    String getCategory();
}
