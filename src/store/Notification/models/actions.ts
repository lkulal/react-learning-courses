import { NotificationModel } from "../../../utilities/allModels";

export const SHOW = "SHOW";
export const HIDE = "HIDE";

interface ShowAction{
    type:typeof SHOW,
    payload:NotificationModel
};

interface HideAction{
    type:typeof HIDE
}

export type NotificationActionTypes = ShowAction | HideAction;