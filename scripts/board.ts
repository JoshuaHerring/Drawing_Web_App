export class board {
  //Initializes all the variables and types needed for this class
    private board;
    private ctx;
    private mousePos: {x: number, y: number};
    private last: {x: number, y: number};
    private scale: {x: number, y: number};
    private drawWidth: number;
    private color;
    private widthDown;
    private widthUp;
    private effect1;
    private effect1_active: boolean;
    private star_delay: number;
    public star_number: number;
    private effect2;
    private effect2_active;
    private fade_rate: number;
    private fade_count: number;
    private fadeDown_button;
    private fadeUp_button;
    private reset_button;
    private chaos_button;
  
    public constructor(canvasElement: string) {
      // Runs a loop based on the browsers refresh speed
      window.requestAnimationFrame(this.loop.bind(this))

      // Gets all the elements for the buttons and saves references to them in variables
      this.widthUp = document.getElementById("increment_width")
      this.widthDown = document.getElementById("decrement_width")
      this.effect1 = document.getElementById("effect1")
      this.effect2 = document.getElementById("effect2")
      this.fadeUp_button = document.getElementById("fade_up")
      this.fadeDown_button = document.getElementById("fade_down")
      this.reset_button = document.getElementById("reset")
      this.chaos_button = document.getElementById("chaos")

      // Gets the canvas element from html (id is passed through constructor)
      this.board = <HTMLCanvasElement> document.getElementById(canvasElement)
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
      this.drawWidth = 3
      // A variable to hold the color
      this.color = {r: 255, g: 255, b: 255}
      // A variable to tell if the 1st effect is active
      this.effect1_active = false;
      // A variable to tell if the 2nd effect is active
      this.effect2_active = false;
      // A variable to tell how often to draw a star
      this.star_delay = Math.round(Math.random() * 2000)
      // A variable to tell how many stars to draw
      this.star_number = 1500
      // How fast the screen fades to black (lower is faster)
      this.fade_rate = 5
      // The count down for when the screen will fade again
      this.fade_count = this.fade_rate

      // Makes the background color of the canvas black
      if (this.ctx) {
        this.ctx.fillStyle = "#000000"
        this.ctx.fillRect(0, 0, this.board.clientWidth, this.board.clientHeight)
      }

      // All the even listeners for the buttons and scrolling
      window.addEventListener("mousemove", this.setMousePos.bind(this));
      this.widthUp?.addEventListener("click", this.upDrawWidth.bind(this))
      this.widthDown?.addEventListener("click", this.downDrawWidth.bind(this))
      window.addEventListener("wheel", this.changeColor.bind(this))
      this.effect1?.addEventListener("click", this.lasers.bind(this))
      this.effect2?.addEventListener("click", this.stars_active.bind(this))
      this.fadeUp_button?.addEventListener("click", this.upFade.bind(this))
      this.fadeDown_button?.addEventListener("click", this.downFade.bind(this))
      this.reset_button?.addEventListener("click", this.reset.bind(this))
      this.chaos_button?.addEventListener("click", this.chaos.bind(this))
    }

    /** The main Loop function that runs over and over calling other methods*/
    public loop(): void {
      this.fadeToBlack()
      this.colorBar()
      this.drawOverCursor()
      if(this.effect2_active) {
        this.stars()
      }
      // Uses recursion to run the loop
      window.requestAnimationFrame(this.loop.bind(this))
    }

    /** Turns on both effects and maxes fade rate */
    public chaos(): void {
      this.effect1_active = true
      this.effect2_active = true
      this.drawWidth += 10000; 
      this.fade_rate = 0
    }

    /** Resets all changable stats to thier original value */
    public reset(): void {
      this.effect1_active = false
      this.effect2_active = false
      this.drawWidth = 3
      this.fade_rate = 5
      if (this.ctx) {
        this.ctx.fillStyle = "#000000"
        this.ctx.fillRect(0, 0, this.board.clientWidth, this.board.clientHeight)
      }
    }

    /**Sets the position of the mouse based on where it is in the browser */
    public setMousePos(event: MouseEvent) :void {
      this.mousePos.x = event.clientX - this.board.offsetLeft
      this.mousePos.y = event.clientY - this.board.offsetTop
    }

    /**Increases the fade rate */
    public upFade(): void {
      if (this.fade_rate < 10)
      this.fade_rate++
      console.log(this.fade_rate)
    } 

    /**Decreases the fade rate */
    public downFade(): void {
      if (this.fade_rate > 0)
      this.fade_rate--
    console.log(this.fade_rate)
    }

    /** Increases the draw width */
    public upDrawWidth(): void {
      this.drawWidth ++
    }

    /** Decreases the draw width */
    public downDrawWidth(): void {
      if(this.drawWidth > 1)
      this.drawWidth --
    }

    /**Changes the color based on the scrolling of the user */
    public changeColor(event: WheelEvent): void {
      //Changes the green color if blue is 0
      if(this.color.g <= 255 && this.color.b == 0) {
        this.color.g += event.deltaY
      }
      if (this.color.g > 255) {
        this.color.g = 255
      }
      if (this.color.g < 200) {
        this.color.g = 200
      }
      // Changes the blue color if green is maxed out and red is 0
      if (this.color.g == 255 && this.color.b <= 255 && this.color.r == 0) {
        this.color.b += event.deltaY
      }
      if (this.color.b > 255) {
        this.color.b = 255
      }
      if (this.color.b < 0) {
        this.color.b = 0
      }

      // Changes the red color if blue is maxed out
      if (this.color.b == 255 && this.color.r <= 255) {
        this.color.r += event.deltaY
      }
      if (this.color.r > 255) {
        this.color.r = 255
      }
      if (this.color.r < 0) {
        this.color.r = 0
      }  
    }
  
    /**Fades the canvas to black */
    private fadeToBlack(): void {
      if (this.fade_count) {
        this.fade_count--
      } else {
        if(this.ctx){
          this.ctx.fillStyle = "#0000000a"
          this.ctx.fillRect(0, 0, this.board.clientWidth, this.board.clientHeight)
        }
        this.fade_count = this.fade_rate
      }
    }

    /**Draws the color bar to the canvas */
    private colorBar(): void {
  
      if (this.ctx) {
        this.ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`
        this.ctx.fillRect(0, 0, this.board.clientWidth, this.board.clientHeight * .05)
      }
    }

    /**Draws the line over the cursor */
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

    /**Draws lasers to the screen instead of the normal draw (Sets width to 10,000) */
    private lasers(): void {
      // console.log(this.effect1_active)
      if (!this.effect1_active) {
        this.drawWidth += 10000;
        this.effect1_active = true;
      } else {
        this.drawWidth -=10000;
        this.effect1_active = false;
      }
    }
  
    /**Draws stars to the canvas */
    private stars(): void {
      if(this.ctx){
        // Sets the fill color
        this.ctx.fillStyle = "#ffffff"
        //Loops through the x and y coords in chuncks of 10
        for (let x = 0; x < this.board.clientWidth; x += 10) {
          for (let y = 20; y < this.board.clientHeight; y += 10) {
            // does't draw a star until star_delay is 0 (Spaces out the stars and makes it seem random so it is not a grid of dots)
            if (this.star_delay) {
              this.star_delay --
            } else {
              // Draws a star and randomizes the time to draw a new star based off of the fadeRate and the number of stars wanted
              this.ctx.fillRect(x, y, 2, 2)
              this.star_delay = Math.round((Math.random() * this.star_number) * (this.fade_rate + 1))
            }
          }
        }
      }
    }

    /**Activates or deactivates the stars accordingly */
    private stars_active(): void {
      if (this.effect2_active) {
        this.effect2_active = false
      } else {
        this.effect2_active = true
      }
    }
  }