package it.reply.sipp.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import it.reply.sipp.api.files.payload.FileContentDTO;
import it.reply.sipp.api.files.payload.FileDTO;
import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.model.FileSystemScope;

public interface FileSystemService {

  List<FileDTO> listFolder(FileSystemScope scope, long idRef) throws ApplicationException;

  List<FileDTO> upload(FileSystemScope scope, long idRef, List<MultipartFile> files) throws ApplicationException;

  FileContentDTO readFile(FileSystemScope scope, long idRef, String pathOrId) throws ApplicationException;

  void deleteFile(FileSystemScope scope, long idRef, String pathOrId) throws ApplicationException;

}
