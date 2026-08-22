package com.mplads.rakshak.dto;

public class AuthResponse {
    private String token;
    private String email;
    private String fullName;
    private String role;
    private String district;
    private String state;
    private String department;

    public AuthResponse() {}

    public AuthResponse(String token, String email, String fullName, String role, String district, String state, String department) {
        this.token = token;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
        this.district = district;
        this.state = state;
        this.department = department;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
}
