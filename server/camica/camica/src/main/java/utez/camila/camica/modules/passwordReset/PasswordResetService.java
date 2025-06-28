package utez.camila.camica.modules.passwordReset;

import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import utez.camila.camica.modules.usuarios.Usuario;
import utez.camila.camica.modules.usuarios.UsuarioRepository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordResetService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder encoder;

    public void requestReset(String email) throws MessagingException {
        Usuario userOpt = usuarioRepository.findByEmail(email);
        if (userOpt==null) return;

        Usuario user = userOpt;
        String token = UUID.randomUUID().toString();
        LocalDateTime expiration = LocalDateTime.now().plusMinutes(30);

        PasswordResetToken resetToken = new PasswordResetToken(token, expiration, user);
        tokenRepository.save(resetToken);

        emailService.sendResetPasswordEmail(email, token);
    }

    public boolean resetPassword(String token, String newPassword) {
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);
        if (tokenOpt.isEmpty()) return false;

        PasswordResetToken resetToken = tokenOpt.get();
        if (resetToken.getExpirationDate().isBefore(LocalDateTime.now())) {
            tokenRepository.delete(resetToken);
            return false;
        }

        Usuario user = resetToken.getUser();
        user.setContrasena(encoder.encode(newPassword));
        usuarioRepository.save(user);
        tokenRepository.delete(resetToken);

        return true;
    }
}
