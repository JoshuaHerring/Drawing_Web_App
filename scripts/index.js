"use strict";
class board {
    constructor(canvasElement) {
        var _a, _b, _c;
        window.requestAnimationFrame(this.loop.bind(this));
        this.widthUp = document.getElementById("increment_width");
        this.widthDown = document.getElementById("decrement_width");
        // Gets the canvas element from html
        this.board = document.getElementById(canvasElement);
        // Gets the drawing context from the canvas element
        this.ctx = this.board.getContext("2d");
        // Calculates the size of the html element and it's drawing scale accordingly
        this.scale = { x: this.board.width / this.board.clientWidth, y: this.board.height / this.board.clientHeight };
        // sets the drawing context's scale to the calculated value as shown in the previous line of code
        (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.scale(this.scale.x, this.scale.y);
        // A variable to hold the current mouse position
        this.mousePos = { x: 0, y: 0 };
        // A variable to hold the last current mouse position
        this.last = { x: 0, y: 0 };
        // A variable to hold the draw width
        this.drawWidth = 3;
        //a variable to hold the color
        this.color = { r: 0, g: 200, b: 0 };
        window.addEventListener("mousemove", this.setMousePos.bind(this));
        (_b = this.widthUp) === null || _b === void 0 ? void 0 : _b.addEventListener("click", this.upDrawWidth.bind(this));
        (_c = this.widthDown) === null || _c === void 0 ? void 0 : _c.addEventListener("click", this.downDrawWidth.bind(this));
        window.addEventListener("wheel", this.changeColor.bind(this));
    }
    loop() {
        this.fadeToBlack();
        this.colorBar();
        this.drawOverCursor();
        window.requestAnimationFrame(this.loop.bind(this));
    }
    setMousePos(event) {
        this.mousePos.x = event.clientX - this.board.offsetLeft;
        this.mousePos.y = event.clientY - this.board.offsetTop;
    }
    upDrawWidth() {
        this.drawWidth++;
    }
    downDrawWidth() {
        if (this.drawWidth > 1)
            this.drawWidth--;
    }
    changeColor(event) {
        if (this.color.g <= 255 && this.color.b == 0) {
            this.color.g += event.deltaY;
        }
        if (this.color.g > 255) {
            this.color.g = 255;
        }
        if (this.color.g < 200) {
            this.color.g = 200;
        }
        if (this.color.g == 255 && this.color.b <= 255 && this.color.r == 0) {
            this.color.b += event.deltaY;
        }
        if (this.color.b > 255) {
            this.color.b = 255;
        }
        if (this.color.b < 0) {
            this.color.b = 0;
        }
        if (this.color.b == 255 && this.color.r <= 255) {
            this.color.r += event.deltaY;
        }
        if (this.color.r > 255) {
            this.color.r = 255;
        }
        if (this.color.r < 0) {
            this.color.r = 0;
        }
    }
    fadeToBlack() {
        if (this.ctx) {
            this.ctx.fillStyle = "#0000000a";
            this.ctx.fillRect(0, 0, this.board.clientWidth, this.board.clientHeight);
        }
    }
    colorBar() {
        if (this.ctx) {
            this.ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
            this.ctx.fillRect(0, 0, this.board.clientWidth, this.board.clientHeight * .05);
        }
    }
    drawOverCursor() {
        if (this.ctx) {
            this.ctx.strokeStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
            this.ctx.lineWidth = this.drawWidth;
            this.ctx.beginPath();
            this.ctx.moveTo(this.last.x, this.last.y);
            this.ctx.lineTo(this.mousePos.x, this.mousePos.y);
            this.ctx.stroke();
            this.ctx.closePath();
            this.last.x = this.mousePos.x;
            this.last.y = this.mousePos.y;
        }
    }
    // Will send sparks flying from cursor
    sparks() {
    }
}
let canva = new board("draw");
//# sourceMappingURL=index.js.map