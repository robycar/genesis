package it.reply.sipp.api.generic.payload;

import java.util.Objects;

public class PayloadResponse extends DTO {

	private static final long serialVersionUID = -806305394756060567L;

	private ErrorInfo error;
	
	public PayloadResponse() {
	}
	
	public ErrorInfo getError() {
		return error;
	}

	public void setError(ErrorInfo error) {
		this.error = error;
	}

	@Override
	public String toString() {
		StringBuilder result = new StringBuilder();
		result.append(getClass().getName())
			.append('[');
		writeFields(result);
		result.append(']');
		
		return result.toString();
	}

	@Override
	protected void writeFields(StringBuilder sb) {

		writeField(sb, "error", error);
		super.writeFields(sb);

	}
	
}
