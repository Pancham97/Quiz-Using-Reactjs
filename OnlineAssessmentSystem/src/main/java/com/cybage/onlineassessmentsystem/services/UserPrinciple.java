package com.cybage.onlineassessmentsystem.services;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.cybage.onlineassessmentsystem.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;

//This class is used to contain other information about users which also have field of Authorities which will contain which authority it has
@AllArgsConstructor
public class UserPrinciple implements UserDetails {
	private static final long serialVersionUID = 1L;
	@Getter
	private Long id;
	@Getter
	private String name;
	private String username;
	@Getter
	private String email;
	@JsonIgnore
	private String password;
	private Collection<? extends GrantedAuthority> authorities;

	public static UserPrinciple build(User user) {
		List<GrantedAuthority> authorities = user.getRole().stream()
				.map(role -> new SimpleGrantedAuthority(role.getName().name())).collect(Collectors.toList());
		return new UserPrinciple(user.getId(), user.getName(), user.getUsername(), user.getEmail(), user.getPassword(),
				authorities);
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
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
