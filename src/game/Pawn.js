import Piece from './Piece';

class Pawn extends Piece {
  /**
   * @argument x position pawn wants to go to
   * @argument y position pawn wants to go to
   * @returns if pawn can take something
   */
  allPossibleMoves() {
    // direction
    let d = this.side === "w" ? -1 : 1;
    let moves = [];

    for (let x = this.posX-1; x <= this.posX+1; x++) {
      moves.push([x, this.posY + d]);
    }

    if (!this.hasMoved) moves.push([this.posX, this.posY + (d*2)]);

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
  move(x, y, taking) {
    let d = this.side === "w" ? -1 : 1;
    if (taking) {
      this.posX = x;
      this.posY = y;
      return;
    }

    if (this.hasMoved) {
      // rules if pawn has moved
      if (this.posY + d == y && this.posX == x) {
        this.posX = x;
        this.posY = y;
        this.hasMoved = true;
      }
    } else {
      //rules if pawn hasn't yet moved
      if (
        (this.posY + d == y && this.posX == x) || 
        (this.posY + d*2 == y && this.posX == x)
      ) {
        this.posX = x;
        this.posY = y;
        this.hasMoved = true;
      }
    }
  }
}

export default Pawn;