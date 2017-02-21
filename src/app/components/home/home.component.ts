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
    this.createCanvasElement();
    this.createRootNode()
  }

  public createCircles(count){
    this.circles = [];
    for (var i = 0; i < count; i++) {
      var x = 50 + i * 100;
      var y = 25 + i * 4;
      var r = 20  + Math.random() * 6;    
      if(x > 1180){
        x = ((count - i) % 10) * 100;
        y = (25 + i * 4) + 400
      }
      console.log(x + '---' + y + '----' + r)
      this.circles.push({x, y, r});
    }
  }

  public drawCircles(){
    let count = this.circles.length;
    let canvas = document.getElementById('myCanvas');
    let context = canvas.getContext('2d');
    for (let i = 0; i < count; i++) {
      context.beginPath();
      context.arc(this.circles[i].x, this.circles[i].y, this.circles[i].r, 0, 6.282);
      var color = (i.toString().length > 1) ? '#4' : '#4A'
      console.log(color.toString() + i)
      context.fillStyle = color + i;
      context.fill();
       let radius = 70;
       context.fillStyle = '#fff';
      let font = "bold " + 12 +"px serif";
      context.font = font;
      context.textBaseline = "top";
      context.fillText(this.graph.stringText[i], (this.circles[i].x - radius/4) + 15, (this.circles[i].y - radius/2) + 30);
      this.drawLine((canvas.width / 2 - 70/4) - 30 , (canvas.height / 2 - 70/2) + 30, (this.circles[i].x - 70/4) + 15, (this.circles[i].y - 70/2) + 30);
    }
  }

  public drawLine(center1_x, center1_y, center2_x, center2_y) {
      var canvas = document.getElementById('myCanvas');
      var context = canvas.getContext('2d');
      context.beginPath();
      context.moveTo(center1_x, center1_y);
      context.lineTo(center2_x, center2_y);
      context.stroke();
  }
        

  public createRootNode(){
      let canvas = document.getElementById('myCanvas');
      let context = canvas.getContext('2d');
      let centerX = canvas.width / 2;
      let centerY = canvas.height / 2;
      let radius = 70;
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'yellow';
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

  public createCanvasElement(){
    if(document.getElementById('myCanvas')){
      document.getElementById('myCanvas').remove();
    }
    let container = document.getElementById('canvas-container')
    let canvas = document.createElement('canvas');
    canvas.id = "myCanvas";
    canvas.width = 1200;
    canvas.height = 600;
    container.appendChild(canvas)
  }

  public handleNameNode() {
    this.createRootNode()
  }

   public handleTextNode(event) {
      var canvas = document.getElementById('myCanvas');
      var context = canvas.getContext('2d');
      this.createCircles(this.graph.stringText.length);
      this.createCanvasElement();
      this.createRootNode();
      this.drawCircles();
  }
}
