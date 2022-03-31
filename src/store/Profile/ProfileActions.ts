import { UserModel } from "../../utilities/allModels";
import { EDIT } from "./models/actions";

export const ProfileEdit = (user:UserModel) => ({
    type: EDIT,
    payload: user
});