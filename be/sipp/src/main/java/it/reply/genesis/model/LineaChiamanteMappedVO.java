package it.reply.genesis.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;


@MappedSuperclass
public class LineaChiamanteMappedVO implements Serializable {

  private static final long serialVersionUID = -8391725403248213488L;

  @Id
  @Column(name="NUM_LINEA")
  private Short numLinea;
  
  @ManyToOne
  @JoinColumn(name="ID_LINEA")
  private LineaVO linea;
  
  @ManyToOne
  @JoinColumn(name="ID_OBP")
  private OutboundProxyVO outboundProxy;
  
  @ManyToOne
  @JoinColumn(name="FILE_SYSTEM_ID")
  private FileSystemVO file;

  public LineaChiamanteMappedVO() {
  }

  public Short getNumLinea() {
    return numLinea;
  }

  public void setNumLinea(Short numLinea) {
    this.numLinea = numLinea;
  }

  public LineaVO getLinea() {
    return linea;
  }

  public void setLinea(LineaVO linea) {
    this.linea = linea;
  }

  public OutboundProxyVO getOutboundProxy() {
    return outboundProxy;
  }

  public void setOutboundProxy(OutboundProxyVO outboundProxy) {
    this.outboundProxy = outboundProxy;
  }

  public FileSystemVO getFile() {
    return file;
  }

  public void setFile(FileSystemVO file) {
    this.file = file;
  }

}
