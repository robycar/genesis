package it.reply.genesis.service;

import java.io.ByteArrayInputStream;
import java.util.List;

import org.springframework.data.util.Pair;
import org.springframework.web.multipart.MultipartFile;

import it.reply.genesis.api.files.payload.FileContentDTO;
import it.reply.genesis.api.files.payload.FileDTO;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.model.FileSystemScope;
import it.reply.genesis.model.FileSystemVO;

public interface FileSystemService {

  List<FileDTO> listFolder(FileSystemScope scope, long idRef) throws ApplicationException;

  List<FileDTO> upload(FileSystemScope scope, long idRef, List<MultipartFile> files) throws ApplicationException;

  FileContentDTO readFile(FileSystemScope scope, long idRef, String pathOrId) throws ApplicationException;

  void deleteFile(FileSystemScope scope, long idRef, String pathOrId) throws ApplicationException;

  /**
   * Copia i file da una entity ad un'altra, sovrascrivendo eventuali file esistenti.
   * @param sourceScope scope della directory da cui copiare i file 
   * @param sourceId identificatore della directory sorgente
   * @param targetScope scope della directory in cui copiare i file
   * @param targetId l'identificatore della directory target
   * @return una liste di coppie con, nell'ordine, il file origine ed il file copiato
   * @throws ApplicationException in caso di errori
   */
  List<Pair<FileSystemVO, FileSystemVO>> copyFilesThroughScope(FileSystemScope sourceScope, long sourceId, FileSystemScope targetScope, long targetId) throws ApplicationException;

  /**
   * Uso interno: Salva un file senza i controlli eseguito da upload
   * @param scope
   * @param idRef
   * @param file
   * @return
   * @throws ApplicationException
   */
  FileSystemVO saveFile(FileSystemScope scope, long idRef, MultipartFile file) throws ApplicationException;

  List<FileSystemVO> listFolderVO(FileSystemScope scope, long idRef) throws ApplicationException;

  void editFile(FileSystemScope scope, long idRef, String pathOrId, ByteArrayInputStream byteArrayInputStream) throws ApplicationException;

  long deleteFolder(FileSystemScope testCaricato, long idref);

  FileSystemVO copyFile(FileSystemScope targetScope, long targetId, FileSystemVO fileVO) throws ApplicationException;

}
