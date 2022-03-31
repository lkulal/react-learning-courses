import { NotificationModel } from "../../utilities/allModels"
import { HIDE, NotificationActionTypes, SHOW } from "./models/actions"

const defaultValue: NotificationModel = {
    type: false,
    message: "",
    errMessage: "",
    show: false
}

export const NotificationReducer =
(state=defaultValue,action:NotificationActionTypes) =>{
    switch(action.type){
        case SHOW:
            return action.payload;
        case HIDE:
            return {
                type: false,
                message: "",
                errMessage: "",
                show: false
            };
        default:
            return state;
    }
}