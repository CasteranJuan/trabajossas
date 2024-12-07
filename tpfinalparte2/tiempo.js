class Tiempo {
  constructor(duracion) {
    this.inicio = millis(); 
    this.duracion = duracion; 
  }


  restante() {
    return max(0, this.duracion - (millis() - this.inicio));
  }

  
  finalizado() {
    return this.restante() === 0;
  }

  
  reiniciar() {
    this.inicio = millis();
  }
}
