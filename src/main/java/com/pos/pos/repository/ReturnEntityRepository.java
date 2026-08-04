package com.pos.pos.repository;

import com.pos.pos.entity.ReturnEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReturnEntityRepository extends JpaRepository<ReturnEntity, Long> {
}
