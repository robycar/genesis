package it.reply.sipp.model;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name="ROLE")
public class RoleVO implements Serializable, Comparable<RoleVO> {

	private static final long serialVersionUID = -404594990186615686L;
	
	@Id
	private String name;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
		name = "ROLE_OPERATION",
		joinColumns = @JoinColumn(name="ROLE_NAME"),
		inverseJoinColumns = @JoinColumn(name="OPERATION_CODE"))
	private Set<FunctionVO> functions;
	
	public RoleVO() {
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<FunctionVO> getFunctions() {
		return functions;
	}

	public void setFunctions(Set<FunctionVO> functions) {
		this.functions = functions;
	}

	@Override
	public int compareTo(RoleVO o) {
		String oname = o == null ? null : o.getName();
		
		if (this.name == oname) {
			return 0;
		}
		
		if (this.name == null) {
			return -1;
		}
		
		if (oname == null) {
			return 1;
		}
		
		return this.name.compareTo(oname);
	}
}
