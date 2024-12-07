let objJuego;
let imagen; // intro
let escenario = []; // fondos
let escenaActual = "menu"; // Estado inicial: "menu"

function preload() {
  imagen = loadImage("data/intro.gif"); // Carga la imagen de la intro
}

function setup() {
  objJuego = new Juego();
  createCanvas(640, 480);
  textAlign(CENTER, CENTER);
  ambiente = document.getElementById("ambiente");
  for (let j = 0; j < 3; j++) {
    let nombreimagen = "fondo" + j + ".gif";
    escenario[j] = loadImage("data/" + nombreimagen);
  }
}

function intro() { // "menu"
  image(imagen, 0, 0);
  rectMode(CENTER);
  fill(0);
  rect(320, 50, 400, 50);
  fill(255);
  text("LA PELEA CONTRA FREEZER", 320, 50);
  fill(50, 99, 99);
  rect(120, 320, 150, 50);
  fill(255);
  textSize(28);
  text("PELEAR", 120, 320);
  fill(9, 139, 0);
  rect(85, 375, 78, 40);
  fill(0);
  text("play", 85, 375);
  fill(139, 0, 0);
  rect(85, 430, 78, 40);
  fill(0);
  text("stop", 85, 430);
}

function game() { // Pantalla in-game
  image(escenario[1], 0, 0);
  objJuego.ejecutar();
  fill(0);
  rect(320, 430, 300, 50);
  fill(255);
  text("DERROTA A FREEZER", 320, 430);

}

function perdiste() {
  image(escenario[3], 0, 0);
  fill(255);
  text("FREEZER TE HA VENCIDO", 320, 50);
}

function ganaste() {
  image(escenario[2], 0, 0);
  fill(255);
  text("HAS VENCIDO A FREEZER", 320, 50);
}

function draw() {
  background(0);

  // Lógica para cambiar entre escenas
  switch (escenaActual) {
    case "menu":
      intro();
      break;
    case "inGame":
      game();
      break;
    case "ganaste":
      ganaste();
      break;
    case "perdiste":
      perdiste();
      break;
  }
}

function mousePressed() {
  if (escenaActual === "menu") {
    if (mouseX > 120 - 75 && mouseX < 120 + 75 && mouseY > 320 - 25 && mouseY < 320 + 25) {
      escenaActual = "inGame"; // Cambiar a pantalla in-game
      objJuego.iniciar(); // Reinicia el juego al iniciar
    }
    if (mouseX > 85 - 39 && mouseX < 85 + 39 && mouseY > 375 - 20 && mouseY < 375 + 20) {
      ambiente.currentTime = 0;
      ambiente.play();
    } else if (mouseX > 85 - 39 && mouseX < 85 + 39 && mouseY > 430 - 20 && mouseY < 430 + 20) {
      ambiente.pause();
    }
  } else if (escenaActual === "inGame") {
    objJuego.manejarClick(mouseX, mouseY);
  }
}
