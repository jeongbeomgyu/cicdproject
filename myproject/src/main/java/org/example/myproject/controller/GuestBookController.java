package org.example.myproject.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.myproject.dto.GuestBookDto;
import org.example.myproject.service.GuestBookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/guestbook")
public class GuestBookController {

    private final GuestBookService guestBookService;

    @GetMapping
    public ResponseEntity<List<GuestBookDto>> findAllGuestBooks() {
        List<GuestBookDto> guestBooks = guestBookService.findAllGuestBooks();
        return ResponseEntity.ok(guestBooks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GuestBookDto> findGuestBook(@PathVariable Long id) {
        GuestBookDto findGuestBook = guestBookService.findGuestBook(id);

        return ResponseEntity.ok(findGuestBook);
    }

    @PostMapping
    public ResponseEntity<?> createGuestBook(@RequestBody @Valid GuestBookDto guestBookDto, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {

            String errorMessage = bindingResult.getFieldError().getDefaultMessage();

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }

        GuestBookDto createGuestBook = guestBookService.createGuestBook(guestBookDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(createGuestBook);
    }
}
