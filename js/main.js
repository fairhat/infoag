/**
 * Informatik AG - Spiel
 *
 * @author Ferhat Topcu
 * @description Spiel für die Informatik AG am Diesterweg Gymnasium Berlin
 * @version 0.0.2
 *
 */
var LEERTASTE = 32;


/**
 * @description Canvas - "Spielfeld" wird erstellt
 */
var canvas = oCanvas.create({
    canvas: "#spiel",
    background: "img/bg.png"
});

/**
 * @name Vogel
 * @description Vogel-Objekt für das Spielfeld
 */
var vogel = canvas.display.sprite({
    x: canvas.width / 5,
    y: canvas.height / 4,
    image: "img/bird.png",
    generate: true,
    width: 34,
    height: 24,
    direction: "y",
    dx: 0,
    dy: 0,
    frame: 1
});

// vogel zusätzliche attribute

/**
 * @name Boden
 * @description Boden des Spielfeldes
 */
var boden = canvas.display.image({
   x: 0,
   y: canvas.height - 112,
   image: "img/ground.png"
});

/**
 * Schwerkraft - Bsp.: Vogel wird nach unten gezogen
 */
var schwerkraft = function() {
    vogel.dy += 1; // Schwerkraftsvariable
};

/**
 * Bewegungen werden hier registriert
 */
var bewegungen = function() {
  schwerkraft();
  vogel.x += vogel.dx; // vogel bewegt sich um .dx auf der X-Achse
  vogel.y += vogel.dy; // vogel bewegt sich um .dy auf der Y-Achse
};

var abfragen = function() {
  if(vogel.y >= canvas.height)
  {
      vogel.y = 0;
      vogel.dy = 0;
  }
};

canvas.addChild(boden); // boden hinzufügen
canvas.addChild(vogel); // vogel hinzufügen


var schleife = function () {
    abfragen();
    bewegungen();
};

canvas.bind("keydown", function (taste) {
    if(taste.which === LEERTASTE){
        vogel.dy = -10; // vogel springt hoch
    }
});


// startet die Schleife
canvas.setLoop(schleife);
// Timeline starten
canvas.timeline.start();

