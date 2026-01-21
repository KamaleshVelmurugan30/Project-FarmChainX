//package com.hello.Hello.controller;
//
//import com.hello.Hello.dto.LoginRequest;
//import com.hello.Hello.entity.User;
//import com.hello.Hello.repository.UserRepository;
//import com.hello.Hello.security.JwtService;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/auth")
//@CrossOrigin
//public class AuthController {
//
//    private final UserRepository userRepository;
//    private final JwtService jwtService;
//
//    public AuthController(UserRepository userRepository, JwtService jwtService) {
//        this.userRepository = userRepository;
//        this.jwtService = jwtService;
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
//
//        User user = userRepository.findByEmail(request.getEmail())
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        // password check skipped for demo
//        String token = jwtService.generateToken(user);
//
//        return ResponseEntity.ok(
//                Map.of(
//                        "token", token,
//                        "role", user.getRole().name()
//                )
//        );
//    }
//}
//package com.hello.Hello.controller;
//
//import com.hello.Hello.dto.LoginRequest;
//import com.hello.Hello.dto.LoginResponse;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/auth")
//@CrossOrigin(origins = "http://localhost:3000")
//public class AuthController {
//
//    @PostMapping("/login")
//    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
//
//        // TEMP login logic (for frontend integration)
//        if ("demo123".equals(request.getPassword())) {
//            return ResponseEntity.ok(
//                new LoginResponse(
//                    "mock-jwt-token",
//                    request.getRole(),
//                    "Login successful"
//                )
//            );
//        }
//
//        return ResponseEntity.status(401)
//                .body(new LoginResponse(null, null, "Invalid credentials"));
//    }
//}
//package com.hello.Hello.controller;
//
//import com.hello.Hello.dto.LoginRequest;
//import com.hello.Hello.dto.LoginResponse;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/auth")
//@CrossOrigin(origins = "http://localhost:3000")
//public class AuthController {
//
//    @PostMapping("/login")
//    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
//
//        // TEMP password check
//        if (!"demo123".equals(request.getPassword())) {
//            return ResponseEntity.status(401)
//                    .body(new LoginResponse(null, null, "Invalid credentials"));
//        }
//
//        // ✅ BACKEND controls role
//        String role;
//
//        switch (request.getUsername().toLowerCase()) {
//            case "admin":
//                role = "ADMIN";
//                break;
//            case "farmer":
//                role = "FARMER";
//                break;
//            case "distributor":
//                role = "DISTRIBUTOR";
//                break;
//            default:
//                role = "USER";
//        }
//
//        return ResponseEntity.ok(
//            new LoginResponse(
//                "mock-jwt-token",
//                role,
//                "Login successful"
//            )
//        );
//    }
//}
package com.hello.Hello.controller;

import com.hello.Hello.dto.LoginRequest;
import com.hello.Hello.dto.LoginResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @PostMapping("/login")
////    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
////
////        // ✅ TEMP password check
////        if (!"demo123".equals(request.getPassword())) {
////            return ResponseEntity.status(401)
////                    .body(new LoginResponse(null, null, "Invalid credentials"));
////        }
////
////        // ✅ Use EMAIL to decide role
////        String role;
////        String email = request.getEmail().toLowerCase();
////
////        if (email.contains("admin")) {
////            role = "ADMIN";
////        } else if (email.contains("farmer")) {
////            role = "FARMER";
////        } else if (email.contains("distributor")) {
////            role = "DISTRIBUTOR";
////        } else {
////            role = "USER";
////        }
////
////        return ResponseEntity.ok(
////                new LoginResponse(
////                        "mock-jwt-token",
////                        role,
////                        "Login successful"
////                )
////        );
////    }
////}
////    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {

        // 1️⃣ Validate email
        if (request.getEmail() == null || request.getEmail().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(new LoginResponse(null, null, "Email is required"));
        }

        // 2️⃣ Validate password
        if (!"demo123".equals(request.getPassword())) {
            return ResponseEntity.status(401)
                    .body(new LoginResponse(null, null, "Invalid credentials"));
        }

        // 3️⃣ Decide role from EMAIL
        String email = request.getEmail().toLowerCase();
        String role;

        if (email.contains("admin")) {
            role = "ADMIN";
        } else if (email.contains("farmer")) {
            role = "FARMER";
        } else if (email.contains("distributor")) {
            role = "DISTRIBUTOR";
        } else {
            role = "USER";
        }

        // 4️⃣ Success response
        return ResponseEntity.ok(
                new LoginResponse(
                        "mock-jwt-token",
                        role,
                        "Login successful"
                )
        );
    }
}
//    @PostMapping("/login")
//    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
//
//        if (!"demo123".equals(request.getPassword())) {
//            return ResponseEntity.status(401)
//                    .body(new LoginResponse(null, null, "Invalid credentials"));
//        }
//
//        String email = request.getEmail().toLowerCase();
//        String role;
//
//        if (email.contains("admin")) {
//            role = "ADMIN";
//        } else if (email.contains("farmer")) {
//            role = "FARMER";
//        } else if (email.contains("distributor")) {
//            role = "DISTRIBUTOR";
//        } else {
//            role = "CUSTOMER"; 
//        }
//
//        String token = jwtService.generateToken(email, role);
//
//        return ResponseEntity.ok(
//                new LoginResponse(token, role, "Login successful")
//        );
//    }

//package com.hello.Hello.controller;
//
//import com.hello.Hello.dto.LoginRequest;
//import com.hello.Hello.dto.LoginResponse;
//import com.hello.Hello.security.JwtService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/auth")
//@CrossOrigin(origins = "http://localhost:3000")
//public class AuthController {
//
//    private final JwtService jwtService;
//
//    public AuthController(JwtService jwtService) {
//        this.jwtService = jwtService;
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
//
//        // Validate email
//        if (request.getEmail() == null || request.getEmail().isEmpty()) {
//            return ResponseEntity.badRequest()
//                    .body(new LoginResponse(null, null, "Email is required"));
//        }
//
//        // 2 Validate password (TEMP demo password)
//        if (!"demo123".equals(request.getPassword())) {
//            return ResponseEntity.status(401)
//                    .body(new LoginResponse(null, null, "Invalid credentials"));
//        }
//
//        //  Decide role from email
//        String email = request.getEmail().toLowerCase();
//        String role;
//
//        if (email.contains("admin")) {
//            role = "ADMIN";
//        } else if (email.contains("farmer")) {
//            role = "FARMER";
//        } else if (email.contains("distributor")) {
//            role = "DISTRIBUTOR";
//        } else {
//            role = "USER";
//        }
//
//        // Generate JWT token
//        String token = jwtService.generateToken(email, role);
//
//        //  Return response
//        return ResponseEntity.ok(
//                new LoginResponse(
//                        token,
//                        role,
//                        "Login successful"
//                )
//        );
//    }
//}
