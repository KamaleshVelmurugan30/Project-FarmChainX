package com.hello.Hello.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hello.Hello.entity.TestEntity;

public interface TestRepository extends JpaRepository<TestEntity, Long> {
}
