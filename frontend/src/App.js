import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Footer from "./Components/Common Elements/Footer";
import Navbar from "./Components/Common Elements/Navbar";
import MobileNavbar from "./Components/Common Elements/MobileNavbar";
import UniqueFeature from "./Components/Unique Features/UniqueFeature";
import Services from "./Components/Services/Services.jsx";
// import Testimonials from "./Components/Testimonials/Testimonials.jsx";
import Contact from "./Components/Contact Us/Contact.jsx";
import Team from "./Components/AboutUs/Team.jsx";
import MissionVissionValues from "./Components/AboutUs/MissionVissionValues.jsx";
import Awards from "./Components/AboutUs/Awards.jsx";
import Blogs from "./Components/Blogs/Blogs.jsx";
import Blog from "./Components/Blogs/Blog.jsx";
import CaseStudies from "./Components/CaseStudy/CaseStudies.jsx";
import CaseStudytemplate from "./Components/CaseStudy/CaseStudytemplate.jsx";
import PolicyTemplate from "./Components/Policy/PolicyTemplate.jsx";
import Franchise from "./Components/Common Elements/Franchise.jsx";
import Booking from "./Components/Contact Us/Booking.jsx";
import Search from "./Components/Search/Search.jsx";
// import SignIn from "./Components/User/SignIn.jsx";
import LogIn from "./Components/User/LogIn.jsx";
import Shop from "./Components/Shop/Shop.jsx";
import OneProductPage from "./Components/Shop/OneProductPage.jsx";
// import UserCartView from "./Components/User/UserCartView.jsx";
import UserPurchasedItemView from "./Components/User/UserPurchasedItemView.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./Admin/AdminNavbar.jsx";
import Users from "./Admin/Users.jsx";
import Products from "./Admin/Products.jsx";
import Media from "./Admin/Media.jsx";
// import ForgotPassword from "./Components/User/ForgotPassword.jsx";
import About from "./Components/AboutUs/About.jsx";
import AdminLogin from "./Admin/AdminLogin.jsx";
import Gallery from "./Components/AboutUs/Gallery.jsx";
import UserCart from "./Components/User/UserCart.jsx";
import CheckOut from "./Components/User/CheckOut.jsx";
import OrderDetails from "./Components/User/OrderDetails.jsx";

function App() {
  const [user, setuser] = useState({});
  const [login, setlogin] = useState("Login");
  const [cartlenght, setcartlenght] = useState(0);
  const location = useLocation();
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    // Check if the current location path starts with "/admin"
    setIsAdminRoute(location.pathname.startsWith("/admin"));
  }, [location.pathname]);

  const fetchUser = async () => {
    const token = localStorage.getItem("psycortexTOKEN");
    if (token) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/fetchuser`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setuser(response.data.user);
        setlogin(response.data.user.name.charAt(0).toUpperCase());
        const cart = response.data.user.cart;
        let clen = 0;
        for (const item of cart) {
          clen += item.quantity;
        }
        setcartlenght(clen);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {!isAdminRoute && (
        <>
          <Navbar
            fetchUser={fetchUser}
            user={user}
            login={login}
            cartlenght={cartlenght}
          />
          <MobileNavbar
            fetchUser={fetchUser}
            user={user}
            login={login}
            cartlenght={cartlenght}
          />
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:key" element={<Search />} />
        <Route path="/aboutus/team" element={<Team />} />
        <Route path="/aboutus/about" element={<About />} />
        <Route
          path="/aboutus/missionvisionandvalues"
          element={<MissionVissionValues />}
        />
        <Route path="/aboutus/awards" element={<Awards />} />
        <Route path="/aboutus/gallery" element={<Gallery />} />

        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:section" element={<Blog />} />
        <Route path="/psycortex/:section" element={<PolicyTemplate />} />
        <Route path="/casestudies" element={<CaseStudies />} />
        <Route path="/casestudy/:section" element={<CaseStudytemplate />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/aboutus/offices" element={<Contact />} />
        {/* <Route path="/testimonials" element={<Testimonials />} /> */}
        <Route path="/franchise" element={<Franchise />} />
        <Route path="/uniquefeature/:section" element={<UniqueFeature />} />
        <Route path="/services/:section/:subsection" element={<Services />} />

        {/* ECOM ROUTES */}
        <Route path="/shop" element={<Shop />} />
        <Route
          path="/shop/products/:pid"
          element={<OneProductPage fetchUser={fetchUser} />}
        />

        {/* USER ROUTES */}
        {/* <Route path="/user/signin" element={<SignIn fetchUser={fetchUser} />} />
        <Route path="/user/forgotpassword" element={<ForgotPassword />} /> */}
        <Route path="/user/login" element={<LogIn fetchUser={fetchUser} />} />
        <Route path="/user/mycart" element={<UserCart />} />
        <Route path="/user/checkout" element={<CheckOut />} />
        <Route path="/user/order" element={<OrderDetails />} />
        {/* <Route
          path="/user/mycart"
          element={<UserCartView fetchUser={fetchUser} user={user} />}
        /> */}
        <Route
          path="/user/mypurchaseditems"
          element={<UserPurchasedItemView user={user} />}
        />
        {/* ADMIN ROUTE */}

        <Route path="/adminLogin" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminNavbar />}>
          <Route path="" element={<Users />} />
          <Route path="product-management" element={<Products />} />
          <Route path="media" element={<Media />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
