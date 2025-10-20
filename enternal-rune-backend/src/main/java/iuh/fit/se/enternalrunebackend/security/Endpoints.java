package iuh.fit.se.enternalrunebackend.security;

public class Endpoints {
    public static final String front_end_host = "http://localhost:3000";
    public static final String[] PUBLIC_GET_ENDPOINTS = {
            "/brands/**",
            "/products/**",
            "/categories/**",
            "/addresses/**",
    };
    public static final String[] PUBLIC_POST_ENDPOINTS = {
            "/account/register",
            "/account/login",
            "/addresses/**",
    };
    public static final String[] ADMIN_GET_ENDPOINTS = {

    };
    public static final String[] ADMIN_POST_ENDPOINTS = {

    };
}
