class Piece {
    constructor(image, side, posX, posY) {
      this.side = side;
      this.posY = posY;
      this.posX = posX;
      this.make_base(image);
      this.hasMoved = false;
      this.isClicked = false;

    }

    make_base(img) {
        this.base_image = new Image();
        this.base_image.src = `./set/${img}.svg`;
    }
}

module.exports = Piece;