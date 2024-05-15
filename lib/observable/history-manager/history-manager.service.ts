import { Injectable } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { LocationStrategy, PopStateEvent } from "@angular/common";

@Injectable({
    providedIn: "root",
})
export class HistoryManagerService {
    private history: string[] = [];
    private historyIndex: number = -1;
    private navigationDirection: "forward" | "back" | "none" = "none";

    constructor(
        private router: Router,
        private locationStrategy: LocationStrategy
    ) {
        // Subscribe to router events
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.updateHistory(event.url);
            }
        });

        // Detect browser back/forward button clicks using LocationStrategy
        this.locationStrategy.onPopState((event: PopStateEvent) => {
            this.detectDirection();
        });
    }

    private updateHistory(url: string) {
        if (this.historyIndex === -1 || this.history[this.historyIndex] !== url) {
            this.history = this.history.slice(0, this.historyIndex + 1);
            this.history.push(url);
            this.historyIndex++;
            this.navigationDirection = "forward";
        }
    }

    private detectDirection() {
        const currentUrl = this.router.url;
        const index = this.history.indexOf(currentUrl);

        if (index !== -1) {
            if (index < this.historyIndex) {
                this.navigationDirection = "back";
            } else if (index > this.historyIndex) {
                this.navigationDirection = "forward";
            }
            this.historyIndex = index;
        } else {
            this.navigationDirection = "none";
        }
    }

    public getNavigationDirection(): "forward" | "back" | "none" {
        return this.navigationDirection;
    }

    public pushState(url: string, title: string = "", state: any = {}) {
        this.history.push(url);
        this.historyIndex = this.history.length - 1;
        window.history.pushState(state, title, url);
        this.navigationDirection = "forward";
    }

    public replaceState(url: string, title: string = "", state: any = {}) {
        this.history[this.historyIndex] = url;
        window.history.replaceState(state, title, url);
    }
}
