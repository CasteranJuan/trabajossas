//TP#Final — Aventura Gráfica Interactiva Web [2] recuperatorio
//Alan Giammarco 92814/9
//Juan Casteran 93060/3
//https://youtu.be/Ca036m9scdw

let objJuego;
let imagen; // intro
let escenario = [0, 1, 2, 3]; // fondos
let escenaActual = "menu";

function preload() {
  imagen = loadImage("data/intro.gif"); // Carga la imagen de la intro
}

function setup() {
  objJuego = new Juego();
  createCanvas(640, 480);
  textAlign(CENTER, CENTER);
  ambiente = document.getElementById("ambiente");
  for (let j = 0; j < 4; j++) {
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
  rect(320, 430, 450, 40);
  fill(255);
  text("HAZ CLICK EN LOS CIRCULOS EMERGENTES", 320, 430);
}

function perdiste() { //perdes
  image(escenario[2], 0, 0);
  fill(0);
  rect(320, 50, 300, 50);
  rect(320, 440, 400, 50);
  fill(255);
  text("FREEZER TE HA VENCIDO", 320, 50);
  text("Juan Casteran y Alan Giammarco", 320, 440);
  rect(580, 440, 80, 50);
   fill(0);
  text("inicio", 580, 440)
}

function ganaste() { //ganas
  image(escenario[3], 0, 0);
  fill(0);
  rect(320, 50, 300, 50);
  rect(320, 440, 400, 50);
  fill(255);
  text("HAS VENCIDO A FREEZER", 320, 50);
  text("Juan Casteran y Alan Giammarco", 320, 440);
  rect(580, 440, 80, 50);
  fill(0);
  text("inicio", 580, 440)
}

function draw() {
  background(0);


  switch (escenaActual) {   // Lógica para cambiar entre escenas
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
      escenaActual = "inGame";
      objJuego.iniciar(); // inicia el juego
    }
    if (mouseX > 85 - 39 && mouseX < 85 + 39 && mouseY > 375 - 20 && mouseY < 375 + 20) { //sonido
      ambiente.currentTime = 0;
      ambiente.play();
    } else if (mouseX > 85 - 39 && mouseX < 85 + 39 && mouseY > 430 - 20 && mouseY < 430 + 20) {
      ambiente.pause();
    }
  } else if (escenaActual === "inGame") {
    objJuego.manejarClick(mouseX, mouseY);
  } else if (escenaActual === "perdiste" || escenaActual === "ganaste") { //boton de reinicio
    if (mouseX > 580 - 40 && mouseX < 580 + 40 && mouseY > 440 - 25 && mouseY < 440 + 25) {
      escenaActual = "menu";
    }
  }
}
