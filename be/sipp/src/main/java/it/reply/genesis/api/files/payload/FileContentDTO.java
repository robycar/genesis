package it.reply.genesis.api.files.payload;

import java.io.Closeable;
import java.io.InputStream;
import java.sql.SQLException;

import org.modeshape.common.util.IoUtil;

import it.reply.genesis.api.generic.payload.DTO;
import it.reply.genesis.model.FileSystemVO;

public class FileContentDTO extends DTO implements Closeable {

  private static final long serialVersionUID = 1678682205934868476L;

  private Long id;
  
  private String fileName;
  
  private String contentType;
  
  private long length;
  
  private transient InputStream content;
  
  public FileContentDTO() {
  }

  public FileContentDTO(FileSystemVO vo) throws SQLException {
    this.id = vo.getId();
    this.fileName = vo.getPath();
    this.contentType = vo.getContentType();
    this.length = vo.getContent().length();
    this.content = vo.getContent().getBinaryStream();
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "fileName", fileName);
    writeField(sb, "contentType", contentType);
    writeField(sb, "length", length);
    super.writeFields(sb);
  }

  public String getContentType() {
    return contentType;
  }

  public void setContentType(String contentType) {
    this.contentType = contentType;
  }

  public long getLength() {
    return length;
  }

  public void setLength(long length) {
    this.length = length;
  }

  public InputStream getContent() {
    return content;
  }

  public void setContent(InputStream content) {
    this.content = content;
  }

  public String getFileName() {
    return fileName;
  }

  public void setFileName(String fileName) {
    this.fileName = fileName;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  @Override
  public void close() {
    IoUtil.closeQuietly(content);
  }
  
  
}
