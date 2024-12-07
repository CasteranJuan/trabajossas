class Juego {
  constructor() {
    this.botones = []; // Lista de botones
    this.totalBotones = 28; // Total de botones
    this.botonesCreados = 0;
    this.tiempoAparicionTotal = 28000; // tiempo en el que los botones aparecen
    this.tiempoAparicion = this.tiempoAparicionTotal / this.totalBotones;
    this.estado = "jugando"; // Estados "jugando", "ganaste", "perdiste"
    this.tiempo = new Tiempo(30000); // 30 segundos
    this.puntos = new Puntos(this.totalBotones); // Puntaje 
  }

  // Inicializar el juego
  iniciar() {
    this.botones = [];
    this.botonesCreados = 0;
    this.tiempo.reiniciar();
    this.puntos.reiniciar();
    this.estado = "jugando";
  }

  // Ejecutar la lógica principal
  ejecutar() {
    if (this.estado === "jugando") {
      this.dibujar();
      this.crearBotones();
      this.verificarEstado();
    }
  }

  // Dibujar los elementos del juego
  dibujar() {
    // Dibujar los botones
    for (let boton of this.botones) {
      boton.dibujar();
    }

    // Mostrar tiempo restante y puntos
    let tiempoRestante = ceil(this.tiempo.restante() / 1000);
    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(`Tiempo restante: ${tiempoRestante}s`, width / 2, 20);
    text(`Puntos: ${this.puntos.puntos} / ${this.puntos.meta}`, width / 2, 50);
  }

  // Crear botones según el tiempo
  crearBotones() {
    if (this.botonesCreados < this.totalBotones && this.tiempo.restante() > this.tiempo.duracion - this.tiempoAparicionTotal) {
      if (this.tiempo.duracion - this.tiempo.restante() >= this.botonesCreados * this.tiempoAparicion) {
        let nuevoBoton = new Boton(
          random(50, width - 50),
          random(50, height - 50),
          50,
          color(random(255), random(255), random(255))
        );
        this.botones.push(nuevoBoton);
        this.botonesCreados++;
      }
    }
  }

  // Verificar el estado del juego
  verificarEstado() {
    if (this.puntos.completado()) {
      this.estado = "ganaste";
      escenaActual = "ganaste"; // Cambiar a la escena de victoria
    } else if (this.tiempo.finalizado()) {
      this.estado = "perdiste";
      escenaActual = "perdiste"; // Cambiar a la escena de derrota
    }
  }

  // Manejar clics en los botones
  manejarClick(mx, my) {
    for (let i = this.botones.length - 1; i >= 0; i--) {
      if (this.botones[i].fueClickeado(mx, my)) {
        this.botones.splice(i, 1); // Eliminar botón
        this.puntos.incrementar();
        break;
      }
    }
  }
}
