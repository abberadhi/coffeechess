class Piece {
    constructor(image, side, posX, posY) {
      this.side = side;
      this.posY = posY;
      this.posX = posX;
      this.make_base(image);
      this.hasMoved = false;
      this.isClicked = false;
      this.attacking = [] // all pieces that this piece is attacking

    }

    make_base(img) {
        this.base_image = new Image();
        this.base_image.src = `./set/${img}.svg`;
    }
}

export default  Piece;