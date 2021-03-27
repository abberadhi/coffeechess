import Piece from './Piece'

class Knight extends Piece {
/**
   * @argument allPieces
   * @returns {Array} Array of objects of all legal moves
   */
  allPossibleMoves() {
    // direction
    let moves = [];

    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        if (i == 0 || j == 0) break;
        if (Math.abs(i) == Math.abs(j)) break;
        if (this.posX + i && this.posY + j) moves.push({x: this.posX + i, y: this.posY + j});
      }
    }

    return moves;
  }

  /**
   * @returns if knight can take
   */
  canTake(piece) {
    if (piece.side != this.side) return false;

    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        if (i == 0 || j == 0) continue;
        if (i == j) continue;

        // if (this.posX + i && this.posY + j) moves.push({x: this.posX + i, y: this.posY + j});
      }
    }
    return false;

  }

  /**
   * 
   * @param {int} x position pawn wants to move to
   * @param {int} y position pawn wants to move to
   * @param {boolean} taking if pawn is taking. 
   */
  canMove(x, y) {
    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        if (i == 0 || j == 0) continue;
        if (i == j) continue;

        if (this.posX + i == x && this.posY + j == y) return true;
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

export default Knight;