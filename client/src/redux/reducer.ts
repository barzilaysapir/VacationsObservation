import { AppState } from "./app-state";
import { ActionType } from "./action-type";
import { Action } from "./action";

export function reduce(oldAppState: AppState, action: Action): AppState {
    const newAppState = { ...oldAppState };
    let vacations;

    switch (action.type) {
        // Vacations lists
        case ActionType.GetVacationsList:
            newAppState.vacations = action.payload;
            break;

        // Modal triggers
        case ActionType.GuestTryToFollowVacation:
            newAppState.guestTryToFollow = action.payload;
            break;
        case ActionType.ShowLoginModal:
            newAppState.showLoginModal = action.payload;
            break;

        // Login / logout
        case ActionType.SetSocket:
            newAppState.socket = action.payload;
            break;
        case ActionType.Login:
            newAppState.loggedIn = true;
            break;
        case ActionType.Logout:
            newAppState.loggedIn = false;
            break;

        // ADMIN
        case ActionType.AddNewVacation:
            newAppState.vacations.push(action.payload);
            break;

        case ActionType.DeleteVacation:
            vacations = newAppState.vacations;
            let deletedVacationId = action.payload;

            for (let i = 0; i < vacations.length; i++) {
                vacations[i].id === +deletedVacationId && (vacations.splice(i, 1));
            }
            break;

        case ActionType.EditVacation:
            vacations = newAppState.vacations;
            let editedVacation = action.payload;

            for (let i = 0; i < vacations.length; i++) {
                if (vacations[i].id === editedVacation.id) {
                    editedVacation.isFollowed = vacations[i].isFollowed;
                    editedVacation.amountOfFollowers = vacations[i].amountOfFollowers;
                    vacations.splice(i, 1, editedVacation);
                }
            }
            break;
     
        case ActionType.EditingVacation:
            newAppState.movedToEdit = true;
            break;
            
        case ActionType.ClearEditVacationForm:
            newAppState.movedToEdit = false;
            break;

        case ActionType.GetVacationDetails:
            newAppState.vacationDetails = action.payload;
            break;
    }

    return newAppState;
}
