import { ADD_CART, ADD_WISH, CLR_CART, REM_CART, REM_WISH, SORT } from "./models/actions";

export const CourseAddCart = (id:string) =>({
    type:ADD_CART,
    payload:id
});
export const CourseAddWishlist = (id:string) =>({
    type:ADD_WISH,
    payload:id
});
export const CourseRemoveCart = (id:string) =>({
    type:REM_CART,
    payload:id
});
export const CourseRemoveWishlist = (id:string) =>({
    type:REM_WISH,
    payload:id
});
export const CourseClearCart = () =>({
    type:CLR_CART
});
export const CourseSort = (sort:number) => ({
    type: SORT,
    payload: sort
});