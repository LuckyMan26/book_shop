package bookstore.dto.request;

import jakarta.annotation.Nonnull;

public record SaveBookRequest(
        @Nonnull
        String title,
        String author,
        Integer pages,
        String description,
        String publisher,
        Float price,
        Integer quantity,
        Long categoryId
) {
}
