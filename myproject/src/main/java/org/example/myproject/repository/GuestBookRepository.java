package org.example.myproject.repository;

import org.example.myproject.entity.GuestBook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GuestBookRepository extends JpaRepository<GuestBook,Long> {
    Optional<GuestBook> findByNickname(String nickname);
}
