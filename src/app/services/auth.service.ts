import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  public httpClient = inject(HttpClient);
  isLoggedIn: boolean = false;
  public login(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    return this.httpClient
      .get<any>('http://localhost:5000/login', { headers })
      .pipe(
        map((response: any) => {
          const isValid =
            response.username === username && response.password === password;
          this.isLoggedIn = isValid;
          if (isValid) {
            localStorage.setItem('isLoggedIn', 'true');
          }
          return isValid;
        }),
        catchError((error) => {
          console.error('Login failed', error);
          this.isLoggedIn = false;
          return of(false);
        })
      );
  }

  validateResponse() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get('http://localhost:5000/validate', { headers });
  }

  transactionData() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get('http://localhost:5000/transaction-history', {
      headers,
    });
  }

  sendMoneyToServer(transactionData: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    return this.httpClient.post(
      'http://localhost:5000/transaction-history',
      transactionData,
      {
        headers,
      }
    );
  }
}
