import { Injectable } from '@angular/core';
import { Router, NavigationStart, Event } from '@angular/router';
import { LocationStrategy } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class HistoryManagerService {
  private backStack: string[] = [];
  private forwardStack: string[] = [];
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
    if (this.navigationDirection !== 'back') {
      this.backStack.push(url);
      this.forwardStack = []; // Clear forward stack when navigating not from 'back'
    }
    this.navigationDirection = 'none'; // Reset navigation direction after updating history
  }

  private detectDirection() {
    const currentUrl = window.location.href;
    if (this.backStack.length > 1 && this.backStack[this.backStack.length - 2] === currentUrl) {
      this.navigationDirection = 'back';
      this.forwardStack.push(this.backStack.pop());
    } else if (this.forwardStack.length > 0 && this.forwardStack[this.forwardStack.length - 1] === currentUrl) {
      this.navigationDirection = 'forward';
      this.backStack.push(this.forwardStack.pop());
    } else {
      this.navigationDirection = 'none';
      this.updateHistory(currentUrl);
    }
  }

  public getNavigationDirection(): 'forward' | 'back' | 'none' {
    return this.navigationDirection;
  }

  public isFirstHistoryRecord(): boolean {
    return this.backStack.length === 1;
  }
}