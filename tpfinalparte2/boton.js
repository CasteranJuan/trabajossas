class Boton {
  constructor(x, y, tam, color) {
    this.x = x; 
    this.y = y; 
    this.tam = tam; 
    this.color = color; 
  }


  dibujar() {
    fill(this.color);
    ellipse(this.x, this.y, this.tam, this.tam);
  }


  fueClickeado(mx, my) {
    let d = dist(mx, my, this.x, this.y);
    return d < this.tam / 2;
  }
}
