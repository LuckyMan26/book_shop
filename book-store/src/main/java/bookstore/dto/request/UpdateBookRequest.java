package bookstore.dto.request;

public record UpdateBookRequest (
        Long id,
        String title,
        String author,
        Integer pages,
        String description,
        Float price,
        Integer quantity,
        String publisher,
        Long categoryId
){
}
