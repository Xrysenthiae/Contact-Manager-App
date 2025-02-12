import { Injectable } from '@angular/core';
import axios from 'axios';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'http://localhost:8000/api/contacts';

  constructor(private authService: AuthService) {}

  async getContacts() {
    const token = this.authService.getToken();
    const response = await axios.get(this.apiUrl, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  }

  async addContact(contact: any) {
    const token = this.authService.getToken();
    await axios.post(this.apiUrl, contact, { headers: { Authorization: `Bearer ${token}` } });
  }

  async updateContact(id: string, contact: any) {
    const token = this.authService.getToken();
    await axios.put(`${this.apiUrl}/${id}`, contact, { headers: { Authorization: `Bearer ${token}` } });
  }

  async deleteContact(id: string) {
    const token = this.authService.getToken();
    await axios.delete(`${this.apiUrl}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  }
}
