package org.example.myproject.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class GuestBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nickname;

    @Column(nullable = false)
    private String content;

    private LocalDateTime createdAt;

    @PrePersist // Entity가 DB에 저장되기 전에 이 메서드가 실행됩니다.
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
