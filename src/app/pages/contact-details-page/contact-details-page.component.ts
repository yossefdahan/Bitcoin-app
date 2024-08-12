import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'contact-details-page',
  templateUrl: './contact-details-page.component.html',
  styleUrl: './contact-details-page.component.scss'
})
export class ContactDetailsPageComponent implements OnInit {
  private contactService = inject(ContactService)
  contact: Contact | null = null
  contactId: string = '5a56640269f443a5d64b32ca'

  ngOnInit(): void {
    this.contactService.getContactById(this.contactId).subscribe({
      next: (contact) => {
        this.contact = contact;
      },
      error: (err) => {
        console.error('Error fetching contact:', err);
      }
    });
  }
}
