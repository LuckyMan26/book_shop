package bookstore.dto.response;

import bookstore.model.Book;

public record BookResponseDto (
        Long id,
        String title,
        String author,
        Integer pages,
        String description,
        String publisher,

        Float price,
        Integer quantity,

        Long categoryId,
        Long imageId
){
    public static BookResponseDto convertToBookResponse(Book book) {

        System.out.println(book.getImage() == null ? null : book.getImage().getId());
        BookResponseDto t =  new BookResponseDto(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getPages(),
                book.getDescription(),
                book.getPublisher(),
                book.getPrice(),
                book.getQuantity(),
                book.getCategory().getId(),
                book.getImage() == null ? null : book.getImage().getId());
        System.out.println("converted");
        return  t;
    }


}
