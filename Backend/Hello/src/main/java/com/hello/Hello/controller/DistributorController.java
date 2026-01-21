package com.hello.Hello.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/distributor")
@PreAuthorize("hasRole('DISTRIBUTOR')")
public class DistributorController {

    @GetMapping("/dashboard")
    public String dashboard() {
        return "Distributor Dashboard";
    }
}
