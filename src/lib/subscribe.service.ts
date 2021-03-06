import { Injectable } from '@angular/core';
import { Show } from './contracts/show';
import { Storage } from './storage/storage';
import { TVMaze } from './tv-maze';

const STORAGE_KEY = 'subscribed-shows';

@Injectable()
class SubscribeService {
    storage: Storage<Show[]>;
    tvMaze: TVMaze;

    constructor(storage: Storage<Show[]>, tvMaze: TVMaze) {
        this.storage = storage;
        this.tvMaze = tvMaze;
    }

    getAllSubscribeShows(): Promise<Show[]> {
        return this.storage.get(STORAGE_KEY);
    }

    subscribeShow(showId: number): Promise<void> {
        const fetchShow = this.tvMaze
            .getShow(showId)
            .toPromise();
        const fetchSubscribedShows = this.storage
            .get(STORAGE_KEY)
            .then(shows => Array.isArray(shows) ? shows : []);

        return Promise.all<any>([fetchShow, fetchSubscribedShows])
            .then(([show, shows]) => {
                if (!shows.find(s => s.id === show.id)) {
                    shows.push(show);
                    return this.storage.set(STORAGE_KEY, shows);
                }
            });
    }

    unSubscribeShow(show: Show): Promise<void> {
        return this.storage.get(STORAGE_KEY)
            .then(shows => {
                if (!Array.isArray(shows)) {
                    return;
                }
                const newShowList = shows.filter(s => s.id !== show.id);
                this.storage.set(STORAGE_KEY, newShowList);
            });
    }
}

export { SubscribeService };
export default SubscribeService;
