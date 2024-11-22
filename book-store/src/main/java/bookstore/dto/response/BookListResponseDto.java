package bookstore.dto.response;

import bookstore.model.Book;

public record BookListResponseDto (
        Long id,
        String title,
        String author,
        Long categoryId,
        String publisher,
        String description,
        Integer pages,
        Float price,
        Integer quantity,
        Long imageId
){
        public static BookListResponseDto convertToBookListResponse(Book book) {
                System.out.println(book.getPublisher());
                return new BookListResponseDto(
                        book.getId(),
                        book.getTitle(),
                        book.getAuthor(),
                        book.getCategory().getId(),
                        book.getPublisher(),
                        book.getDescription(),
                        book.getPages(),
                        book.getPrice(),
                        book.getQuantity(),
                        book.getImage() == null ? null : book.getImage().getId());
        }

}
