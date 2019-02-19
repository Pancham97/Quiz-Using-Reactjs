package com.cybage.onlineassessmentsystem.message.response;

import java.util.Set;

import com.cybage.onlineassessmentsystem.model.Role;

//Response to be given on Successful Login

public class JwtResponse {

	private String token;
	private String type = "Bearer";
	private Set<Role> role;
	private String name;
	private long id;

	public JwtResponse(String accessToken, Set<Role> role , String name, long id) {
		this.token = accessToken;
		this.role = role;
		this.name = name;
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAccessToken() {
		return token;
	}

	public void setAccessToken(String accessToken) {
		this.token = accessToken;
	}

	public String getTokenType() {
		return type;
	}

	public void setTokenType(String tokenType) {
		this.type = tokenType;
	}

	public Set<Role> getRole() {
		return role;
	}

	public void setRole(Set<Role> role) {
		this.role = role;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

}
