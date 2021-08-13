package it.reply.sipp.api.test.payload;

import it.reply.sipp.api.files.payload.FileDTO;
import it.reply.sipp.api.generic.payload.DTO;
import it.reply.sipp.api.linea.payload.LineaDTO;
import it.reply.sipp.api.linea.payload.OutboundProxyDTO;
import it.reply.sipp.model.TestCaseLineaChiamanteVO;

public class TestCaseLineaDTO extends DTO {

  private static final long serialVersionUID = -6645444779723815213L;

  private LineaDTO linea;
  
  private OutboundProxyDTO proxy;
  
  private FileDTO file;
  
  public TestCaseLineaDTO() {
  }
  
  public TestCaseLineaDTO(TestCaseLineaChiamanteVO vo) {
    if (vo.getLinea() != null) {
      this.linea = new LineaDTO(vo.getLinea());
    }
    if (vo.getOutboundProxy() != null) {
      this.proxy = new OutboundProxyDTO(vo.getOutboundProxy());
    }
    if (vo.getFile() != null) {
      this.file = new FileDTO(vo.getFile());
    }
  }

  public LineaDTO getLinea() {
    return linea;
  }

  public void setLinea(LineaDTO linea) {
    this.linea = linea;
  }

  public OutboundProxyDTO getProxy() {
    return proxy;
  }

  public void setProxy(OutboundProxyDTO proxy) {
    this.proxy = proxy;
  }

  public FileDTO getFile() {
    return file;
  }

  public void setFile(FileDTO file) {
    this.file = file;
  }

}
