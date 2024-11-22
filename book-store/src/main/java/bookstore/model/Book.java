package bookstore.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Book extends BaseEntity{

    private String title;
    private String author;
    private Integer pages;
    private String description;
    private String publisher;
    private Float price;
    private Integer quantity;


    @OneToOne
    @JoinTable(name = "book_image",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "image_id"))
    private Image image;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Override
    public String toString() {
        return "Book{" +
                "title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", pages=" + pages +
                ", description='" + description + '\'' +
                ", publisher='" + publisher + '\'' +
                ", price='" + price + '\'' +
                ", quantity='" + quantity + '\'' +
                ", image=" + (image != null ? image.getId() : "null") +
                ", category=" + (category != null ? category.getName() : "null") +
                '}';
    }
}
