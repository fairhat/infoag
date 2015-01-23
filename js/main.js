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
var rohre = [];
var score = 0;
var scoreGezeigt = false;

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
    dx: 0,
	type: 0,
	punkt: false
}),

    rohrUntenPrototyp = spielfeld.display.image({
    x: X_ENDE-50,
    y: Y_ENDE-250,
    width: 45,
    height: 350,
    image: "img/pipe_up.png",
    dx: 0,
    zIndex: 5,
	type: 1,
	punkt: false
});

function rohrErstellen(params)
{
    var randomNumber = Math.floor(Math.random() * 201) - 100;
    var xOffset = +200;
    var rohrOben = rohrObenPrototyp.clone({
        x: params.x + xOffset,
        y: params.y1 + randomNumber,
		height: 350,
		width: 45,
		type: 0,
		punkte: false
    });

    var rohrUnten = rohrUntenPrototyp.clone({
       x: params.x + xOffset,
       y: params.y2 + randomNumber,
	   height: 350,
	   width: 45,
	   type: 1,
	   punkte: false
    });

    rohre.push([rohrOben,rohrUnten]);
    spielfeld.addChild(rohrOben);
    spielfeld.addChild(rohrUnten);
}

for(var i = 0; i<4; i++)
{
    if(i==0){
        rohrErstellen({
            x: X_ENDE+500,
            y1: -180,
            y2: Y_ENDE-250
        })
    }else {
        console.log(rohre[i-1][0].x);
        rohrErstellen({
                x: rohre[i-1][0].x,
                y1: -180,
                y2: Y_ENDE - 250
            })
    }
}


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

  // ROHRE
  if(GAME) {
      for (var i = 0; i < rohre.length; i++) {
          for (var j = 0; j < rohre[i].length; j++) {
		  
			if(rohre[i][j].x<0-45){
			rohre[i][j].x+=735;
			rohre[i][j].punkte = false;
			}
              rohre[i][j].dx = -7;
              rohre[i][j].x += rohre[i][j].dx;
			  
			  
			// kollision
			if(		(vogel.x + vogel.width - 10 >= rohre[i][j].x &&
					vogel.y + vogel.height >= rohre[i][j].y &&
					rohre[i][j].type === 1)
					
					||
					
					(vogel.x + vogel.width - 10 >= rohre[i][j].x &&
					vogel.y <= rohre[i][j].y + rohre[i][j].height &&
					rohre[i][j].type === 0)
				)
			{
			    console.log("getroffen!");
				GAME = false;
			}
			
			
			if(vogel.x >= rohre[i][j].x &&
				rohre[i][j].punkte == false)
			{
				score += 0.5;
				rohre[i][j].punkte = true;
			}
          }
      }
  }

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
  
  if(GAME == false && scoreGezeigt == false)
  {
	var dialog = confirm("Punktzahl: "+score);
	scoreGezeigt = true;
	
	if(dialog)
	{
		location.reload();
	}
	
  }
};

spielfeld.addChild(vogel); // vogel hinzufügen
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

