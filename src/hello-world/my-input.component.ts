import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'city-dropdown',
    template: `
        <select (change)="cityChange.next($event.target.value)" value="{{city}}">
            <option value=""></option>
            <option value="Ankarsrum">Ankarsrum</option>
            <option value="Västervik">Västervik</option>
            <option value="Stockholm">Stockholm</option>
        </select>
    `
})
class CityComponent {
    @Input() city;
    @Output() cityChange = new EventEmitter();

    onChange(event) {
      this.cityChange.next(event.target.value);
    }
}

@Component({
    selector: 'my-input',
    template: `
        <button (click)="onClick()">Random Number</button>
        <button (click)="onShowClick()">Show text!</button>
        <input [(ngModel)]="username">
        {{randomNumber}}
        {{username}}
        {{showUsername}}

        <br>
        <h2>City</h2>
        <city-dropdown (cityChange)="cityChange($event)" city="Västervik"></city-dropdown>
        {{city}}

        <br>
        <h2>local view variables</h2>
        <br><h3>1</h3>
        <input #myInput1 (keyup)='undefined'>
        {{myInput1.value}}
        <br><h3>2</h3>
        <input #myInput2>
        {{myInput2.value}}

    `,
    directives: [CityComponent],
    providers: []
})
class MyInputComponent {
    username = 'Jesse';
    randomNumber = 5; // used a dice
    showUsername = '';
    city = '';

    onClick(event) {
      this.randomNumber = Math.random() * 10;
    }

    onShowClick(event) {
      this.showUsername = this.username;
    }

    cityChange(city) {
      this.city = city;
    }
}

export default MyInputComponent;
export { MyInputComponent };
