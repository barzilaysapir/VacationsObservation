import { Vacation } from "../Models/Vacation";

export class AppState {
    public vacations: Vacation[] = [];
    public newVacation: any;

    public guestTryToFollow: boolean = false;
    public showLoginModal: boolean = true;
    public loggedIn: boolean = false;
    public socket: any;

    public vacationDetails: Vacation;
    public movedToEdit: boolean = false;
}
