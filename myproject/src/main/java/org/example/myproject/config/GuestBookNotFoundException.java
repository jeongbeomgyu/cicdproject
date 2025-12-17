package org.example.myproject.config;

public class GuestBookNotFoundException extends RuntimeException{
    public GuestBookNotFoundException(String message) {
        super(message);
    }
}
