import { Action } from "history";
import { UserModel } from "../../utilities/allModels";
import { EDIT, ProfileActionTypes } from "./models/actions";

const initialValues: UserModel = {
    "id": "G8oCAXWM1FZL8xLOlQS3",
    "firstName": "Likhith",
    "displayName": "luciferRK",
    "roleText": "UI developer",
    "aboutYourself": "Simple guy interested in learning and breaking things",
    "experience": "1",
    "areasOfInterest": [
        "1",
        "2"
    ],
    "isProfessional": true,
    "expertise": "1",
    "lastName": "Kulal"
}

export const ProfileReducer = 
(state = initialValues, action: ProfileActionTypes): UserModel =>{
    switch(action.type){
        case EDIT:
            return action.payload;
        default:
            return state;
    }
}