package it.reply.genesis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.core.task.AsyncTaskExecutor;
import org.springframework.data.jdbc.repository.config.EnableJdbcAuditing;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;
import org.springframework.scheduling.annotation.AsyncConfigurerSupport;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

@SpringBootApplication
@EnableJdbcRepositories(basePackages = "it.reply.genesis.repository")
@EnableJdbcAuditing
@EnableAsync
@ComponentScan({"it.reply.genesis"})
public class SippApplication extends AsyncConfigurerSupport{

	public static final String GENESIS_EXECUTOR_BEAN_NAME = "genesisExecutor";

  public static void main(String[] args) {
		SpringApplication.run(SippApplication.class, args);
	}
	
	@Bean
	public MessageSource messageSource() {
	    ReloadableResourceBundleMessageSource messageSource
	      = new ReloadableResourceBundleMessageSource();
	    
	    messageSource.setBasenames("classpath:messages", "classpath:errors/messages");
	    messageSource.setDefaultEncoding("UTF-8");
	    return messageSource;
	}
	
	@Bean
	public LocalValidatorFactoryBean getValidator() {
	    LocalValidatorFactoryBean bean = new LocalValidatorFactoryBean();
	    bean.setValidationMessageSource(messageSource());
	    return bean;
	}
	
	@Bean
	public ThreadPoolTaskExecutor getTaskExecutor() {
	  ThreadPoolTaskExecutor result = new ThreadPoolTaskExecutor();
	  result.setMaxPoolSize(1);
	  result.setCorePoolSize(1);
	  
    return result ;
	}

	@Bean(name = GENESIS_EXECUTOR_BEAN_NAME)
  @Override
  public AsyncTaskExecutor getAsyncExecutor() {
	  ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
    executor.setCorePoolSize(4);
    executor.setMaxPoolSize(8);
    executor.setQueueCapacity(12);
    executor.setThreadNamePrefix("GenesisExecutor-");
    //executor.setBeanName(GENESIS_EXECUTOR_BEAN_NAME);
    executor.initialize();
    
    return executor;
  }
	
	

}
