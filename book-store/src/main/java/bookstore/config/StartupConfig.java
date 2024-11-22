package bookstore.config;

import bookstore.dto.request.SaveBookRequest;
import bookstore.dto.request.SaveCategoryRequest;
import bookstore.model.Role;
import bookstore.model.User;
import bookstore.service.BookService;
import bookstore.service.CategoryService;
import bookstore.service.ImageUploadService;
import bookstore.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import bookstore.service.ImageUploadService;
import bookstore.dto.response.ImageUploadResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class StartupConfig implements CommandLineRunner {

    private final UserService userService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final BookService bookService;
    private final CategoryService categoryService;
    private final ImageUploadService imageUploadService;

    @Override
    public void run(String... args) {
        userService.saveUser(User.builder()
                .username("emirhan")
                .password(bCryptPasswordEncoder.encode("pass"))
                .email("emirhan@gmail.com")
                .role(Role.ADMIN)
                .build()
        );
        userService.saveUser(User.builder()
                .username("usta")
                .password(bCryptPasswordEncoder.encode("pass"))
                .email("usta@gmail.com")
                .role(Role.USER)
                .build()
        );

        categoryService.saveCategory(new SaveCategoryRequest(
                "Novel"
        ));
        categoryService.saveCategory(new SaveCategoryRequest(
                "Horror"
        ));
        categoryService.saveCategory(new SaveCategoryRequest(
                "Fantasy"
        ));
        categoryService.saveCategory(new SaveCategoryRequest(
                "Adventure"
        ));
        categoryService.saveCategory(new SaveCategoryRequest(
                "Epic"
        ));
        bookService.saveBook(
                new SaveBookRequest(
                        "The Lord of the Rings",
                        "J.R.R. Tolkien",
                        1216,
                        "The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien.",
                        "publisher",
                        100F,
                        100,

                        3L

                )
        );
        bookService.saveBook(
                new SaveBookRequest(
                        "Harry Potter and the Philosopher's Stone",
                        "J.K. Rowling",
                        223,
                        "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling",
                        "publisher",
                        100F,
                        100,
                        3L

                )
        );
        bookService.saveBook(
                new SaveBookRequest(
                        "To Kill a Mockingbird",
                        "Harper Lee",
                        281,
                        "Published in 1960, this timeless novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it became an instant bestseller.",
                        "J.B. Lippincott & Co.",
                        120F,
                        75,
                        1L
                )
        );

        bookService.saveBook(
                new SaveBookRequest(
                        "1984",
                        "George Orwell",
                        328,
                        "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.",
                        "Secker & Warburg",
                        90F,
                        50,
                        1L
                )
        );

        bookService.saveBook(
                new SaveBookRequest(
                        "Pride and Prejudice",
                        "Jane Austen",
                        279,
                        "A romantic novel that charts the emotional development of the protagonist Elizabeth Bennet.",
                        "T. Egerton, Whitehall",
                        80F,
                        60,
                        1L
                )
        );

        bookService.saveBook(
                new SaveBookRequest(
                        "The Great Gatsby",
                        "F. Scott Fitzgerald",
                        180,
                        "A novel that explores themes of decadence, idealism, resistance to change, and excess.",
                        "Charles Scribner's Sons",
                        95F,
                        40,
                        1L
                )
        );

        bookService.saveBook(
                new SaveBookRequest(
                        "Moby Dick",
                        "Herman Melville",
                        635,
                        "The narrative of Captain Ahab's obsessive quest to seek revenge on the white whale Moby Dick.",
                        "Richard Bentley",
                        110F,
                        25,
                        4L
                )
        );
    }
}