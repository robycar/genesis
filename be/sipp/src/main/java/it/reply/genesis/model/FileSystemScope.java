package it.reply.genesis.model;

public enum FileSystemScope {
  
  TEMPLATE("template"),
  TEST("test"),
  TEST_CARICATO("test"),
  LINEA_GENERATORE("lineagen"),
  TESTGEN_CARICATO("testgen"),
  ;
  
  private final String mappedFunctionDomain;
  
  private FileSystemScope(String mappedFunctionDomain) {
    this.mappedFunctionDomain = mappedFunctionDomain;
  }

  public String getMappedFunctionDomain() {
    return mappedFunctionDomain;
  }
}
