package iuh.fit.se.enternalrunebackend.entity;

import iuh.fit.se.enternalrunebackend.entity.enums.CommentStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="comments")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    int cmId;
    @Column(name="comment_content")
    String cmContent;
    @Column(name = "comment_rating")
    int cmRating;
    @Enumerated(EnumType.STRING)
    @Column(name = "comment_status")
    CommentStatus cmStatus;
    @Column(name = "comment_date")
    LocalDate cmDate;
    //relationship
    @ManyToOne
    @JoinColumn(name = "parent_comment_id")
    private Comment comment;
    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> cmReplyComment;
    @ManyToOne
    @JoinColumn(name = "user_id")
    User cmUser;
    @ManyToOne
    @JoinColumn(name = "product_id")
    Product cmProduct;

}
