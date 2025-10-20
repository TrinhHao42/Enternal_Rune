package iuh.fit.se.enternalrunebackend.controller;


import iuh.fit.se.enternalrunebackend.service.UserService;
import iuh.fit.se.enternalrunebackend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("account")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    // DTO login request
    public static class LoginRequest {
        public String email;
        public String password;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginRequest loginRequest) {
        // Xác thực user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.email, loginRequest.password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Lấy user details
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // Tạo token
        String token = jwtUtil.generateToken(userDetails.getUsername());

        // Trả về response
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("username", userDetails.getUsername());
        response.put("roles", userDetails.getAuthorities());
        return response;
    }

    @GetMapping("/me")
    public Map<String, Object> getCurrentUser(Authentication authentication) {
        Map<String, Object> response = new HashMap<>();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            response.put("username", userDetails.getUsername());
            response.put("roles", userDetails.getAuthorities());
        } else {
            response.put("error", "User not authenticated");
        }
        return response;
    }
}
