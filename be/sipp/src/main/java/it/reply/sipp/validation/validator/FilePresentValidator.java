package it.reply.sipp.validation.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.web.multipart.MultipartFile;

import it.reply.sipp.validation.constraints.FilePresent;

public class FilePresentValidator implements ConstraintValidator<FilePresent, MultipartFile> {

  public FilePresentValidator() {
  }

  @Override
  public boolean isValid(MultipartFile value, ConstraintValidatorContext context) {
    if (value == null) {
      return true;
    }
    String originalFileName = value.getOriginalFilename(); 
    if (originalFileName == null || originalFileName.length() == 0) {
      return false;
    }
    return true;
  }

}
