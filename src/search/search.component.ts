import { Component, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { SearchInputComponent } from './search-input.component';
import { SearchResult } from './search-result.component';
import { TVMaze, SubscribeService } from '../lib/providers';

@Component({
    selector: 'search-show',
    template: `
        <search-input (searchChange)="onSearch($event)"></search-input>
        <search-result [resultStream]="searchResultStream" (subscribe)="onSubscribeShow($event)"></search-result>
    `,
    directives: [ SearchInputComponent, SearchResult ],
    changeDetection: ChangeDetectionStrategy.Detached
})
class SearchComponent {
    tvMaze: TVMaze;
    service: SubscribeService;
    router: Router;
    searchEmitter = new EventEmitter<string>();
    searchResultStream;

    constructor(tvMaze: TVMaze, router: Router, service: SubscribeService) {
        this.tvMaze = tvMaze;
        this.service = service;
        this.router = router;
        this.bindSearchEvent();
    }

    onSearch(term) {
        this.searchEmitter.emit(term);
    }

    onSubscribeShow(show) {
        this.service.subscribeShow(show.id)
            .then(() => this.router.navigate(['UpcomingShows']));
    }

    bindSearchEvent() {
        this.searchResultStream = this.searchEmitter
            .filter(term => term.length >= 2)
            .debounceTime(500)
            .switchMap(term => this.tvMaze.searchShow(term));
    }

}

export default SearchComponent;
export { SearchComponent };
