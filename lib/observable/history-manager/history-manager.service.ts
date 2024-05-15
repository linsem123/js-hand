import { Injectable } from '@angular/core';
import { Router, NavigationStart, Event } from '@angular/router';
import { LocationStrategy } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class HistoryManagerService {
  private history: string[] = [];
  private historyIndex: number = -1;
  private navigationDirection: 'forward' | 'back' | 'none' = 'none';

  constructor(
    private router: Router,
    private locationStrategy: LocationStrategy
  ) {
    // Subscribe to router events
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.updateHistory(window.location.href);
      }
    });

    // Detect browser back/forward button clicks using LocationStrategy
    this.locationStrategy.onPopState(() => {
      this.detectDirection();
    });
  }

  private updateHistory(url: string) {
    if (this.historyIndex === -1 || this.history[this.historyIndex] !== url) {
      this.history = this.history.slice(0, this.historyIndex + 1);
      this.history.push(url);
      this.historyIndex++;
      this.navigationDirection = 'forward';
    }
  }

  private detectDirection() {
    const currentUrl = window.location.href;
    let index = -1;
    for (let i = this.history.length - 1; i >= 0; i--) {
      if (this.history[i] === currentUrl) {
        index = i;
        break;
      }
    }

    if (index !== -1) {
      if (index < this.historyIndex) {
        this.navigationDirection = 'back';
      } else if (index > this.historyIndex) {
        this.navigationDirection = 'forward';
      }
      this.historyIndex = index;
    } else {
      this.navigationDirection = 'none';
      this.updateHistory(currentUrl);
    }
  }

  public getNavigationDirection(): 'forward' | 'back' | 'none' {
    return this.navigationDirection;
  }

  public isFirstHistoryRecord(): boolean {
    return this.historyIndex === 0;
  }
}
