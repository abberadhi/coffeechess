import Rook from './Rook';
import Knight from './Knight';
import Bishop from './Bishop';
import Queen from './Queen';
import King from './King';
import Pawn from './Pawn';


class Chess {
    constructor(turn, userID) {
        this.userID = userID;
        this.pieces = [];
        this.turn = turn ?? "w"; // default turn is white
        this.selected = null;
    }

    /**
     * Creates initial game pieces
     */
    createStartPieces() {
        // king
        this.pieces.push(new King("bk", "b", 4, 0));
        this.pieces.push(new King("wk", "w", 4, 7));

        // queen
        this.pieces.push(new Queen("bq", "b", 3, 0));
        this.pieces.push(new Queen("wq", "w", 3, 7));

        // Knight
        this.pieces.push(new Knight("wn", "w", 1, 7));
        this.pieces.push(new Knight("wn", "w", 6, 7));
        this.pieces.push(new Knight("bn", "b", 1, 0));
        this.pieces.push(new Knight("bn", "b", 6, 0));

        // Rook
        this.pieces.push(new Rook("wr", "w", 0, 7));
        this.pieces.push(new Rook("wr", "w", 7, 7));
        this.pieces.push(new Rook("br", "b", 0, 0));
        this.pieces.push(new Rook("br", "b", 7, 0));

        // Bishop
        this.pieces.push(new Bishop("wb", "w", 2, 7));
        this.pieces.push(new Bishop("wb", "w", 5, 7));
        this.pieces.push(new Bishop("bb", "b", 2, 0));
        this.pieces.push(new Bishop("bb", "b", 5, 0));      

        // pawns
        for (let i = 0; i < 8; i++) {
            this.pieces.push(new Pawn("wp", "w", i, 6));
            this.pieces.push(new Pawn("bp", "b", i, 1));
        }
    }

    /**
     * Get all pieces on the board
     * @returns {Array} all pieces
     */
    getAllPieces() {
        return this.pieces;
    }

    /**
     * 
     * @param {int} x
     * @param {int} y 
     * @returns {object} piece
     */
    getPieceBySquare(x, y) {
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].posX == x && this.pieces[i].posY == y) {
                return this.pieces[i];
            }
        }

        return false;
    }
}

export default Chess;