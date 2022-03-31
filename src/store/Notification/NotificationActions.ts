import { NotificationModel } from "../../utilities/allModels";
import { HIDE, SHOW } from "./models/actions";

export const ShowNotification = (info:NotificationModel) =>({
    type:SHOW,
    payload:info
});

export const HideNotification = () =>({
    type:HIDE
});