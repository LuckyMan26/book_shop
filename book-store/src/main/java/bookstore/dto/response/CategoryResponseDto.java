package bookstore.dto.response;

import bookstore.model.Category;

import java.util.List;

public record CategoryResponseDto(
        Long id,
        String name


) {
    public static CategoryResponseDto convertToCategoryResponse(Category category) {
        System.out.println("convertToCategoryResponse");
        System.out.println("get books: ");

        return new CategoryResponseDto(
                category.getId(),
                category.getName());
    }
}
