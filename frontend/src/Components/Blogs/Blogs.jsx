import React, { useEffect } from "react";
import data from "./Blogs.json";
import "./Blog.css";
import { Link } from "react-router-dom";

function Blogs() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const oneblog = (blog) => {
    return (
      <div className="oneblog">
        <img src={blog.img} alt="" />
        <Link to={`/blog/${blog.searchkey}`}>{blog.title}</Link>
        <div>
          <p className="lineP">{blog.by}</p>
          <p className="lineP">{blog.Date}</p>
          <p>{blog.tag}</p>
        </div>
        <span>
          {blog.content[1].text.substring(0, 200)}...{" "}
          <Link to={`/blog/${blog.searchkey}`}>Read More</Link>
        </span>
      </div>
    );
  };
  return (
    <div id="Blogs">
      <div className="blog-container">
        {data.map((blog, index) => oneblog(blog))}
      </div>
    </div>
  );
}

export default Blogs;
