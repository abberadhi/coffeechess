import Piece from './Piece';

class Pawn extends Piece {
  /**
   * @argument allPieces
   * @returns {Array} Array of objects of all legal moves
   */
  allPossibleMoves(allPieces) {
    // direction
    let d = this.side === "w" ? -1 : 1;
    let moves = [];

    for (let x = this.posX-1; x <= this.posX+1; x++) {
      moves.push({x, y: this.posY + d});
    }

    if (!this.hasMoved) moves.push({x: this.posX, y: this.posY + 2*d});

    // remove illegal moves
    for (let i = 0; i < moves.length; i++) {
      if (!this.canMove(moves[i].x, moves[i].y)) {
        moves.splice(i, 1);
        i--;
      }
    }

    // add takes
    for (let j = 0; j < allPieces.length; j++) {
      if (this.canTake(allPieces[j], allPieces[j].posX, allPieces[j].posY)) {
        moves.push({x: allPieces[j].posX, y: allPieces[j].posY, take: true});
      }
    }

    return moves;
  }

  /**
   * @returns if pawn can take
   */
  canTake(piece, x, y) {
    let d = this.side === "w" ? -1 : 1;
    if ((this.posX - 1 == x || this.posX + 1 == x) && this.posY + d == y && piece.side != this.side) {
      return true;
    }

    return false;
  }

  /**
   * 
   * @param {int} x position pawn wants to move to
   * @param {int} y position pawn wants to move to
   * @param {boolean} taking if pawn is taking. 
   */
  canMove(x, y, taking) {
    let d = this.side === "w" ? -1 : 1;
    if (taking) {
      this.posX = x;
      this.posY = y;
      return;
    }

    if (this.hasMoved) {
      // rules if pawn has moved
      if (this.posY + d == y && this.posX == x) {
        return true;
      }
    } else {
      //rules if pawn hasn't yet moved
      if (
        (this.posY + d == y && this.posX == x) || 
        (this.posY + d*2 == y && this.posX == x)
      ) {
        return true;
      }
    }
    return false;
  }

  /**
   * 
   */
  move(x, y, taking) {
    if (this.canMove(x, y, taking)) {
      this.posX = x;
      this.posY = y;
      this.hasMoved = true;
    }
  }
}

export default Pawn;