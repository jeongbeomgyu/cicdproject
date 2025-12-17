package org.example.myproject.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.example.myproject.entity.GuestBook;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Builder
public class GuestBookDto {

    private Long id;

    @NotEmpty(message = "닉네임을 입력해주세요")
    private String nickname;

    @NotEmpty(message = "내용을 입력해주세요")
    private String content;

    private LocalDateTime createdAt;

    public static GuestBookDto fromEntity(GuestBook entity) {
        return GuestBookDto.builder()
                .id(entity.getId())
                .nickname(entity.getNickname())
                .content(entity.getContent())
                .createdAt(entity.getCreatedAt())
                .build();
    }

    public GuestBook toEntity() {
        return GuestBook.builder()
                .nickname(this.nickname)
                .content(this.content)
                .build();
    }
}
