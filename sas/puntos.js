class Puntos {
  constructor(meta) {
    this.puntos = 0; 
    this.meta = meta; 
  }


  incrementar() {
    this.puntos++;
  }


  completado() {
    return this.puntos >= this.meta;
  }


  reiniciar() {
    this.puntos = 0;
  }
}
