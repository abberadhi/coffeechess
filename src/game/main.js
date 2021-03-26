let gamePieces =  [];
let selected;

    let c, ctx;
    const BOXSIZE = 100;

    init();

    function init() {
        c = document.getElementById("myCanvas");
        ctx = c.getContext("2d");

        createPieces();
        drawBoard();
        drawPieces();
        // eventListenerOn();
    }

    function gameLoop() {
        
    }

    function drawBoard() {

        const colors = ["#8CE78C", "#FFFFFF"]
        let alternator = 0;

        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                ctx.fillStyle = colors[alternator];
                alternator = (alternator == 0 ? 1 : 0);
                
                ctx.fillRect(x*BOXSIZE, y*BOXSIZE, BOXSIZE, BOXSIZE);
            }
            alternator = (alternator == 0 ? 1 : 0);
        }

    }

    function createPieces() {
        
        // king
        gamePieces.push(new King("bk", "b", 4, 0));
        gamePieces.push(new King("wk", "w", 4, 7));

        // queen
        gamePieces.push(new Queen("bq", "b", 3, 0));
        gamePieces.push(new Queen("wq", "w", 3, 7));

        // Knight
        gamePieces.push(new Knight("wn", "w", 1, 7));
        gamePieces.push(new Knight("wn", "w", 6, 7));
        gamePieces.push(new Knight("bn", "b", 1, 0));
        gamePieces.push(new Knight("bn", "b", 6, 0));
        

        // Rook
        gamePieces.push(new Rook("wr", "w", 0, 7));
        gamePieces.push(new Rook("wr", "w", 7, 7));
        gamePieces.push(new Rook("br", "b", 0, 0));
        gamePieces.push(new Rook("br", "b", 7, 0));

        // Bishop
        gamePieces.push(new Bishop("wb", "w", 2, 7));
        gamePieces.push(new Bishop("wb", "w", 5, 7));
        gamePieces.push(new Bishop("bb", "b", 2, 0));
        gamePieces.push(new Bishop("bb", "b", 5, 0));

        // pawns
        for (let i = 0; i < 8; i++) {
            gamePieces.push(new Pawn("wp", "w", i, 6));
            gamePieces.push(new Pawn("bp", "b", i, 1));
        }
    }

    function drawPieces() {
        for (let i = 0; i < gamePieces.length; i++) {
            gamePieces[i].base_image.onload = function() {
                ctx.drawImage(
                    gamePieces[i].base_image, 
                    (gamePieces[i].posX*BOXSIZE) + (gamePieces[i].base_image.naturalHeight/2/2/2/2), 
                    gamePieces[i].posY*BOXSIZE + (gamePieces[i].base_image.naturalWidth/2/2/2/2),
                    gamePieces[i].base_image.naturalWidth*1.5,
                    gamePieces[i].base_image.naturalHeight*1.5,
                );
            }
            ctx.drawImage(
                gamePieces[i].base_image, 
                (gamePieces[i].posX*BOXSIZE) + (gamePieces[i].base_image.naturalHeight/2/2/2/2), 
                gamePieces[i].posY*BOXSIZE + (gamePieces[i].base_image.naturalWidth/2/2/2/2),
                gamePieces[i].base_image.naturalWidth*1.5,
                gamePieces[i].base_image.naturalHeight*1.5,
            );
        }
    }

    c.addEventListener("mousedown", myDown, false);


    function myDown(event) {
        // console.log(event);

        // check what paws in clicked

        // c.addEventListener("mousemove", myMove, false);
        // c.addEventListener("mouseup", myUp, false);
        drawBoard()
        
        drawPieces()

        if (selected) {
            // selected.canMove(event.clientX / 100)
            console.log(Math.floor(event.clientX / 100));
            console.log(Math.floor(event.clientY / 100));

            selected.canMove(
                Math.floor(event.clientX / 100), 
                Math.floor(event.clientY / 100)
            )
            selected = null;

            // console.log(selected);
        }

        for (let i = 0; i < gamePieces.length; i++) {
        // console.log(event.clientX, gamePieces[i].posY*BOXSIZE);
            if (event.clientX > gamePieces[i].posX*BOXSIZE &&
                event.clientX < gamePieces[i].posX*BOXSIZE + 100 &&
                event.clientY > gamePieces[i].posY*BOXSIZE && 
                event.clientY < gamePieces[i].posY*BOXSIZE + 100) {
                    gamePieces[i].isClicked = true;

                    // drawPieces()
                    selected = gamePieces[i];
                    highlightSquare(
                        gamePieces[i].posX,
                        gamePieces[i].posY
                    );
                break;
            }
        }



    }

    function highlightSquare(x, y) {
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.rect(x*BOXSIZE, y*BOXSIZE, BOXSIZE, BOXSIZE);
        ctx.stroke();
    }
    
    // listen for mouse events
    // ctx.onmousedown = myDown;
    // ctx.onmouseup = myUp;
    // ctx.onmousemove = myMove;

    // let moveInterval;


    // // c.addEventListener("mousemove", myMove, false);
    // // c.addEventListener("mouseup", myUp, false);
    // c.addEventListener("mousedown", myDown, false);

    // function doMouseUp() {
        
    // }

    // function myDown(event) {
    //     // console.log(event);

    //     // check what paws in clicked

    //     c.addEventListener("mousemove", myMove, false);
    //     c.addEventListener("mouseup", myUp, false);
        


    //     for (let i = 0; i < gamePieces.length; i++) {
    //         if (event.clientX > gamePieces[i].posY &&
    //             event.clientX < gamePieces[i].posY + 100 &&
    //             event.clientY > gamePieces[i].posX && 
    //             event.clientY < gamePieces[i].posX + 100) {
    //                 gamePieces[i].isClicked = true;
    //                 console.log("click")
    //             }
    //     }
    // }

    // function myUp(event) {
    //     // console.log(event);

    //     // check what paws in clicked

    //     for (let i = 0; i < gamePieces.length; i++) {
    //         gamePieces[i].isClicked = false;
    //         console.log("release");
    //     }
        
    //     c.removeEventListener("mousemove", myMove, false);
    //     c.addEventListener("mouseup", myUp, false);



    // }

    // function myMove(event) {
    //     for (let i = 0; i < gamePieces.length; i++) {
    //         if (gamePieces[i].isClicked) {
    //             gamePieces[i].posX = event.clientY;
    //             gamePieces[i].posY = event.clientX;
    //             ctx.clearRect(gamePieces[i].posY, gamePieces[i].posX, gamePieces[i].base_image.naturalHeight, gamePieces[i].base_image.naturalWidth);
    //             ctx.drawImage(gamePieces[i].base_image, gamePieces[i].posY, gamePieces[i].posX);
    //             console.log("moved")
    //         }
    //     }
    // }



