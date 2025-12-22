import { createBrowserRouter } from "react-router-dom";

/* ===== Layouts ===== */
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

/* ===== Pages ===== */
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/NotFound";
import Contact  from "../pages/contruct/Contact";
import About from "../pages/contruct/About";

/* ===== Products ===== */
import PublicAllProducts from "../pages/products/AllProducts";
import ProductDetails from "../pages/products/ProductDetails";

/* ===== Dashboard Common ===== */
import DashboardHome from "../pages/dashboard/DashboardHome";
import Profile from "../pages/dashboard/Profile";

/* ===== Admin ===== */
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import AllOrders from "../pages/dashboard/admin/AllOrders";
import AdminAllProducts from "../pages/dashboard/admin/AllProducts";

/* ===== Manager ===== */
import AddProduct from "../pages/dashboard/manager/AddProduct";
import ManageProducts from "../pages/dashboard/manager/ManageProducts";
import PendingOrders from "../pages/dashboard/manager/PendingOrders";
import ApprovedOrders from "../pages/dashboard/manager/ApprovedOrders";
import AddTracking from "../pages/dashboard/manager/AddTracking";

/* ===== Buyer ===== */
import MyOrders from "../pages/dashboard/buyer/MyOrders";
import TrackOrder from "../pages/dashboard/buyer/TrackOrder";

/* ===== Order ===== */
import OrderForm from "../pages/orders/OrderForm";
import PaymentPage from "../pages/orders/PaymentPage";

/* ===== Route Guards ===== */
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ManagerRoute from "./ManagerRoute";
import BuyerRoute from "./BuyerRoute";
import PaymentSuccess from "../pages/orders/PaymentSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },

      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "all-products", element: <PublicAllProducts /> },
      {
        path: "products/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "profile", element: <Profile /> },

      /* ADMIN */
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "all-orders",
        element: (
          <AdminRoute>
            <AllOrders />
          </AdminRoute>
        ),
      },
      {
        path: "all-products",
        element: (
          <AdminRoute>
            <AdminAllProducts />
          </AdminRoute>
        ),
      },

      /* MANAGER */
      {
        path: "add-product",
        element: (
          <ManagerRoute>
            <AddProduct />
          </ManagerRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <ManagerRoute>
            <ManageProducts />
          </ManagerRoute>
        ),
      },
      {
        path: "pending-orders",
        element: (
          <ManagerRoute>
            <PendingOrders />
          </ManagerRoute>
        ),
      },
      {
        path: "approved-orders",
        element: (
          <ManagerRoute>
            <ApprovedOrders />
          </ManagerRoute>
        ),
      },
      {
        path: "add-tracking/:id",
        element: (
          <ManagerRoute>
            <AddTracking />
          </ManagerRoute>
        ),
      },

      /* BUYER */
      {
        path: "payment-success/:orderId",
        element: (
          <BuyerRoute>
            <PaymentSuccess />
          </BuyerRoute>
        ),
      },
      {
        path: "my-orders",
        element: (
          <BuyerRoute>
            <MyOrders />
          </BuyerRoute>
        ),
      },
      {
        path: "track-order/:id",
        element: (
          <BuyerRoute>
            <TrackOrder />
          </BuyerRoute>
        ),
      },
      {
        path: "order/:id",
        element: (
          <BuyerRoute>
            <OrderForm />
          </BuyerRoute>
        ),
      },
      {
        path: "payment/:orderId",
        element: (
          <BuyerRoute>
            <PaymentPage />
          </BuyerRoute>
        ),
      },
    ],
  },
]);

export default router;
