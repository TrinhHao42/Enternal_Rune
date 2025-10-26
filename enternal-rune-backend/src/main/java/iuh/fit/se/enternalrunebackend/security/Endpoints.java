package iuh.fit.se.enternalrunebackend.security;

public class Endpoints {
    public static final String front_end_host = "http://localhost:3000";
    public static final String[] PUBLIC_GET_ENDPOINTS = {
            "/products/**",
            "/categories/**",
            "/addresses/**",
            "/images/**",
            "/account/activate",
            "/api/auth/**"
    };
    public static final String[] PUBLIC_POST_ENDPOINTS = {
            "/account/login",
            "/account/register",
            "/api/auth/**",
            "/api/cart/**",
            "/addresses/**",
            "/payment/**"

    };
    public static final String[] ADMIN_GET_ENDPOINTS = {

    };
    public static final String[] ADMIN_POST_ENDPOINTS = {

    };
}
