package it.reply.genesis.api.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HelloWorldController {

	private static final Logger logger = LoggerFactory.getLogger(HelloWorldController.class);

	@GetMapping("hello")
	public ResponseEntity<?> hello(@RequestParam("name") String name) {
		logger.info("hello({})", name);
		return ResponseEntity.ok("Hello " + name);
	}
	
}
