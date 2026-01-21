package com.hello.Hello.dto;

public class LoginResponse {

    private String token;
    private String role;
    private String message;

    public LoginResponse(String token, String role, String message) {
        this.token = token;
        this.role = role;
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public String getRole() {
        return role;
    }

    public String getMessage() {
        return message;
    }
}
