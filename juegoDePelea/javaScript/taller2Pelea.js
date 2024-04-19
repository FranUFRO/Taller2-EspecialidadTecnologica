// Definir la clase Character
class Character {
    constructor(nombre, vida, daño) {
        this.nombre = nombre;
        this.vida = vida;
        this.daño = daño;
        this.elemento = null; // Almacena el elemento HTML asociado al personaje
        this.posX = 0; // Posición X del personaje
        this.posY = 0; // Posición Y del personaje
    }

    // Método para actualizar la posición del personaje en el DOM
    actualizarPosicion() {
        this.elemento.style.left = this.posX + 'px';
        this.elemento.style.top = this.posY + 'px';
    }

    
}

document.addEventListener('keydown', function(event){
    console.log(event.key);
    const key = event.key;
    if(character1.posX == character2.posX && character1.posY == character2.posY){
        if(key === 'm'){
            character2.vida = character2.vida - character1.daño;
            console.log(character2.vida); 
            updateHealthBar('healthBar2', character2.vida, 10);
            updateStatus('status2', 'Vida: ' + character2.vida);
            
        }

    }

});
document.addEventListener('keydown', function(event){
    console.log(event.key);
    const key = event.key;
    if(character1.posX == character2.posX && character1.posY == character2.posY){
        if(key === 'v'){
            character1.vida = character1.vida - character2.daño;
            console.log(character2.vida); 
            updateHealthBar('healthBar1', character1.vida, 10);

            updateStatus('status1', 'Vida: ' + character1.vida);
            
        }

    }

});

function updateStatus(elementId, status) {
    const element = document.getElementById(elementId);
    element.innerText = status;
  }
  
  function updateHealthBar(elementId, currentHealth, maxHealth) {
    const element = document.getElementById(elementId);
    if (currentHealth <= 0) {
      element.style.width = '0%'; 
    } else {
      const percent = (currentHealth / maxHealth) * 100;
      element.style.width = percent + '%';
    }
  }

// Crear instancias de los personajes
const character1 = new Character('Character 1', 100, 10);
const character2 = new Character('Character 2', 100, 10);

// Asociar elementos HTML a los personajes
character1.elemento = document.getElementById('character1');
character2.elemento = document.getElementById('character2');

// Función para mover un personaje
// Función para mover un personaje dentro de los límites del área de juego
function moverPersonaje(personaje, deltaX, deltaY) {
    // Calcular la nueva posición
    const nuevaPosX = personaje.posX + deltaX;
    const nuevaPosY = personaje.posY + deltaY;
    
    // Verificar límites del área de juego
    if (nuevaPosX >= 0 && nuevaPosX + personaje.elemento.offsetWidth <= areaJuego.offsetWidth &&
        nuevaPosY >= 0 && nuevaPosY + personaje.elemento.offsetHeight <= areaJuego.offsetHeight) {
        // Si la nueva posición está dentro de los límites, actualizar la posición del personaje
        personaje.posX = nuevaPosX;
        personaje.posY = nuevaPosY;
        personaje.actualizarPosicion();
    }
}

// Event listener para el movimiento de los personajes
document.addEventListener('keydown', function(event) {
    console.log(event.key);
    const key = event.key;
    if (key === 'ArrowUp') {
        moverPersonaje(character1, 0, -20);
    } else if (key === 'ArrowDown') {
        moverPersonaje(character1, 0, 20);
    } else if (key === 'ArrowLeft') {
        moverPersonaje(character1, -20, 0);
    } else if (key === 'ArrowRight') {
        moverPersonaje(character1, 20, 0);
    }
});

document.addEventListener('keydown', function(event1) {
    const key = event1.key;
    console.log(key);
    
    if (key === 'w') {
        moverPersonaje(character2, 0, -10);
    } else if (key === 's') {
        moverPersonaje(character2, 0, 10);
    } else if (key === 'a') {
        moverPersonaje(character2, -10, 0);
    } else if (key === 'd') {
        moverPersonaje(character2, 10, 0);
    }
});
