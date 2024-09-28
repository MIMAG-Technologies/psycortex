import React, { useEffect } from "react";
import data from "./Blogs.json";
import "./Blog.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

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
      <Helmet>
        <title> Best Blogs on Psychology for Personal Growth</title>
        <meta
          name="description"
          content="Dive into expert psychology blogs. Gain insights, find motivation, and enhance your mental well-being today."
        />
      </Helmet>
      <div className="breadcrumb">
        <i className="fa-solid fa-house"></i>
        {" > Blogs"}{" "}
      </div>
      <div className="blog-container">
        {data.map((blog, index) => oneblog(blog))}
      </div>
    </div>
  );
}

export default Blogs;
