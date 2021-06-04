package it.reply.sipp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jdbc.repository.config.EnableJdbcAuditing;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;

@SpringBootApplication
@EnableJdbcRepositories(basePackages = "it.reply.sipp.repository")
@EnableJdbcAuditing
@ComponentScan({"it.reply.sipp"})
public class SippApplication {

	public static void main(String[] args) {
		SpringApplication.run(SippApplication.class, args);
	}

}
