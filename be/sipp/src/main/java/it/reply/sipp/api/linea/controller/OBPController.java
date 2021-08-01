package it.reply.sipp.api.linea.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.reply.sipp.api.generic.controller.AbstractController;
import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.api.generic.payload.PayloadResponse;
import it.reply.sipp.api.linea.payload.OBPAddRequest;
import it.reply.sipp.api.linea.payload.OBPAddResponse;
import it.reply.sipp.api.linea.payload.OBPListRequest;
import it.reply.sipp.api.linea.payload.OBPListResponse;
import it.reply.sipp.api.linea.payload.OBPRemoveRequest;
import it.reply.sipp.api.linea.payload.OBPRetrieveResponse;
import it.reply.sipp.api.linea.payload.OBPUpdateRequest;
import it.reply.sipp.api.linea.payload.OBPUpdateResponse;
import it.reply.sipp.api.linea.payload.OutboundProxyDTO;
import it.reply.sipp.service.OBPService;

@RestController
@RequestMapping("/api/obp")
//TODO: Configurare i permessi
public class OBPController extends AbstractController {

  @Autowired
  private OBPService oBPService;

  @GetMapping("")
  public ResponseEntity<OBPListResponse> list(@RequestBody(required = false) OBPListRequest request) {
    logger.info("enter list({})", request);
    OutboundProxyDTO criteria = null;
    if (request != null) {
      criteria = request.getProxy();
    }
    
    
    OBPListResponse response = new OBPListResponse();
        
    try {
      List<OutboundProxyDTO> result = oBPService.find(criteria);
      logger.debug("Recuperati {} outboundproxy", result.size());
      response.setList(result);
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }
  
  @PutMapping("")
  public ResponseEntity<OBPAddResponse> add(@Valid @RequestBody(required = true)OBPAddRequest request) {
    logger.info("enter add({})", request);
    
    OBPAddResponse response = new OBPAddResponse();
    
    try {
      OutboundProxyDTO dto = new OutboundProxyDTO();
      dto.setDescrizione(request.getDescrizione());
      dto.setIpDestinazione(request.getIpDestinazione());
      dto.setPorta(request.getPorta());
      dto.setTypeLinee(request.getTypeLinee());
      
      dto = oBPService.createProxy(dto);
      
      response.setProxy(dto);
      return ResponseEntity.status(HttpStatus.CREATED).body(response);
      
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
    
  }
  
  @PostMapping("")
  public ResponseEntity<OBPUpdateResponse> update(@Valid @RequestBody(required=true) OBPUpdateRequest request) {
    logger.info("enter update({})", request);
    
    OBPUpdateResponse response = new OBPUpdateResponse();
    
    try {
      OutboundProxyDTO proxyDTO = new OutboundProxyDTO();
      proxyDTO.setId(request.getId());
      proxyDTO.setDescrizione(request.getDescrizione());
      proxyDTO.setIpDestinazione(request.getIpDestinazione());
      proxyDTO.setPorta(request.getPorta());
      proxyDTO.setTypeLinee(request.getTypeLinee());
      
      proxyDTO = oBPService.updateProxy(proxyDTO);
      logger.debug("Modificato il proxy {}", proxyDTO);
      response.setProxy(proxyDTO);
      
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
    
  }
  
  @GetMapping("{id}")
  public ResponseEntity<OBPRetrieveResponse> retrieveProxy(@PathVariable Long id) {
    logger.info("enter retrieveProxy({})", id);
    
    OBPRetrieveResponse response = new OBPRetrieveResponse();
    try {
      OutboundProxyDTO result = oBPService.readProxy(id);
      response.setProxy(result);
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }
  
  @DeleteMapping("")
  public ResponseEntity<PayloadResponse> remove(@Valid @RequestBody(required=true) OBPRemoveRequest request) {
    logger.info("enter remove({})", request);
    
    PayloadResponse response = new PayloadResponse();
    try {
      oBPService.removProxy(request.getId());
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }
}
