import { Injectable } from '@angular/core';

interface GuardState {
    state: any;
    title: string;
    url: string;
}

@Injectable({
  providedIn: 'root',
})
export class HistoryGuardService {
  private guardRouter: string;
  private guardSize = -1;
  private preRouter: string;
  private gaurdState: GuardState;

  constructor() {}

  public setRouterGuard(guardState: GuardState): void {
    if (!!this.guardRouter) return;
    this.guardRouter = guardState.url;
    this.preRouter = guardState.url;
    this.gaurdState = {
        state: guardState.state,
        title: guardState.title,
        url: guardState.url
    }
  }

  public pushGuard(): void {
    if (!this.guardRouter) return;
    const { state, title, url } = this.gaurdState;
    history.pushState(state, title, url);
  }

  public pushState(guardState: GuardState): void {
    this.preRouter = guardState.url;
    if (this.isGuardRouter(guardState.url)) {
        this.addGuardSize();
    }
    history.pushState(guardState.state, guardState.title, guardState.url);
  }

  public replaceState(guardState: GuardState): void {
    if (this.isGuardRouter(guardState.url)) {
        this.reduceGuardSize();
    }
    history.replaceState(guardState.state, guardState.title, guardState.url);
  }

  public guardNow(): boolean {
    return this.guardSize <= 0 && this.preRouter === this.guardRouter;
  }

  private addGuardSize(): void {
    this.guardSize++;
  }

  private reduceGuardSize(): void {
    this.guardSize--;
  }

  private isGuardRouter(url: string): boolean {
    return url === this.guardRouter;
  }
}