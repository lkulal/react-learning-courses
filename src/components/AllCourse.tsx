import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "../store"
import '../css/Basic.css';
import Footer from "./Footer";
import CourseList from "./CourseList";
import { Course } from "../utilities/allModels";
import SideCart from "./SideCart";
import SearchImage from "../images/Search.svg";
import { CourseSort } from "../store/Courses/CoursesActions";

const AllCourse = () =>{

    //from redux
    const courses = useSelector((state:AppState)=> state.CoursesReducer);
    const dispatch = useDispatch();

    //states
    const [sort,setSort] = useState(0);
    const [page,setPage] = useState(1);
    const [totalPages,setTotalPages] = useState(0);
    const [cartCourses,setCartCourses] = useState<Array<Course>>([]);
    const [searchString,setSearchString] = useState('');

    useEffect(()=>{
        setTotalPages(Math.ceil(courses.length/4));
    },[]);

    useEffect(()=>{
        setCartCourses(courses.filter(course=>course.cart==true));
    },[courses]);

    useEffect(()=>{
        dispatch(CourseSort(sort));
    },[sort])
    
    const pageArrays = () =>{
        let arr:Array<number> = [];
        for(var i=1;i<=totalPages;i++)
            arr.push(i);
        return arr;
    }

    const searchCourses = () => {

    }

    return (
        <>
            <main className="all-courses-main">
                <section className="course-list">
                    <div className="secondary-heading">
                        <p>All Courses</p>
                        <select name="price" defaultValue={sort} onChange={(e)=>{setSort(Number(e.target.value));}}>
                            <option disabled value={0}>Course Price</option>
                            <option value={1}>Low to High</option>
                            <option value={2}>High to Low</option>
                        </select>
                    </div>

                    {/* //  Below Element holds all the courses  */}
                    <CourseList allCourses={courses} page={page-1} source="courses"/>

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

                {/*  cart widget in the right side with search bar  */}

                <aside className="course-cart">
                    <div className="search-bar">
                        <input type="text" placeholder="Search here" onChange={(e)=>{setSearchString(e.target.value);}}/>
                        <img src={SearchImage} onClick={searchCourses} />
                    </div>
                    <SideCart courses={cartCourses}/>
                </aside>
            </main>
            <Footer/>
        </>
    );
}

export default AllCourse;