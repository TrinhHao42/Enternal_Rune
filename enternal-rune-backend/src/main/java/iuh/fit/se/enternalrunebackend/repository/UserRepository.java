package iuh.fit.se.enternalrunebackend.repository;



import iuh.fit.se.enternalrunebackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path="users")
public interface UserRepository extends JpaRepository<User,Long> {
    public User findByEmail(String email);
}
