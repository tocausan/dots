import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {LettersService} from './templates/letters.service';
import {AnimationsService} from './templates/animations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LettersService, AnimationsService]
})
export class AppComponent {
  title = 'app';
  animationTime = 100;
  panel = {
    x: 10,
    y: 10
  };
  matrix = [];
  dots = [];

  constructor(public lettersService: LettersService, public animationsService: AnimationsService) {
    this.lettersService = lettersService;
    this.animationsService = animationsService;

    this.animation('heart', 'francescaca');
  }


  animation(name, content) {
    // display matrix
    this.allTrue();

    switch (name) {

      case 'all-true':
        this.allTrue();
        break;

      case 'all-false':
        this.allFalse();
        break;

      case 'blink':
        this.blink();
        break;

      case 'random':
        this.random();
        break;

      case 'appear':
        this.appear();
        break;

      case 'disappear':
        this.disappear();
        break;

      case 'ping':
        this.ping();
        break;

      case 'heart':
        this.heart();
        break;

      case 'text':
        this.text(content);
        break;

    }
  }


  allTrue() {
    this.dots = [];
    for (let i = 0; i < this.panel.y; i++) {
      const line = [];
      for (let j = 0; j < this.panel.x; j++) {
        line.push(true);
      }
      this.dots.push(line);
    }
  }


  allFalse() {
    this.dots = [];
    for (let i = 0; i < this.panel.y; i++) {
      const line = [];
      for (let j = 0; j < this.panel.x; j++) {
        line.push(false);
      }
      this.dots.push(line);
    }
  }


  blink() {
    let status = true;
    setInterval(() => {
      this.dots = [];
      for (let i = 0; i < this.panel.y; i++) {
        const line = [];
        for (let j = 0; j < this.panel.x; j++) {
          line.push(status);
        }
        this.dots.push(line);
      }
      status = !status;
    }, this.animationTime);
  }


  random() {
    setInterval(() => {
      this.allFalse();
      const x = Math.floor(Math.random() * this.panel.x),
        y = Math.floor(Math.random() * this.panel.y);
      this.dots[y][x] = true;
    }, this.animationTime);
  }

  appear() {
    this.allFalse();
    setInterval(() => {
      const x = Math.floor(Math.random() * this.panel.x),
        y = Math.floor(Math.random() * this.panel.y);
      this.dots[y][x] = true;
    }, this.animationTime);
  }

  disappear() {
    this.allTrue();
    setInterval(() => {
      const x = Math.floor(Math.random() * this.panel.x),
        y = Math.floor(Math.random() * this.panel.y);
      this.dots[y][x] = false;
    }, this.animationTime);
  }


  ping() {
    let frame = 0;
    setInterval(() => {
      this.dots = this.animationsService.ping(frame);
      frame++;
    }, this.animationTime);
  }

  heart() {
    let frame = 0;
    setInterval(() => {
      this.dots = this.animationsService.heart(frame);
      frame++;
    }, this.animationTime);
  }


  text(content) {
    // set matrix
    this.matrix = this.lettersService.setMatrix(this.panel, content);

    let translationX = -this.panel.x;
    setInterval(() => {
      for (let i = 0; i < this.matrix.length; i++) {
        for (let j = 0; j < this.matrix[i].length; j++) {
          const x = translationX + j;
          this.dots[i][j] = this.matrix[i][x];
        }
      }
      translationX = translationX < this.matrix[0].length ? translationX + 1 : -this.panel.x;
    }, this.animationTime);
  }


}
