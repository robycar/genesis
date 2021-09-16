package it.reply.genesis.model.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import it.reply.genesis.model.FileSystemScope;
import it.reply.genesis.model.FileSystemVO;

public interface FileSystemRepository extends JpaRepository<FileSystemVO, Long> {

  public List<FileSystemVO> findByScopeAndIdRef(FileSystemScope scope, Long idRef);

  public int deleteAllByScopeAndIdRef(FileSystemScope scope, Long idRef);

  public Optional<FileSystemVO> findByScopeAndIdRefAndPath(FileSystemScope scope, long idRef, String path);
  
}
