package utez.camila.camica.modules.auth;

import utez.camila.camica.modules.roles.Roles;
import utez.camila.camica.modules.usuarios.Usuario;


public class SignedDto {
    String token;
    String tokenType;
    Usuario user;
    Roles role;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public Usuario getUser() {
        return user;
    }

    public void setUser(Usuario user) {
        this.user = user;
    }

    public Roles getRole() {
        return role;
    }

    public void setRole(Roles role) {
        this.role = role;
    }

    public SignedDto(String token, String tokenType, Usuario user, Roles role) {
        this.token = token;
        this.tokenType = tokenType;
        this.user = user;
        this.role = role;
    }

}
