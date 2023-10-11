export class board {
    constructor(canvasElement) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        window.requestAnimationFrame(this.loop.bind(this));
        this.widthUp = document.getElementById("increment_width");
        this.widthDown = document.getElementById("decrement_width");
        this.effect1 = document.getElementById("effect1");
        this.effect2 = document.getElementById("effect2");
        this.fadeUp_button = document.getElementById("fade_up");
        this.fadeDown_button = document.getElementById("fade_down");
        this.reset_button = document.getElementById("reset");
        this.chaos_button = document.getElementById("chaos");
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
        this.color = { r: 255, g: 255, b: 255 };
        this.effect1_active = false;
        this.effect2_active = false;
        this.star_delay = Math.round(Math.random() * 2000);
        this.star_number = 2000;
        this.fade_rate = 5;
        this.fade_count = this.fade_rate;
        if (this.ctx) {
            this.ctx.fillStyle = "#000000";
            this.ctx.fillRect(0, 0, this.board.clientWidth, this.board.clientHeight);
        }
        window.addEventListener("mousemove", this.setMousePos.bind(this));
        (_b = this.widthUp) === null || _b === void 0 ? void 0 : _b.addEventListener("click", this.upDrawWidth.bind(this));
        (_c = this.widthDown) === null || _c === void 0 ? void 0 : _c.addEventListener("click", this.downDrawWidth.bind(this));
        window.addEventListener("wheel", this.changeColor.bind(this));
        (_d = this.effect1) === null || _d === void 0 ? void 0 : _d.addEventListener("click", this.lasers.bind(this));
        (_e = this.effect2) === null || _e === void 0 ? void 0 : _e.addEventListener("click", this.stars_active.bind(this));
        (_f = this.fadeUp_button) === null || _f === void 0 ? void 0 : _f.addEventListener("click", this.upFade.bind(this));
        (_g = this.fadeDown_button) === null || _g === void 0 ? void 0 : _g.addEventListener("click", this.downFade.bind(this));
        (_h = this.reset_button) === null || _h === void 0 ? void 0 : _h.addEventListener("click", this.reset.bind(this));
        (_j = this.chaos_button) === null || _j === void 0 ? void 0 : _j.addEventListener("click", this.chaos.bind(this));
    }
    loop() {
        this.fadeToBlack();
        this.colorBar();
        this.drawOverCursor();
        if (this.effect2_active) {
            this.stars();
        }
        window.requestAnimationFrame(this.loop.bind(this));
    }
    chaos() {
        this.effect1_active = true;
        this.effect2_active = true;
        this.drawWidth += 10000;
        this.fade_rate = 0;
    }
    reset() {
        this.effect1_active = false;
        this.effect2_active = false;
        this.drawWidth = 3;
        this.fade_rate = 5;
        if (this.ctx) {
            this.ctx.fillStyle = "#000000";
            this.ctx.fillRect(0, 0, this.board.clientWidth, this.board.clientHeight);
        }
    }
    setMousePos(event) {
        this.mousePos.x = event.clientX - this.board.offsetLeft;
        this.mousePos.y = event.clientY - this.board.offsetTop;
    }
    upFade() {
        if (this.fade_rate < 10)
            this.fade_rate++;
        console.log(this.fade_rate);
    }
    downFade() {
        if (this.fade_rate > 0)
            this.fade_rate--;
        console.log(this.fade_rate);
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
        if (this.fade_count) {
            this.fade_count--;
        }
        else {
            if (this.ctx) {
                this.ctx.fillStyle = "#0000000a";
                this.ctx.fillRect(0, 0, this.board.clientWidth, this.board.clientHeight);
            }
            this.fade_count = this.fade_rate;
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
    lasers() {
        // console.log(this.effect1_active)
        if (!this.effect1_active) {
            this.drawWidth += 10000;
            this.effect1_active = true;
        }
        else {
            this.drawWidth -= 10000;
            this.effect1_active = false;
        }
    }
    // Will send sparks flying from cursor
    stars() {
        if (this.ctx) {
            this.ctx.fillStyle = "#ffffff";
            for (let x = 0; x < this.board.clientWidth; x += 10) {
                for (let y = 20; y < this.board.clientHeight; y += 10) {
                    // randomize the stars using a random number that skips a random number of starts
                    if (this.star_delay) {
                        this.star_delay--;
                    }
                    else {
                        this.ctx.fillRect(x, y, 2, 2);
                        this.star_delay = Math.round((Math.random() * this.star_number) * (this.fade_rate + 1));
                    }
                }
            }
        }
    }
    stars_active() {
        if (this.effect2_active) {
            this.effect2_active = false;
        }
        else {
            this.effect2_active = true;
        }
    }
}
//# sourceMappingURL=board.js.map