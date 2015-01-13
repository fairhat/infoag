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

var GAME = true;
var X_ENDE = 0;
var Y_ENDE = 0;


/**
 * @description Canvas - "Spielfeld" wird erstellt
 */
var spielfeld = oCanvas.create({
    canvas: "#spiel",
    background: "img/bg.png"
});

X_ENDE = spielfeld.width;
Y_ENDE = spielfeld.height;

/**
 * @name Vogel
 * @description Vogel-Objekt für das Spielfeld
 */
var vogel = spielfeld.display.sprite({
    x: X_ENDE / 5,
    y: Y_ENDE / 4,
    image: "img/bird.png",
    generate: true,
    width: 34,
    height: 24,
    direction: "y",
    dx: 0,
    dy: 0,
    frame: 1
});

/**
 * @name Rohrprototypen
 * @type Object
 * @description Blaupausen für die Rohre
 */
var rohrObenPrototyp = spielfeld.display.image({
    x: X_ENDE-50,
    y: 0-180,
    width: 45,
    height: 350,
    image: "img/pipe_down.png",
    dx: 0
});

var rohrUntenPrototyp = spielfeld.display.image({
    x: X_ENDE-50,
    y: Y_ENDE-250,
    width: 45,
    height: 350,
    image: "img/pipe_up.png",
    dx: 0,
    zIndex: 5
});

/**
 * @name Boden
 * @description Boden des Spielfeldes
 */
var boden = spielfeld.display.image({
   x: 0,
   y: Y_ENDE - 112,
   image: "img/ground.png",
   zaehler: 0,
   dx: -5,
   zIndex: 99
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
    if(GAME) {
        if (boden.zaehler == 8) {
            boden.x = 0;
            boden.zaehler = 0;
        }
        else {
            boden.x += boden.dx;
            boden.zaehler++;
        }
    }
};

/**
 * Schwerkraft - Bsp.: Vogel wird nach unten gezogen
 */
var schwerkraft = function() {
    if(GAME)vogel.dy += 1; // Schwerkraftsvariable
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
      GAME = false; // gameover
      vogel.dy = 0;
  }
};

spielfeld.addChild(vogel); // vogel hinzufügen

spielfeld.addChild(rohrUntenPrototyp);
spielfeld.addChild(rohrObenPrototyp);


spielfeld.addChild(boden); // boden hinzufügen


var schleife = function () {
    abfragen();
    bewegungen();
    animationen();
};

spielfeld.bind("keydown", function (taste) {
    if(taste.which === LEERTASTE){
        vogel.dy = -10; // vogel springt hoch
    }
});


// startet die Schleife
spielfeld.setLoop(schleife);
// Timeline starten
spielfeld.timeline.start();

