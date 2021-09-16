package it.reply.genesis.validation.constraints;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

import it.reply.genesis.validation.validator.IPv4Validator;

@Documented
@Constraint(validatedBy = { IPv4Validator.class })
@Retention(RUNTIME)
@Target({ FIELD, METHOD, PARAMETER })
public @interface IPv4 {
  String message() default "Invalid ipv4 address";
  Class<?>[] groups() default {};
  Class<? extends Payload>[] payload() default {};
}
