package it.reply.sipp.api.generic.payload;

import java.io.Serializable;

public class DTO implements Serializable {

	private static final long serialVersionUID = 8825077711024942113L;

	public DTO() {
	}

	protected void writeFields(StringBuilder sb) {
		//Remove trailing ", " string
		int length = sb.length();
		if (length >= 2 && sb.indexOf(", ", length - 2) >= 0) {
			sb.delete(length - 2, length);
		}
	}
	
	/**
	 * Write to sb the value of fieldName using the format fieldName=fieldValue.toString().
	 * If fieldValue is null nothing in written
	 * @param sb
	 * @param fieldName
	 * @param fieldValue
	 * @return sb
	 */
	protected StringBuilder writeField(StringBuilder sb, String fieldName, Object fieldValue) {
		if (fieldValue != null) {
			sb.append(fieldName).append("=").append(fieldValue).append(", ");
		}
		return sb;
	}
	
	@Override
	public String toString() {
		StringBuilder result = new StringBuilder();
		result.append(getClass().getSimpleName())
			.append('[');
		writeFields(result);
		result.append(']');
		
		return result.toString();
	}
}
