// import {
//   createBrowserRouter,
//   RouterProvider,
//   Outlet,
//   createRoutesFromElements,
//   Route,
//   ScrollRestoration,
// } from "react-router-dom";
// import Footer from "./components/home/Footer/Footer";
// import FooterBottom from "./components/home/Footer/FooterBottom";
// import Header from "./components/home/Header/Header";
// import HeaderBottom from "./components/home/Header/HeaderBottom";
// import SpecialCase from "./components/SpecialCase/SpecialCase";
// import About from "./pages/About/About";
// import SignIn from "./pages/Account/SignIn";
// import SignUp from "./pages/Account/SignUp";
// import Cart from "./pages/Cart/Cart";
// import Contact from "./pages/Contact/Contact";
// import Home from "./pages/Home/Home";
// import Offer from "./pages/Offer/Offer";
// import Payment from "./pages/payment/Payment";
// import ProductDetails from "./pages/ProductDetails/ProductDetails";
// import Shop from "./pages/Shop/Shop";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Layout = () => {
//   return (
//     <div>
//       <ToastContainer
//         position="top-right"
//         autoClose={1000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />
//       <Header />
//       <HeaderBottom />
//       <SpecialCase />
//       <ScrollRestoration />
//       <Outlet />
//       <Footer />
//       <FooterBottom />
//     </div>
//   );
// };
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//       <Route path="/" element={<Layout />}>
//         {/* ==================== Header Navlink Start here =================== */}
//         <Route index element={<Home />}></Route>
//         <Route path="/shop" element={<Shop />}></Route>
//         <Route path="/about" element={<About />}></Route>
//         <Route path="/contact" element={<Contact />}></Route>
        
//         {/* ==================== Header Navlink End here ===================== */}
//         <Route path="/category/:category" element={<Offer />}></Route>
//         <Route path="/product/:_id" element={<ProductDetails />}></Route>
//         <Route path="/cart" element={<Cart />}></Route>
//         <Route path="/paymentgateway" element={<Payment />}></Route>
//       </Route>
//       <Route path="/signup" element={<SignUp />}></Route>
//       <Route path="/signin" element={<SignIn />}></Route>
//     </Route>
//   )
// );

// function App() {
//   return (
//     <div className="font-bodyFont">
//       <RouterProvider router={router} />
//     </div>
//   );
// }

// export default App;
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import OrderBillinngPage from "./pages/payment/orderDetailsPage";
import Silpaulin from './pages/Silpaulin/Silpaulin'
import Application from './pages/Applications/Applications'
import Tarpaulin from './pages/Tarpaulin/Tarpaulin'
import AgricultureProducts from './pages/Agriculture Products/Agriculture Products'
import KisanFlex from './pages/KisanFlex/KisanFlex'
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import SuperAdminRouting from './SuperAdmin/Router/index'
const Layout = () => {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
       <Route path="/superadmin/*" element={<SuperAdminRouting />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
       
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/Silpaulin" element={<Silpaulin />} />
        <Route path="/Applications" element={<Application />} />
        <Route path="/Tarpaulin" element={<Tarpaulin />} />
        <Route path="/AgricultureProducts" element={<AgricultureProducts />} />
        <Route path="/KisanFlex" element={<KisanFlex />} />




        <Route path="/category/:category" element={<Offer />} />
        <Route path="/product/:_id" element={<ProductDetails />} />
        <Route path="/shop" element={<Shop />} />

        {/* ==================== Private Routes ===================== */}
        <Route element={<PrivateRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/paymentgateway" element={<Payment />} />
          <Route path="/OrderBillinngPage" element={<OrderBillinngPage />} />

        </Route>

        {/* ==================== Public Routes ===================== */}
        <Route element={<PublicRoute />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
