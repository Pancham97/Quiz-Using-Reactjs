package com.cybage.onlineassessmentsystem.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Ignore;
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

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = OnlineAssessmentSystemApplication.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class TestControllerTest {

	private MockMvc mockMvc;

	@Autowired
	private WebApplicationContext wac;
	
	@Before
	public void setUp() throws Exception {//NOSONAR
		this.mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
	}
	@Ignore
	@Test
	public void verifyDeleteTest() throws Exception {//NOSONAR
		mockMvc.perform(MockMvcRequestBuilders.delete("/api/test/delete/8").accept(MediaType.APPLICATION_JSON))
		.andDo(print());
	}

	@Test
	public void verifyUpdateTest() throws Exception{//NOSONAR
		mockMvc.perform(MockMvcRequestBuilders.put("/api/test/update/2")
		        .contentType(MediaType.APPLICATION_JSON_UTF8)
		        .content("{ \"id\": \"2\", \"name\" : \".NET Developer Assessment\" ,\"subcatname\" : \".NET\"}")
		        .accept(MediaType.APPLICATION_JSON))
				.andDo(print());
	}
	//.NET Developer Assessment
	
	@Test
	public void verifyCreateTest() throws Exception{//NOSONAR
		mockMvc.perform(MockMvcRequestBuilders.post("/api/test/create")
				.accept(MediaType.APPLICATION_JSON)
				.contentType("{ \"id\": \"1\",\"name\" : \"HighLevel\",\"subcatname\" : \"mongodb\"}")
				.accept(MediaType.APPLICATION_JSON))
				.andDo(print());

	}
}
