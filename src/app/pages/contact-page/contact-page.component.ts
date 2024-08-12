import { Component, inject, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent implements OnInit {
  contactService = inject(ContactService);
  contacts$: Observable<Contact[]> = this.contactService.contacts$;

  ngOnInit(): void {
    this.contactService.loadContacts().subscribe({
      next: () => {
        console.log('Contacts loaded successfully');
      },
      error: (err) => {
        console.error('Error fetching contacts:', err);
      }
    });
  }
}