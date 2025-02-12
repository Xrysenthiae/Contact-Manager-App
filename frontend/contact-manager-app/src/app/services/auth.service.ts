import { Injectable } from '@angular/core';
import axios from 'axios';
import { jwtDecode } from "c:/Users/Asus/Desktop/Hariette/4TH YEAR/OJT/GIT REPO/Contact-Manager-App/node_modules/jwt-decode/build/esm/index";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/auth';

  async login(email: string, password: string) {
    const response = await axios.post(`${this.apiUrl}/login`, { email, password });
    localStorage.setItem('token', response.data.token);
  }

  async register(name: string, email: string, password: string) {
    await axios.post(`${this.apiUrl}/register`, { name, email, password });
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    const token = this.getToken();
    return token ? true : false;
  }

  getUser() {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }
}
