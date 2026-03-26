package com.demo.composite;

public interface FileSystemComponent {
    String getName();
    int getSize();
    void showDetails(String indent);
}
