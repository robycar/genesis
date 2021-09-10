package it.reply.sipp.api.linea.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.reply.sipp.api.generic.controller.AbstractController;
import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.api.generic.payload.PayloadResponse;
import it.reply.sipp.api.linea.payload.LineaGeneratoreAddRequest;
import it.reply.sipp.api.linea.payload.LineaGeneratoreAddResponse;
import it.reply.sipp.api.linea.payload.LineaGeneratoreDTO;
import it.reply.sipp.api.linea.payload.LineaGeneratoreListResponse;
import it.reply.sipp.api.linea.payload.LineaGeneratoreRemoveRequest;
import it.reply.sipp.api.linea.payload.LineaGeneratoreRetrieveResponse;
import it.reply.sipp.api.linea.payload.LineaGeneratoreUpdateRequest;
import it.reply.sipp.api.linea.payload.LineaGeneratoreUpdateResponse;
import it.reply.sipp.service.LineaService;

@RestController
@RequestMapping("/api/lineageneratore")
public class LineaGeneratoreController extends AbstractController {

  @Autowired
  private LineaService lineaService;
  
  
  public LineaGeneratoreController() {
  }

  
  @GetMapping("")
  @PreAuthorize("hasAuthority('FUN_lineagen.view')")
  public ResponseEntity<LineaGeneratoreListResponse> list() {
    logger.info("enter list()");
    LineaGeneratoreListResponse response = new LineaGeneratoreListResponse();
    try {
      List<LineaGeneratoreDTO> result = lineaService.listLineeGeneratore();
      logger.debug("Liste recuperate: {}", result.size());
      response.setList(result);
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }
  
  @GetMapping("{id}")
  @PreAuthorize("hasAuthority('FUN_lineagen.view')")
  public ResponseEntity<LineaGeneratoreRetrieveResponse> retrieve(@PathVariable(required = true, name="id")Long id) {
    logger.info("enter retrieve({})", id);
    LineaGeneratoreRetrieveResponse response = new LineaGeneratoreRetrieveResponse();
    try {
      LineaGeneratoreDTO lineaGeneratoreDTO = lineaService.readLineaGeneratore(id);
      response.setLinea(lineaGeneratoreDTO);
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }

  @PutMapping("")
  @PreAuthorize("hasAuthority('FUN_lineagen.create')")
  public ResponseEntity<LineaGeneratoreAddResponse> add(@Valid @ModelAttribute  LineaGeneratoreAddRequest request) {
    logger.info("enter add({})", request);

    LineaGeneratoreAddResponse response = new LineaGeneratoreAddResponse();

    try {
      LineaGeneratoreDTO lineaDTO = new LineaGeneratoreDTO();
      lineaDTO.setIp(request.getIp());
      lineaDTO.setPorta(request.getPorta());
      lineaDTO.setTypeLinea(request.getTypeLinea());

      lineaDTO = lineaService.createAndPopulateLineaGeneratore(lineaDTO, request.getPathCSV());
      logger.debug("Linea generatore creata: {}", lineaDTO);
      response.setLinea(lineaDTO);

      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }
  
  @PostMapping
  @PreAuthorize("hasAuthority('FUN_lineagen.edit')")
  public ResponseEntity<LineaGeneratoreUpdateResponse> update(@Valid @RequestBody(required=true) LineaGeneratoreUpdateRequest request) {
    logger.info("enter update({})", request);

    LineaGeneratoreUpdateResponse response = new LineaGeneratoreUpdateResponse();

    try {
      LineaGeneratoreDTO lineaDTO = new LineaGeneratoreDTO();
      lineaDTO.setId(request.getId());
      lineaDTO.setIp(request.getIp());
      lineaDTO.setPorta(request.getPorta());
      lineaDTO.setTypeLinea(request.getTypeLinea());
      lineaDTO.setVersion(request.getVersion());

      lineaDTO = lineaService.updateLineaGeneratore(lineaDTO);
      logger.debug("Linea generatore modificata: {}", lineaDTO);

      response.setLinea(lineaDTO);
      return ResponseEntity.ok(response);

    } catch (ApplicationException e) {
      return handleException(e, response);
    }

  }
  
  @DeleteMapping("")
  @PreAuthorize("hasAuthority('FUN_lineagen.delete')")
  public ResponseEntity<PayloadResponse> removeLinea(@Valid @RequestBody(required=true) LineaGeneratoreRemoveRequest request) {
    logger.info("enter removeLinea({})", request);
    
    PayloadResponse response = new PayloadResponse();
    
    try {
      lineaService.removeLineaGeneratore(request.getId());
      
      logger.debug("Linea generatore {} eliminata dal sistema", request.getId());
      return ResponseEntity.ok(response);
      
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }
}
