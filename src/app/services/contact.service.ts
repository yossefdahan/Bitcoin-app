import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, from, tap, retry, catchError } from 'rxjs';
import { Contact } from '../models/contact.model';
import { storageService } from './async-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ContactFilter } from '../models/contact.filter';

const ENTITY = 'contacts';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    private _contacts$ = new BehaviorSubject<Contact[]>([]);
    public contacts$ = this._contacts$.asObservable();

    private _contactFilter$ = new BehaviorSubject<ContactFilter>({ term: '' });
    public contactFilter$ = this._contactFilter$.asObservable();

    constructor() {
        const contacts = JSON.parse(localStorage.getItem(ENTITY) || 'null');
        if (!contacts || contacts.length === 0) {
            localStorage.setItem(ENTITY, JSON.stringify(this._createContacts()));
        }
    }

    public loadContacts() {
        const filterBy = this._contactFilter$.value;
        return from(storageService.query<Contact>(ENTITY))
            .pipe(
                tap(contacts => {
                    if (filterBy && filterBy.term) {
                        contacts = this._filter(contacts, filterBy.term);


                    }
                    this._contacts$.next(this._sort(contacts));
                }),
                retry(1),
                catchError(this._handleError)
            );
    }

    public setContactFilter(contactFilter: ContactFilter) {
        this._contactFilter$.next(contactFilter);
        this.loadContacts().subscribe()
        console.log('contactFilter service:', contactFilter);

    }

    public getContactById(id: string): Observable<Contact> {
        return from(storageService.get<Contact>(ENTITY, id))
            .pipe(catchError(err => throwError(() => `Contact id ${id} not found!`)));
    }

    public deleteContact(id: string) {
        return from(storageService.remove(ENTITY, id))
            .pipe(
                tap(() => {
                    let contacts = this._contacts$.value;
                    contacts = contacts.filter(contact => contact._id !== id);
                    this._contacts$.next(contacts);
                }),
                retry(1),
                catchError(this._handleError)
            );
    }

    public saveContact(contact: Contact) {
        return contact._id ? this._updateContact(contact) : this._addContact(contact);
    }

    public getEmptyContact() {
        return {
            name: '',
            email: '',
            phone: ''
        };
    }

    private _updateContact(contact: Contact) {
        return from(storageService.put<Contact>(ENTITY, contact))
            .pipe(
                tap(updatedContact => {
                    const contacts = this._contacts$.value;
                    this._contacts$.next(contacts.map(c => c._id === updatedContact._id ? updatedContact : c));
                }),
                retry(1),
                catchError(this._handleError)
            );
    }

    private _addContact(contact: Contact) {
        return from(storageService.post<Contact>(ENTITY, contact))
            .pipe(
                tap(newContact => {
                    const contacts = this._contacts$.value;
                    this._contacts$.next([...contacts, newContact]);
                }),
                retry(1),
                catchError(this._handleError)
            );
    }

    private _sort(contacts: Contact[]): Contact[] {
        return contacts.sort((a, b) => {
            if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
                return -1;
            }
            if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
                return 1;
            }
            return 0;
        });
    }

    private _filter(contacts: Contact[], term: string) {
        term = term.toLocaleLowerCase();
        return contacts.filter(contact => {
            return contact.name.toLocaleLowerCase().includes(term) ||
                contact.phone.toLocaleLowerCase().includes(term) ||
                contact.email.toLocaleLowerCase().includes(term);
        });
    }

    private _createContacts() {
        const contacts = [
            {
                "_id": "5a56640269f443a5d64b32ca",
                "name": "Ochoa Hyde",
                "email": "ochoahyde@renovize.com",
                "phone": "+1 (968) 593-3824"
            },
            // Other contacts...
        ];
        return contacts;
    }

    private _handleError(err: HttpErrorResponse) {
        console.log('err:', err);
        return throwError(() => err);
    }
}

function _getRandomId(length = 8): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
