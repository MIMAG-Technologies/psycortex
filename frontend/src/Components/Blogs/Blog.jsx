import React, { useEffect, useRef } from "react";
import jsonData from "./Blogs.json";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function Blog() {
  const { section } = useParams();
  const blog = jsonData.find((item) => item.searchkey === section);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const observedElements = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.transform = "scale(1)";
            entry.target.style.opacity = "1";
          } else {
            entry.target.style.transform = "scale(0.95)";
            entry.target.style.opacity = "0";
          }
        });
      },
      { threshold: 0.1 }
    );

    observedElements.current.forEach((el) => {
      if (el) {
        // Ensure element is valid before observing
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!blog) {
    return "NO BLOG FOUND";
  }
  return (
    <div className="One-Blog">
      <Helmet>
        <title>{blog.title}</title>
        <meta name="description" content={blog.content[1].text} />
      </Helmet>
      <h1 ref={(el) => el && observedElements.current.push(el)}>
        {blog.title}
      </h1>
      <div>
        <p
          ref={(el) => el && observedElements.current.push(el)}
          className="lineP"
        >
          {blog.by}
        </p>
        <p
          ref={(el) => el && observedElements.current.push(el)}
          className="lineP"
        >
          {blog.Date}
        </p>
        <p ref={(el) => el && observedElements.current.push(el)}>{blog.tag}</p>
      </div>
      <img
        ref={(el) => el && observedElements.current.push(el)}
        src={blog.img}
        alt=""
      />
      {blog.content.map((item, index) => {
        if (item.tag === "img") {
          return (
            <img
              ref={(el) => el && observedElements.current.push(el)}
              key={index}
              src={item.src}
              alt=""
            />
          );
        } else if (item.tag === "h2") {
          return (
            <h2
              ref={(el) => el && observedElements.current.push(el)}
              key={index}
            >
              {item.text}
            </h2>
          );
        } else if (item.tag === "p") {
          return (
            <p
              ref={(el) => el && observedElements.current.push(el)}
              key={index}
            >
              {item.text}
            </p>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}

export default Blog;
