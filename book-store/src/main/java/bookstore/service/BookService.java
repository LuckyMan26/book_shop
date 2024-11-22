package bookstore.service;

import bookstore.dto.response.BookResponseDto;
import bookstore.dto.request.SaveBookRequest;
import bookstore.dto.request.UpdateBookRequest;
import bookstore.exception.GeneralException;
import bookstore.model.Book;
import bookstore.model.Category;
import bookstore.model.Image;
import bookstore.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final CategoryService categoryService;

    public BookResponseDto saveBook(SaveBookRequest saveBookRequest) {
        System.out.println("save book");
        Category category = categoryService.findById(saveBookRequest.categoryId());

        Book book = Book.builder()
                .title(saveBookRequest.title())
                .author(saveBookRequest.author())
                .pages(saveBookRequest.pages())
                .description(saveBookRequest.description())
                .publisher(saveBookRequest.publisher())
                .price(saveBookRequest.price())
                .quantity(saveBookRequest.quantity())
                .category(category)
                .build();
        bookRepository.save(book);

        return BookResponseDto.convertToBookResponse(book);
    }

    public BookResponseDto updateBook(UpdateBookRequest updateBookRequest) {
        System.out.println(updateBookRequest.id());
        Book book = findById(updateBookRequest.id());

        System.out.println(book.toString());
        System.out.println(updateBookRequest.categoryId());
        Category category = categoryService.findById(updateBookRequest.categoryId());
        System.out.println(category.toString());
        book.setCategory(category);
        book.setAuthor(updateBookRequest.author());
        book.setDescription(updateBookRequest.description());
        book.setPages(updateBookRequest.pages());
        book.setTitle(updateBookRequest.title());
        book.setPrice(updateBookRequest.price());
        book.setQuantity(updateBookRequest.quantity());
        System.out.println("updated");
        bookRepository.save(book);

        System.out.println("Saved");
        return BookResponseDto.convertToBookResponse(book);

    }

    public BookResponseDto getBookById(Long bookId) {
        Book book = findById(bookId);
        return BookResponseDto.convertToBookResponse(book);
    }

    public void deleteBookById(Long bookId) {

        Book book = findById(bookId);
        bookRepository.delete(book);
    }

    public void updateBookImage(Long bookId, Image image) {
        Book bookToUpdate = findById(bookId);
        bookToUpdate.setImage(image);

        bookRepository.save(bookToUpdate);
    }

    private Book findById(Long id){
        return bookRepository.findById(id)
                .orElseThrow(() -> new GeneralException("Book not found", HttpStatus.NOT_FOUND));

    }
}
