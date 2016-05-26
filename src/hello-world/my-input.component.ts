import { Component } from '@angular/core';

@Component({
    selector: 'my-input',
    template: `
        <button (click)="onClick()">Random Number</button>
        <button (click)="onShowClick()">Show text!</button>
        <input [(ngModel)]="username">
        {{randomNumber}}
        {{username}}
        {{showUsername}}
    `,
    directives: [],
    providers: []
})
class MyInputComponent {
    username = 'Jesse';
    randomNumber = 5; // used a dice
    showUsername = '';

    onClick(event) {
      this.randomNumber = Math.random() * 10;
    }

    onShowClick(event) {
      this.showUsername = this.username;
    }
}

export default MyInputComponent;
export { MyInputComponent };
