/**
 * Informatik AG - Spiel
 *
 * @author Ferhat Topcu
 * @description Spiel für die Informatik AG am Diesterweg Gymnasium Berlin
 * @version 0.0.2
 *
 */
var LEERTASTE = 32,
    LINKS = 37,
    RECHTS = 39;

var SCHWERKRAFT = true;


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
   image: "img/ground.png",
   zaehler: 0,
   dx: -5
});

/**
 * Animationen für die Sprites
 */
var animationen = function(){
    // VOGEL
    if(vogel.dy < 0)vogel.frame = 1;
    else if(vogel.dy == 0)vogel.frame = 2;
    else vogel.frame = 3;

    // BODEN
    if(boden.zaehler == 8) {
        boden.x = 0;
        boden.zaehler = 0;
    }
    else {
        boden.x += boden.dx;
        boden.zaehler++;
    }
};

/**
 * Schwerkraft - Bsp.: Vogel wird nach unten gezogen
 */
var schwerkraft = function() {
    if(SCHWERKRAFT)vogel.dy += 1; // Schwerkraftsvariable
};

/**
 * Bewegungen werden hier registriert
 */
var bewegungen = function() {
  schwerkraft();

  // vogel.x += vogel.dx; // vogel bewegt sich um .dx auf der X-Achse
  vogel.y += vogel.dy; // vogel bewegt sich um .dy auf der Y-Achse
};

/**
 * Abfragen, bspw., ob der Vogel das Spielfeld verlässt (oder auch Kollisionen mit anderen Objekten)
 */
var abfragen = function() {
  if(vogel.y >= boden.y - vogel.height)
  {
      vogel.y = boden.y - vogel.height;
      SCHWERKRAFT = false;
      vogel.dy = 0;
  }
};

canvas.addChild(boden); // boden hinzufügen
canvas.addChild(vogel); // vogel hinzufügen


var schleife = function () {
    abfragen();
    bewegungen();
    animationen();
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

