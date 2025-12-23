import axios from 'axios';
import React,{useState,useEffect} from 'react'
import BlogCard from '../components/BlogCard';

const UserBlogs = () => {
    const [blogs,setBlogs]=useState([]);

    //get user blogs
    const getUserBlogs =async ()=>{
        try {
          const id = localStorage.getItem("userId");
          const {data} = await axios.get(`/api/v1/blog/user-blog/${id}`);
          console.log("result",data);
          if(data?.success){
            setBlogs(data?.userBlog.blogs);
          }  
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
        getUserBlogs();
    },[]);

    console.log("data",blogs);
  return (
    <div>{blogs && blogs.length > 0?(blogs.map((blog)=>(
        <BlogCard 
            id={blog._id}
            isUser={true}
            title={blog.title} 
            description={blog.description}
            image={blog.image} 
            username={blog.user.username} 
            time={blog.createdAt}/>
                ))) : (<h1>You haven't created a blog yet</h1>)
        }</div>
  )
}

export default UserBlogs