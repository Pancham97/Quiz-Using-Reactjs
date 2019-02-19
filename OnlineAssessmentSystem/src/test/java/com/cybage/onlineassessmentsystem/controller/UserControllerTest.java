package com.cybage.onlineassessmentsystem.controller;

import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.cybage.onlineassessmentsystem.OnlineAssessmentSystemApplication;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = OnlineAssessmentSystemApplication.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class UserControllerTest {

	private MockMvc mockMvc;

	@Autowired
	private WebApplicationContext wac;

	@Before
	public void setup() {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();

	}
	@Test
	public void verifyGetAllUsers() throws Exception {//NOSONAR
		mockMvc.perform(MockMvcRequestBuilders.get("/api/user/all")
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$", hasSize(4)))
				.andDo(print());
	}
	@Test
	public void verifyGetParticularUser() throws Exception {//NOSONAR
		mockMvc.perform(MockMvcRequestBuilders.get("/api/user/6")
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.id").exists())
				.andExpect(jsonPath("$.name").exists())
				.andExpect(jsonPath("$.id").value(6))
				.andExpect(jsonPath("$.name").value("Parv"))
				.andExpect(jsonPath("$.username").value("parvk"))
				.andDo(print());
	}
	@Test
	public void verifyUpdateUser() throws Exception {//NOSONAR
		mockMvc.perform(MockMvcRequestBuilders.put("/api/user/update/1")
        .contentType(MediaType.APPLICATION_JSON)
        .content("{ \"id\": \"1\", \"name\" : \"jackadam\", \"username\" : \"jackas\" }")
        .accept(MediaType.APPLICATION_JSON))
		.andDo(print());
	}
	@Test
	public void verifyDeleteUser() throws Exception {//NOSONAR
		mockMvc.perform(MockMvcRequestBuilders.delete("/api/user/delete/9").accept(MediaType.APPLICATION_JSON))
		.andDo(print());
	}
}
