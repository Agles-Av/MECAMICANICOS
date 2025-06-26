package utez.camila.camica.security.token;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import utez.camila.camica.modules.usuarios.Usuario;

import java.util.Collection;
import java.util.Set;

public class UserDetailsImpl implements UserDetails {
    private String email;
    private String password;
    private boolean enabled;
    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(String username, String password, boolean enabled, Collection<? extends GrantedAuthority> authorities) {
        this.email = username;
        this.password = password;
        this.enabled = enabled;
        this.authorities = authorities;
    }

    public static UserDetails build(Usuario user) {
        Set<GrantedAuthority> grantedAuthorities = Set.of(new SimpleGrantedAuthority(user.getRole().getNombre()));
        return new UserDetailsImpl(
                user.getEmail(),
                user.getContrasena(),
                user.getStatus(),
                grantedAuthorities
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

}
