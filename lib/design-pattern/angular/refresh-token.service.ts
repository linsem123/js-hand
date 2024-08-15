import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {
  private refreshTokenInterval: number = 40 * 60 * 1000; // 40 minutes in milliseconds
  private refreshTokenTimer: Subscription;
  private lastRefreshTimeKey: string = 'lastRefreshTime';

  constructor(private http: HttpClient) {
    this.initializeTimer();
  }

  private initializeTimer() {
    const lastRefreshTime = localStorage.getItem(this.lastRefreshTimeKey);
    if (lastRefreshTime) {
      const elapsedTime = Date.now() - parseInt(lastRefreshTime, 10);
      const remainingTime = this.refreshTokenInterval - elapsedTime;

      if (remainingTime > 0) {
        this.startTimer(remainingTime);
      } else {
        this.sendRefreshTokenRequest();
        this.startTimer(this.refreshTokenInterval);
      }
    } else {
      this.startTimer(this.refreshTokenInterval);
    }
  }

  private startTimer(duration: number) {
    this.refreshTokenTimer = interval(duration).subscribe(() => {
      this.sendRefreshTokenRequest();
      this.startTimer(this.refreshTokenInterval);
    });
  }

  private sendRefreshTokenRequest() {
    this.http.post('/api/refresh-token', {}).subscribe(response => {
      console.log('Refresh token API called');
      localStorage.setItem(this.lastRefreshTimeKey, Date.now().toString());
    });
  }

  public resetTimer() {
    if (this.refreshTokenTimer) {
      this.refreshTokenTimer.unsubscribe();
    }
    this.startTimer(this.refreshTokenInterval);
  }
}
