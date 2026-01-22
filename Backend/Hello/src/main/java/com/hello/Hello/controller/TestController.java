package com.hello.Hello.controller;

import org.springframework.web.bind.annotation.*;
import com.hello.Hello.entity.TestEntity;
import com.hello.Hello.repository.TestRepository;

@RestController
@RequestMapping("/test-db")
public class TestController {

    private final TestRepository repo;

    public TestController(TestRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public String testDatabase() {
        TestEntity entity = new TestEntity("PostgreSQL Connected Successfully 🚀");
        repo.save(entity);
        return "DB Connected & Data Inserted!";
    }
}
