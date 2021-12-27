import { Injectable } from '@angular/core';

const TOKEN = 'auth-token'
@Injectable({
  providedIn: 'root'
})
export class JwtService {

  getToken() {
    return window.localStorage.getItem(TOKEN);
  }

  saveToken(token: string) {
    window.localStorage.setItem(TOKEN, token);
  }

  removeToken() {
    window.localStorage.removeItem(TOKEN);
  }
}
