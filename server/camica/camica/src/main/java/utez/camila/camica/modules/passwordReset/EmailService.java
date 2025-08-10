package utez.camila.camica.modules.passwordReset;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;

    public void sendResetPasswordEmail(String to, String token) throws MessagingException {
        // Enlace de restablecimiento
        String link = "http://localhost:5173/reset-password?token=" + token;

        // Contexto de Thymeleaf
        Context context = new Context();
        context.setVariable("link", link);

        // Procesar la plantilla reset_password.html
        String htmlBody = templateEngine.process("reset_password", context);

        // Preparar y enviar el correo
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setTo(to);
        helper.setSubject("🔒 Recuperación de contraseña - MECAMICANICOS");
        helper.setText(htmlBody, true);  // true = HTML

        mailSender.send(message);
    }
}