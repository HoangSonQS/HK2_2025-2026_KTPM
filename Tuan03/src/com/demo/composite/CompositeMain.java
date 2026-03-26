package com.demo.composite;

public class CompositeMain {
    public static void main(String[] args) {
        System.out.println("=== Composite Pattern (File System) Demo ===");
        
        // 1. Tạo các tập tin (Leaf)
        FileSystemComponent file1 = new File("document.txt", 150);
        FileSystemComponent file2 = new File("image.png", 2048);
        FileSystemComponent file3 = new File("video.mp4", 15000);
        
        // 2. Tạo các thư mục (Composite)
        Folder rootDir = new Folder("Root");
        Folder docsDir = new Folder("Documents");
        Folder mediaDir = new Folder("Media");
        
        // 3. Xây dựng cấu trúc cây (Tree structure)
        docsDir.addComponent(file1);
        
        mediaDir.addComponent(file2);
        mediaDir.addComponent(file3);
        
        rootDir.addComponent(docsDir);
        rootDir.addComponent(mediaDir);
        
        // Thêm một file trực tiếp vào Root
        FileSystemComponent file4 = new File("readme.md", 10);
        rootDir.addComponent(file4);
        
        // 4. Hiển thị toàn bộ thông tin (sẽ đệ quy tự động tính size)
        System.out.println("\n[Hiển thị cấu trúc thư mục Root]");
        rootDir.showDetails("");
        
        System.out.println("\n=== Demo Complete ===");
    }
}
