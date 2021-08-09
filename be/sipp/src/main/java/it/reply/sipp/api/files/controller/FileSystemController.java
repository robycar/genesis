package it.reply.sipp.api.files.controller;

import it.reply.sipp.api.generic.controller.AbstractController;
import it.reply.sipp.model.FileSystemVO;

public class FileSystemController extends AbstractController {

  public static final String FS_API_PATH = "/api/fs";
  

  public FileSystemController() {
  }

  public static String urlForVO(FileSystemVO vo) {
    return FS_API_PATH 
      + "/" + vo.getScope() 
      + "/" + vo.getIdRef()
      + "/" + vo.getId();
  }
  
}
