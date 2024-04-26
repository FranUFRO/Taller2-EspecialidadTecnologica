class Character {
  constructor(nombre, vida, daño) {
    this.nombre = nombre;
    this.vida = vida;
    this.daño = daño;
    this.elemento = null;
    this.posX = Math.floor(Math.random() * 500);
    this.posY = Math.floor(Math.random() * 301);
  }

  actualizarPosicion() {
    this.elemento.style.left = this.posX + "px";
    this.elemento.style.top = this.posY + "px";
  }
}

function calcularDistancia(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

document.addEventListener("DOMContentLoaded", function () {
  character1.elemento.style.left = character1.posX + "px";
  character1.elemento.style.top = character1.posY + "px";
  character2.elemento.style.left = character2.posX + "px";
  character2.elemento.style.top = character2.posY + "px";
  updateStatus("status1", "Vida: " + character1.vida);
  updateStatus("status2", "Vida: " + character2.vida);
  updateHealthBar("healthBar1", character1.vida, 100);
  updateHealthBar("healthBar2", character2.vida, 100);
});

document.addEventListener("keydown", function (event) {
  console.log(event.key);
  const key = event.key;
  const distancia = calcularDistancia(
    character1.posX,
    character1.posY,
    character2.posX,
    character2.posY
  );
  const rangoDeAtaque = 90;

  if (
    key === "m" &&
    distancia <= rangoDeAtaque &&
    character1.vida > 0 &&
    character2.vida > 0
  ) {
    character2.vida -= character1.daño;
    character1.elemento.style.backgroundImage =
      "url('../../juegoDePelea/images/personaje1Ataca.png')";
    setTimeout(function () {
      character1.elemento.style.backgroundImage =
        "url('../../juegoDePelea/images/personaje1Normal.png')";
    }, 500);
    console.log(character2.vida);
    updateHealthBar("healthBar2", character2.vida, 100);
    updateStatus("status2", "Vida: " + character2.vida);
    revisarEstadoJuego();
  }
});

document.addEventListener("keydown", function (event) {
  console.log(event.key);
  const key = event.key;
  const distancia = calcularDistancia(
    character1.posX,
    character1.posY,
    character2.posX,
    character2.posY
  );
  const rangoDeAtaque = 90;

  if (
    key === "v" &&
    distancia <= rangoDeAtaque &&
    character1.vida > 0 &&
    character2.vida > 0
  ) {
    character1.vida -= character2.daño;
    character2.elemento.style.backgroundImage =
      "url('../../juegoDePelea/images/personaje2Ataca.png')";
    setTimeout(function () {
      character2.elemento.style.backgroundImage =
        "url('../../juegoDePelea/images/personaje2Normal.png')";
    }, 500);
    console.log(character1.vida);
    updateHealthBar("healthBar1", character1.vida, 100);
    updateStatus("status1", "Vida: " + character1.vida);
    revisarEstadoJuego();
  }
});

function revisarEstadoJuego() {
  if (character1.vida <= 0 && character2.vida > 0) {
    finalizarJuego("Jugador 2");
  }
  if (character2.vida <= 0 && character1.vida > 0) {
    finalizarJuego("Jugador 1");
  }
}

function finalizarJuego(nombreGanador) {
    var mensajeCompleto= document.getElementById('mensajeFinalizar');
    const mensaje = document.querySelector('.mensaje'); 
    mensaje.innerText = `¡El jugador ${nombreGanador} ha ganado!`; 
    mensajeCompleto.style.display = "block"; 

}

function reiniciarJuego(){
    location.reload();
}

function updateStatus(elementId, status) {
  const element = document.getElementById(elementId);
  element.innerText = status;
}

function updateHealthBar(elementId, currentHealth, maxHealth) {
  const element = document.getElementById(elementId);
  if (currentHealth <= 0) {
    element.style.width = "0%";
  } else {
    const percent = (currentHealth / maxHealth) * 100;
    element.style.width = percent + "%";
  }
}

const character1 = new Character("Character 1", 100, 10);
const character2 = new Character("Character 2", 100, 10);

character1.elemento = document.getElementById("character1");
character2.elemento = document.getElementById("character2");

function moverPersonaje(personaje, deltaX, deltaY) {
  const nuevaPosX = personaje.posX + deltaX;
  const nuevaPosY = personaje.posY + deltaY;

  if (
    nuevaPosX >= 0 &&
    nuevaPosX + personaje.elemento.offsetWidth <= areaJuego.offsetWidth &&
    nuevaPosY >= 0 &&
    nuevaPosY + personaje.elemento.offsetHeight <= areaJuego.offsetHeight
  ) {
    personaje.posX = nuevaPosX;
    personaje.posY = nuevaPosY;
    personaje.actualizarPosicion();
  }
}

document.addEventListener("keydown", function (event) {
  console.log(event.key);
  const key = event.key;
  if (key === "ArrowUp") {
    moverPersonaje(character1, 0, -10);
  } else if (key === "ArrowDown") {
    moverPersonaje(character1, 0, 10);
  } else if (key === "ArrowLeft") {
    moverPersonaje(character1, -10, 0);
  } else if (key === "ArrowRight") {
    moverPersonaje(character1, 10, 0);
  }
});

document.addEventListener("keydown", function (event1) {
  const key = event1.key;
  console.log(key);

  if (key === "w") {
    moverPersonaje(character2, 0, -10);
  } else if (key === "s") {
    moverPersonaje(character2, 0, 10);
  } else if (key === "a") {
    moverPersonaje(character2, -10, 0);
  } else if (key === "d") {
    moverPersonaje(character2, 10, 0);
  }
});
