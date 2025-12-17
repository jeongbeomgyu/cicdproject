package org.example.myproject.service;

import lombok.RequiredArgsConstructor;
import org.example.myproject.config.DuplicateGuestBookException;
import org.example.myproject.config.GuestBookNotFoundException;
import org.example.myproject.dto.GuestBookDto;
import org.example.myproject.entity.GuestBook;
import org.example.myproject.repository.GuestBookRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class GuestBookServiceImp implements GuestBookService{

    private final GuestBookRepository guestBookRepository;

    @Override
    public GuestBookDto findGuestBook(Long id) {

        GuestBook guestBook = guestBookRepository.findById(id)
                .orElseThrow(() -> new GuestBookNotFoundException("해당 GuestBook 이 존재하지 않습니다."));

        return GuestBookDto.fromEntity(guestBook);
    }

    @Override
    public GuestBookDto createGuestBook(GuestBookDto guestBookDto) {

        GuestBook entity = guestBookDto.toEntity();
        if (guestBookRepository.findByNickname(entity.getNickname()).isPresent()) {
            throw new DuplicateGuestBookException("존재하는 nickname 입니다.");
        }

        GuestBook saveGuestBook = guestBookRepository.save(entity);

        return GuestBookDto.fromEntity(saveGuestBook);
    }

    @Override
    public List<GuestBookDto> findAllGuestBooks() {
        List<GuestBook> guestBooks = guestBookRepository.findAll();
        return guestBooks.stream()
                .map(GuestBookDto::fromEntity)
                .collect(Collectors.toList());
    }
}
