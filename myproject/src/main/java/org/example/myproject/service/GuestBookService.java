package org.example.myproject.service;

import org.example.myproject.dto.GuestBookDto;

import java.util.List;

public interface GuestBookService {
    GuestBookDto findGuestBook(Long id);

    GuestBookDto createGuestBook(GuestBookDto guestBookDto);

    List<GuestBookDto> findAllGuestBooks();
}
