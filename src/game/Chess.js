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
        // pawns
        for (let i = 0; i < 8; i++) {
            this.pieces.push(new Pawn("wp", "w", i, 6));
            this.pieces.push(new Pawn("bp", "b", i, 1));
        }
    }

    /**
     * @param ctx canvas instance
     */
    drawPieces() {
        return null
    }

    getAllPieces() {
        return this.pieces;
    }
}

export default Chess;