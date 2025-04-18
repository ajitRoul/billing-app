import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router, private http: HttpClient, private utilService: UtilService) {
    // You might load authentication state from local storage or a cookie here
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      if (new Date(userData.endDate) > new Date()) {
        // localStorage.removeItem('user');
        this.isAuthenticatedSubject.next(true); // Set initial state based on token presence
      } else {
        this.isAuthenticatedSubject.next(false);
      }
    } else {
      this.isAuthenticatedSubject.next(false); // Set initial state based on token presence
    }
    // this.isAuthenticatedSubject.next(false); 
  }

  login(formVal: any): void {
    const { companyId, username, password } = formVal;
    const URL = `https://gist.githubusercontent.com/ajitRoul/${companyId}/raw/${username}.json`;
    this.utilService.showLoader();
    this.http.get(URL).subscribe({
      next: (response: any) => {

        if (response.secret === password && new Date(response.endDate) > new Date()) {
          const user = response;
          localStorage.setItem('user', JSON.stringify(user));
          this.isAuthenticatedSubject.next(true);
          this.router.navigate(['/home']); // Redirect after successful login
          // Redirect to home or perform any other action
        } else {
          console.error('Invalid credentials');
        }
        this.utilService.hideLoader();
      },
      error: (error: any) => {
        this.utilService.hideLoader();
        console.error('Login failed', error);
      }
    });


  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']); // Redirect after logout
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}