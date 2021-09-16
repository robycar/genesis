package it.reply.genesis.validation.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.apache.commons.validator.routines.InetAddressValidator;

import it.reply.genesis.validation.constraints.IPv4;

public class IPv4Validator implements ConstraintValidator<IPv4, String> {

  public IPv4Validator() {
  }

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    if (value == null || value.length() == 0) {
      return true;
    }
    return InetAddressValidator.getInstance().isValidInet4Address(value);
  }

}
