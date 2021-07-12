package it.reply.sipp.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import it.reply.sipp.AppError;
import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.api.generic.service.AbstractService;
import it.reply.sipp.model.LevelVO;
import it.reply.sipp.model.repository.LevelRepository;
import it.reply.sipp.service.LevelService;

@Service
public class LevelServiceImpl extends AbstractService implements LevelService {

	
	@Autowired
	private LevelRepository levelRepository;
	
	public LevelServiceImpl() {
	}

	@Override
	public LevelVO read(Long id) throws ApplicationException {
		return levelRepository.findById(id)
		.orElseThrow(() -> makeError(HttpStatus.NOT_FOUND, AppError.GROUP_NOT_FOUND, id));
	}

	
}
