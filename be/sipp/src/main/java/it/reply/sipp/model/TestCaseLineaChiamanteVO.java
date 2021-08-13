package it.reply.sipp.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="TEST_CASE_LINEA_CHIAMANTE")
@IdClass(TestCaseLineaChiamanteKey.class)
public class TestCaseLineaChiamanteVO implements Serializable {

  private static final long serialVersionUID = -9150690614451433064L;

  @ManyToOne
  @JoinColumn(name="TEST_CASE_ID")
  @Id
  private TestCaseVO testCase;
  
  @Column(name="NUM_LINEA")
  @Id
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
  
  public TestCaseLineaChiamanteVO() {
  }

  public TestCaseVO getTestCase() {
    return testCase;
  }

  public void setTestCase(TestCaseVO testCase) {
    this.testCase = testCase;
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
