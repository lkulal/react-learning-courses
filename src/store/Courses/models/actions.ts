export const ADD_CART = "ADD_CART";
export const ADD_WISH = "ADD_WISH";
export const REM_CART = "REM_CART";
export const REM_WISH = "REM_WISH";
export const CLR_CART = "CLEAR_CART";
export const SORT = "SORT";

interface AddCartAction{
    type: typeof ADD_CART,
    payload:string
}
interface AddWishAction{
    type: typeof ADD_WISH,
    payload:string
}
interface RemoveCartAction{
    type: typeof REM_CART,
    payload:string
}
interface RemoveWishAction{
    type: typeof REM_WISH,
    payload:string
}
interface ClearCartAction{
    type: typeof CLR_CART
}
interface SortAction{
    type: typeof SORT,
    payload:number
}

export type CoursesActionTypes = AddCartAction | AddWishAction | RemoveCartAction | RemoveWishAction | ClearCartAction | SortAction;