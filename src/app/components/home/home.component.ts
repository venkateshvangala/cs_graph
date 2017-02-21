import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.service';
@Component({
  selector: 'home',
  providers: [ ],
  styleUrls: [ './home.component.scss' ],
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  public graph = { name: 'string', stringText: '' };
  public circles = [];
  constructor( public appState: AppState) {}

  public ngOnInit() {
    console.log('Successfully rendered home page');
    this.createRootNode()
  }

  public createCircles(count){
    this.circles = [];
    for (let i = 0; i < count; i++) {
      let x = 5+ Math.random() * 300;
      let y = 5+ Math.random() * 300;
      let r = 20  + Math.random() * 6;    
      this.circles.push({x, y, r});
    }
  }

  public drawCircles(){
    let count = this.circles.length;
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = '#4A8';
    for (let i=0; i < count; i++) {
      ctx.beginPath();
      ctx.arc(this.circles[i].x, this.circles[i].y, this.circles[i].r, 0, 6.282);
      ctx.fill();
    }
  }

  public createRootNode(){
    var canvas = document.getElementById('myCanvas');
      var context = canvas.getContext('2d');
      var centerX = canvas.width / 2;
      var centerY = canvas.height / 2;
      var radius = 70;

      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'green';
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = '#003300';
      context.stroke();
      context.fillStyle = "#333";  
      let font = "bold " + 12 +"px serif";
      context.font = font;
      context.textBaseline = "top";
      context.fillText(this.graph.name, (centerX-radius/4) - 30 , (centerY-radius/2) + 30);

}

  public handleNameNode(event) {
    this.createRootNode()
  }

   public handleTextNode(event) {
    console.log(this.graph.stringText);
    this.createCircles(4);
    this.drawCircles();
  }
}
