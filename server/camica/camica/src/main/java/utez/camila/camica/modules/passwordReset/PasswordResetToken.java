package utez.camila.camica.modules.passwordReset;
import jakarta.persistence.*;
import utez.camila.camica.modules.usuarios.Usuario;

import java.time.LocalDateTime;

@Entity
public class PasswordResetToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    private LocalDateTime expirationDate;

    @ManyToOne
    private Usuario user;

    public PasswordResetToken() {}

    public PasswordResetToken(String token, LocalDateTime expirationDate, Usuario user) {
        this.token = token;
        this.expirationDate = expirationDate;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDateTime expirationDate) {
        this.expirationDate = expirationDate;
    }

    public Usuario getUser() {
        return user;
    }

    public void setUser(Usuario user) {
        this.user = user;
    }
}