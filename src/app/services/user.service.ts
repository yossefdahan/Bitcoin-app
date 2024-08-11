import { Injectable } from "@angular/core";
import { User } from "../models/user.model";


@Injectable({
    providedIn: 'root'

})

export class UserService {
    user: User = {
        name: "yossef Dahan",
        coins: 100,
        moves: []
    }

    getUser(): User {
        return this.user
    }

}