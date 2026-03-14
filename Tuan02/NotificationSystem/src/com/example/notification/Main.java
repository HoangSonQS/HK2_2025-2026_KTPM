package com.example.notification;


import com.example.notification.manager.NotificationManager;

public class Main {
    public static void main(String[] args) {
        NotificationManager manager = NotificationManager.getInstance();

        manager.sendNotification("EMAIL", "Welcome to the system!");
        manager.sendNotification("SMS", "Your OTP is 123456");
        manager.sendNotification("PUSH", "You have a new message!");
    }
}