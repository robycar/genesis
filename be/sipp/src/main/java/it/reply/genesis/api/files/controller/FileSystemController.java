package it.reply.genesis.api.files.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.InvalidMediaTypeException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import it.reply.genesis.AppError;
import it.reply.genesis.api.files.payload.FileContentDTO;
import it.reply.genesis.api.files.payload.FileDTO;
import it.reply.genesis.api.files.payload.FileSystemListFilesResponse;
import it.reply.genesis.api.files.payload.FileSystemUploadResponse;
import it.reply.genesis.api.generic.controller.AbstractController;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.generic.payload.PayloadResponse;
import it.reply.genesis.model.FileSystemScope;
import it.reply.genesis.model.FileSystemVO;
import it.reply.genesis.service.FileSystemService;

@RestController
@RequestMapping(FileSystemController.FS_API_PATH)
public class FileSystemController extends AbstractController {

  public static final String FS_API_PATH = "/api/fs";

  @Autowired
  private FileSystemService fileSystemService;

  public FileSystemController() {
  }

  public static String urlForVO(FileSystemVO vo) {
    return FS_API_PATH + "/" + vo.getScope() + "/" + vo.getIdRef() + "/" + vo.getId();
  }

  @GetMapping("entityfolder/{scope}/{idRef}")
  public ResponseEntity<FileSystemListFilesResponse> listFiles(
      @PathVariable(required = true, name = "scope") FileSystemScope scope,
      @PathVariable(required = true, name = "idRef") long idRef) {
    logger.info("Enter listFiles({},{}), scope, idRef)");
    FileSystemListFilesResponse response = new FileSystemListFilesResponse();

    String functionToCheck = "FUN_" + scope.name().toLowerCase() + ".view";
    if (!hasAuthority(functionToCheck)) {
      logger.error("Utente {} non autorizzato ad accedere alla risorsa {}/folder/{}/{}", currentUsername(), FS_API_PATH,
          scope, idRef);
      return writeError(response, HttpStatus.FORBIDDEN, AppError.HTTP_FORBIDDEN);
    }

    try {
      List<FileDTO> folderDTO = fileSystemService.listFolder(scope, idRef);
      logger.debug("Recuperati {} file", folderDTO.size());
      response.setList(folderDTO);

      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }

  }

  @PostMapping("entityfolder/{scope}/{idRef}")
  public ResponseEntity<FileSystemUploadResponse> upload(
      @PathVariable(required = true, name = "scope") FileSystemScope scope,
      @PathVariable(required = true, name = "idRef") long idRef, 
      @RequestParam("file") List<MultipartFile> files) {
    logger.info("Enter upload({},{},{})", scope, idRef, files);

    FileSystemUploadResponse response = new FileSystemUploadResponse();
    
    String functionToCheck = "FUN_" + scope.name().toLowerCase() + ".edit";
    if (!hasAuthority(functionToCheck)) {
      logger.error("Utente {} non autorizzato ad accedere alla risorsa {}/entityfolder/{}/{}", currentUsername(), FS_API_PATH,
          scope, idRef);
      return writeError(response, HttpStatus.FORBIDDEN, AppError.HTTP_FORBIDDEN);
    }
    
    try {
      List<FileDTO> uploadedFiles = fileSystemService.upload(scope, idRef, files);
      logger.debug("Uploaded files: {}", uploadedFiles);
      response.setList(uploadedFiles);
      
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }
  
  @GetMapping("entityfolder/{scope}/{idRef}/{id}")
  @Transactional(readOnly = true)
  public ResponseEntity<? extends Resource> download(
      @PathVariable(required = true, name = "scope") FileSystemScope scope,
      @PathVariable(required = true, name = "idRef") long idRef,
      @PathVariable(required = true, name = "id") String pathOrId) 
  {
    logger.info("Enter download({},{},{})", scope, idRef, pathOrId);

    String functionToCheck = "FUN_" + scope.name().toLowerCase() + ".view";
    if (!hasAuthority(functionToCheck)) {
      logger.error("Utente {} non autorizzato ad accedere alla risorsa {}/folder/{}/{}", currentUsername(), FS_API_PATH,
          scope, idRef);
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    
    
    try (FileContentDTO fileContent = fileSystemService.readFile(scope, idRef, pathOrId)) {
      BodyBuilder response = ResponseEntity.ok();
      if (fileContent.getLength() > 0) {
        response.contentLength(fileContent.getLength());
      }
      
      try {
        response.contentType(MediaType.parseMediaType(fileContent.getContentType()));
      } catch (InvalidMediaTypeException imte) {
        logger.warn("Unhandled mediaType stored for file {}: {}", fileContent.getId(), fileContent.getContentType());
      }
      
      return response
          .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileContent.getFileName() + "\"")
          .body(new InputStreamResource(fileContent.getContent(), fileContent.getFileName()));
          
    } catch (ApplicationException e) {
      handleException(e);
      return null;
    } 
  }

  @DeleteMapping("entityfolder/{scope}/{idRef}/{id}")
  public ResponseEntity<PayloadResponse> delete(
      @PathVariable(required = true, name = "scope") FileSystemScope scope,
      @PathVariable(required = true, name = "idRef") long idRef,
      @PathVariable(required = true, name = "id") String pathOrId) 
  {
    logger.info("enter delete");
    
    PayloadResponse response = new PayloadResponse();
    
    String functionToCheck = "FUN_" + scope.name().toLowerCase() + ".edit";
    if (!hasAuthority(functionToCheck)) {
      logger.error("Utente {} non autorizzato ad accedere alla risorsa {}/entityfolder/{}/{}", currentUsername(), FS_API_PATH,
          scope, idRef);
      return writeError(response, HttpStatus.FORBIDDEN, AppError.HTTP_FORBIDDEN);
    }
    
    try {
      fileSystemService.deleteFile(scope, idRef, pathOrId);
      logger.debug("File eliminato");
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }

  }
  
}
