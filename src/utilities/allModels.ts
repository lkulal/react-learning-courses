export interface Course{
    id: string,
    courseCreator: string,
    courseDescription: string,
    discount: number,
    discountValidTill: string,
    price: number,
    tags: Array<string>,
    title: string,
    cart:boolean,
    wishlist:boolean
}

export interface NotificationModel{
    type:boolean,
    message:string,
    errMessage:string,
    show:boolean
}

export interface UserModel{
    id:string,
    firstName: string,
    displayName: string,
    roleText: string,
    aboutYourself: string,
    experience: string,
    areasOfInterest: Array<string>,
    isProfessional: boolean,
    expertise: string,
    lastName: string
}