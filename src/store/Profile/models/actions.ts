import { UserModel } from "../../../utilities/allModels";

export const EDIT = "EDIT";

interface EditAction{
    type:typeof EDIT,
    payload: UserModel
}

export type ProfileActionTypes = EditAction;