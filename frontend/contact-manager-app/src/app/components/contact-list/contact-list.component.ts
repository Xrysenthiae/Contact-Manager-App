import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  contacts = [
    { name: 'John Doe', email: 'johndoe@gmail.com', phone: '123-456-7890' },
    { name: 'Jane Smith', email: 'janesmith@gmail.com', phone: '987-654-3210' }
  ];
}
