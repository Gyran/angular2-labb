import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NextEpisodePipe } from './next-episode.pipe';
import { LazyLoadImageDirective } from '../directive/lazy-load-image.directive';

@Component({
    selector: 'show',
    styles: [`
        img {
            margin: 0 10px 10px 0;
        }
    `],
    template: `
        <img
            src="https://www.placecage.com/210/295"
            [lazyLoad]="show.image?.medium"
            [alt]="show.name"
            class="img-rounded" />
        <div class="show-information">
            <h3>{{show.name}}</h3>
            <p>Next episode: {{ show.episodes | nextEpisode }}</p>
            <div [innerHTML]="show.summary"></div>
            <button type="button" class="btn btn-danger" (click)="onUnsubscribe()">Unsubscribe</button>
        </div>
    `,
    pipes: [ NextEpisodePipe ],
    directives: [ LazyLoadImageDirective ],
    changeDetection: ChangeDetectionStrategy.Detached
})
class ShowComponent {
    @Input() show;
    @Output() unsubscribe = new EventEmitter();

    onUnsubscribe() {
        this.unsubscribe.emit(this.show);
    }
}

export default ShowComponent;
export { ShowComponent };
