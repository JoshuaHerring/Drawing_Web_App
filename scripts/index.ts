let widthUp = document.getElementById("increment_width")
let widthDown = document.getElementById("decrement_width")

class board {
  private board;
  private ctx;
  private mousePos: {x: number, y: number};
  private last: {x: number, y: number};
  private scale: {x: number, y: number};
  private drawWidth: number;
  private color;

  public constructor() {
    // Gets the canvas element from html
    this.board = <HTMLCanvasElement> document.getElementById("draw")
    // Gets the drawing context from the canvas element
    this.ctx = this.board.getContext("2d")
    // Calculates the size of the html element and it's drawing scale accordingly
    this.scale = {x: this.board.width / this.board.clientWidth , y:this.board.height / this.board.clientHeight}
    // sets the drawing context's scale to the calculated value as shown in the previous line of code
    this.ctx?.scale(this.scale.x, this.scale.y)

    // A variable to hold the current mouse position
    this.mousePos = {x:0, y:0}
    // A variable to hold the last current mouse position
    this.last = {x:0, y:0}
    // A variable to hold the draw width
    this.drawWidth = 1
    //a variable to hold the color
    this.color = {r: 200, g: 0, b: 0}
  }

  public loop(): void {
    this.fadeToBlack()
    this.colorBar()
    this.drawOverCursor()
  }
  
  public setMousePos(event: MouseEvent) :void {
    this.mousePos.x = event.clientX - this.board.offsetLeft
    this.mousePos.y = event.clientY - this.board.offsetTop
  }

  public upDrawWidth(): void {
    if(this.drawWidth < 5)
    this.drawWidth ++
  }

  public downDrawWidth(): void {
    if(this.drawWidth > 1)
    this.drawWidth --
  }

  public changeColor(event: WheelEvent): void {
    // console.log(event.deltaY)
    if(this.color.r <= 255 && this.color.g == 0) {
      this.color.r += event.deltaY
    }
    if (this.color.r > 255) {
      this.color.r = 255
    }
    if (this.color.r < 200) {
      this.color.r = 200
    }

    if (this.color.r == 255 && this.color.g <= 255 && this.color.b == 0) {
      this.color.g += event.deltaY
    }
    if (this.color.g > 255) {
      this.color.g = 255
    }
    if (this.color.g < 0) {
      this.color.g = 0
    }

    if (this.color.g == 255 && this.color.b <= 255) {
      this.color.b += event.deltaY
    }
    if (this.color.b > 255) {
      this.color.b = 255
    }
    if (this.color.b < 0) {
      this.color.b = 0
    }

    
    console.log(this.color)    
    
  }

  private fadeToBlack(): void {

    if(this.ctx){
      this.ctx.fillStyle = "#0000000a"
      this.ctx.fillRect(0, 0, this.board.clientWidth, this.board.clientHeight)
    }
  }

  private colorBar(): void {

    if (this.ctx) {
      this.ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`
      this.ctx.fillRect(0, 0, this.board.clientWidth, this.board.clientHeight * .05)
    }
  }


  private drawOverCursor(): void {
    if(this.ctx){
      this.ctx.strokeStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`
      this.ctx.lineWidth = this.drawWidth
      this.ctx.beginPath()
      this.ctx.moveTo(this.last.x, this.last.y)
      this.ctx.lineTo(this.mousePos.x, this.mousePos.y)
      this.ctx.stroke()
      this.ctx.closePath()

      this.last.x = this.mousePos.x
      this.last.y = this.mousePos.y
    }
  }
}


let canva = new board();
  
function loop(): void {
  canva.loop()
  window.requestAnimationFrame(loop)
}

window.addEventListener("mousemove", canva.setMousePos.bind(canva));
widthUp?.addEventListener("click", canva.upDrawWidth.bind(canva))
widthDown?.addEventListener("click", canva.downDrawWidth.bind(canva))
window.addEventListener("wheel", canva.changeColor.bind(canva))
window.requestAnimationFrame(loop)

