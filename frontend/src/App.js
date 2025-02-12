import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Footer from "./Components/Common Elements/Footer";
import Navbar from "./Components/Common Elements/Navbar";
import MobileNavbar from "./Components/Common Elements/MobileNavbar";
import Services from "./Components/Services/Services.jsx";
import Contact from "./Components/Contact Us/Contact.jsx";
import MissionVissionValues from "./Components/AboutUs/MissionVissionValues.jsx";
import Awards from "./Components/AboutUs/Awards.jsx";
import Blogs from "./Components/Blogs/Blogs.jsx";
import Blog from "./Components/Blogs/Blog.jsx";
import PolicyTemplate from "./Components/Policy/PolicyTemplate.jsx";
import Franchise from "./Components/Common Elements/Franchise.jsx";
import Search from "./Components/Search/Search.jsx";
import LogIn from "./Components/User/LogIn.jsx";
import Shop from "./Components/Shop/Shop.jsx";
import OneProductPage from "./Components/Shop/OneProductPage.jsx";
import UserPurchasedItemView from "./Components/User/UserPurchasedItemView.jsx";
import AdminNavbar from "./Admin/AdminNavbar.jsx";
import Users from "./Admin/Users.jsx";
import Products from "./Admin/Products.jsx";
import About from "./Components/AboutUs/About.jsx";
import AdminLogin from "./Admin/AdminLogin.jsx";
import Gallery from "./Components/AboutUs/Gallery.jsx";
import UserCart from "./Components/User/UserCart.jsx";
import CheckOut from "./Components/Payments/CheckOut.jsx";
import OrderDetails from "./Components/Payments/OrderDetails.jsx";
import UserTransactions from "./Admin/UserTransactions.jsx";
import AdminContact from "./Admin/AdminContact.jsx";
import Marketing from "./Components/Marketing/Marketing.jsx";
import AllContacts from "./Components/Contact Us/AllContacts.jsx";

function App() {
 
  const location = useLocation();
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    // Check if the current location path starts with "/admin"
    setIsAdminRoute(
      location.pathname.startsWith("/admin") ||
        location.pathname.startsWith("/brochure")
    );
  }, [location.pathname]);

  return (
    <>
      {!isAdminRoute && (
        <>
          <Navbar />
          <MobileNavbar />
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brochure" element={<Marketing/>} />
        <Route path="/search/:key" element={<Search />} />

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

        <Route path="/contactus" element={<Contact />} />
        <Route path="/contactus/all" element={<AllContacts />} />
        <Route path="/franchise" element={<Franchise />} />
        <Route path="/services/:section/:subsection" element={<Services />} />

        {/* ECOM ROUTES */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/products/:pid" element={<OneProductPage />} />

        {/* USER ROUTES */}

        <Route path="/user/login" element={<LogIn />} />
        <Route path="/user/mycart" element={<UserCart />} />
        <Route path="/user/checkout" element={<CheckOut />} />
        <Route path="/user/order/:txdId" element={<OrderDetails />} />
        <Route
          path="/user/mypurchaseditems"
          element={<UserPurchasedItemView />}
        />
        {/* ADMIN ROUTE */}

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminNavbar />}>
          <Route path="" element={<Users />} />
          <Route path="userTransaction/:id" element={<UserTransactions />} />
          <Route path="product-management" element={<Products />} />
          <Route path="contact" element={<AdminContact />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
