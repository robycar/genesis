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

import it.reply.genesis.validation.validator.FilePresentValidator;

@Documented
@Constraint(validatedBy = FilePresentValidator.class)
@Retention(RUNTIME)
@Target({ FIELD, METHOD, PARAMETER })
public @interface FilePresent {
  String message() default "Input file is required";
  Class<?>[] groups() default {};
  Class<? extends Payload>[] payload() default {};

}
