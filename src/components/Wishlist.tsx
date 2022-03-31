import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { Course } from "../utilities/allModels";
import CourseList from "./CourseList";
import Footer from "./Footer";
import "../css/Basic.css";
import SideCart from "./SideCart";
import { CourseSort } from "../store/Courses/CoursesActions";

const Wishlist = () => {

    const courses = useSelector((state:AppState)=>state.CoursesReducer);
    const dispatch = useDispatch();

    const [sort,setSort] = useState(0);
    const [page,setPage] = useState(1);
    const [totalPages,setTotalPages] = useState(0);

    const [wishlistCourses,setWishlistCourses] = useState<Array<Course>>([]);
    const [cartCourses, setCartCourses] = useState<Array<Course>>([])

    useEffect(()=>{
        setWishlistCourses(courses.filter(course=>course.wishlist==true));
    },[])

    useEffect(()=>{
        setWishlistCourses(courses.filter(course=>course.wishlist==true));
        setCartCourses(courses.filter(course=>course.cart==true));
    },[courses])

    useEffect(()=>{
        setTotalPages(Math.ceil(wishlistCourses.length/4));
    },[wishlistCourses])

    useEffect(()=>{
        dispatch(CourseSort(sort));
    },[sort])
    
    const pageArrays = () =>{
        let arr:Array<number> = [];
        for(var i=1;i<=totalPages;i++)
            arr.push(i);
        return arr;
    }

    return (
        <>
            <main className="all-courses-main">
                <section className="course-list">
                    <div className="secondary-heading">
                        <p>Courses in My Wishlist</p>
                        <select name="price" defaultValue={sort} onChange={(e)=>{setSort(Number(e.target.value));}}>
                                <option disabled value={0}>Course Price</option>
                                <option value={1}>Low to High</option>
                                <option value={2}>High to Low</option>
                            </select>
                    </div>

                    {/* Below Element holds all the courses  */}

                    <CourseList allCourses={wishlistCourses} source="wishlist" page={page-1}/>
                    
                    
                    <div className="page-no">
                            <p onClick={()=>{if(page!=1)setPage(page-1)}}>〈</p>
                            {
                                pageArrays().map((pageNumber,i)=>{
                                    return (
                                        <label key={i} className="page-radio">
                                            <input type="radio" checked={page==pageNumber} name="page" onChange={()=>setPage(pageNumber)}/>
                                            <p><span>{pageNumber}</span></p>
                                        </label>
                                    );
                                })
                            }
                            <p onClick={()=>{if(page!=totalPages)setPage(page+1)}}>〉</p>
                        </div>
                </section>

                <aside className="course-cart">
                    <div className="search-bar">
                    </div>
                    <SideCart courses={cartCourses} />
                </aside>
            </main>
            <Footer/>
        </>
    );
}

export default Wishlist;