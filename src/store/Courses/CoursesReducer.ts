import { Course } from "../../utilities/allModels";
import { ADD_CART, ADD_WISH, REM_CART, REM_WISH, CoursesActionTypes, CLR_CART, SORT } from "./models/actions";

const initialValues:Array<Course> = 
[
    {
        "id": "3x0CTgf7UMzmfmbt5U5i",
        "courseCreator": "Nick Fury",
        "courseDescription": "This is a starter course for shield handling",
        "discount": 10,
        "discountValidTill": "2021-08-15T01:39:00.000Z",
        "price": 10000,
        "tags": [
            "world saving"
        ],
        "title": "Shield",
        "cart":false,
        "wishlist":false
    },
    {
        "id": "FqPHRq9GVkZyoBUm6RWe",
        "courseCreator": "Loki",
        "courseDescription": "He is adopted",
        "discount": 7,
        "discountValidTill": "2021-07-30T05:30:00.000Z",
        "price": 1400,
        "tags": [
            "mischief"
        ],
        "title": "How to annoy your brother",
        "cart":false,
        "wishlist":true
    },
    {
        "id": "FqPHRq21svdagt416RWe",
        "courseCreator": "Thor",
        "courseDescription": "Became lazy after losing with thanos",
        "discount": 8,
        "discountValidTill": "2021-08-30T12:30:00.000Z",
        "price": 1000,
        "tags": [
            "lazy",
            "thunder"
        ],
        "title": "How to become fat",
        "cart":false,
        "wishlist":false
    },
    {
        "id": "FqPavdyhs657bjam6RWe",
        "courseCreator": "Pepper Potts",
        "courseDescription": "Personal secretory of Tony Stark, Later owns Stark Industries",
        "discount": 10,
        "discountValidTill": "2021-07-26T09:40:00.000Z",
        "price": 3000,
        "tags": [
            "hard work",
            "dedication"
        ],
        "title": "How to be best secretary",
        "cart":false,
        "wishlist":false
    },
    {
        "id": "Fgs6dagjgdsa867ahWe",
        "courseCreator": "Natasha",
        "courseDescription": "During serious moments of fighting how to pose and get viewers attention",
        "discount": 15,
        "discountValidTill": "2021-07-28T07:30:00.000Z",
        "price": 5000,
        "tags": [
            "poser",
            "widow"
        ],
        "title": "How to pose",
        "cart":false,
        "wishlist":false
    },
    {
        "id": "Fq4hjh4ghg445j14gh56RWe",
        "courseCreator": "Sylvie",
        "courseDescription": "Running and hiding from childhood until present from the time variance authority",
        "discount": 0,
        "discountValidTill": "2021-07-28T04:30:00.000Z",
        "price": 2000,
        "tags": [
            "mischief",
            "loki"
        ],
        "title": "How to survive from TVA",
        "cart":false,
        "wishlist":false
    },
    {
        "id": "FqPHRf4g41hf654gfh26gf5e",
        "courseCreator": "MJ",
        "courseDescription": "I know almost anything you can ask me",
        "discount": 5,
        "discountValidTill": "2021-08-01T08:15:00.000Z",
        "price": 4400,
        "tags": [
            "nerd",
            "peter parker"
        ],
        "title": "How to know everything",
        "cart":false,
        "wishlist":false
    },
    {
        "id": "Fqf14gh56fhg5f156hgfWe",
        "courseCreator": "Clint Barton",
        "courseDescription": "Arrows are everything",
        "discount": 7,
        "discountValidTill": "2021-09-10T02:55:00.000Z",
        "price": 3600,
        "tags": [
            "arrow",
            "training"
        ],
        "title": "How to concentrate",
        "cart":true,
        "wishlist":false
    },
    {
        "id": "FqPdfh4g6541hf56hghg5We",
        "courseCreator": "Thanos",
        "courseDescription": "How to use infinity gauntlet without taking any damage",
        "discount": 15,
        "discountValidTill": "2021-07-26T04:30:00.000Z",
        "price": 5500,
        "tags": [
            "strong",
            "villian"
        ],
        "title": "How to vanish half of the entire universe",
        "cart":false,
        "wishlist":false
    },
    {
        "id": "Fqfh4g5f6h4gf5h1gfWe",
        "courseCreator": "Taskmaster",
        "courseDescription": "First find a way to get blasted into almost death",
        "discount": 17,
        "discountValidTill": "2021-07-20T11:35:00.000Z",
        "price": 6200,
        "tags": [
            "mimic",
            "villian"
        ],
        "title": "How to copy everything",
        "cart":false,
        "wishlist":true
    }
]

export const CoursesReducer = 
(state = initialValues, action:CoursesActionTypes): Array<Course> =>{
    switch(action.type){
        case ADD_CART:
            let addCartArray:Array<Course> = [];
            state.map((task)=>{
              if(task.id==action.payload){
                task.cart = true;
              }
              addCartArray.push(task);
            });
            return addCartArray;

        case ADD_WISH:
            let addWishArray:Array<Course> = [];
            state.map((task,i)=>{
              if(task.id==action.payload){
                task.wishlist = true;
              }
              addWishArray.push(task);
            })
            return addWishArray;

        case REM_CART:
            let removeCartArray:Array<Course> = [];
            state.map((task,i)=>{
              if(task.id==action.payload){
                task.cart = false;
              }
              removeCartArray.push(task);
            })
            return removeCartArray;

        case REM_WISH:
            let removeWishArray:Array<Course> = [];
            state.map((task,i)=>{
              if(task.id==action.payload){
                task.wishlist = false;
              }
              removeWishArray.push(task);
            })
            return removeWishArray;

        case CLR_CART:
            let removeAllCartArray:Array<Course> = [];
            state.map((task,i)=>{
              if(task.cart){
                task.cart = false;
              }
              removeAllCartArray.push(task);
            })
            return removeAllCartArray;

        case SORT:
            let sortedArray: Array<Course> = [];
            if(action.payload==1){
                sortedArray = state.slice().sort((a,b)=> (a.price<=b.price)?-1:1);
            }
            else if(action.payload==2){
                sortedArray = state.slice().sort((a,b)=> (a.price>b.price)?-1:1);
            }
            else{
                sortedArray = state.slice();
            }
            return sortedArray;

        default:
            return state;
    }
}