import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BookPage from "./pages/book";
import ContactPage from "./pages/contact";
import LoginPage from "./pages/login";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import RegisterPage from "./pages/register";
import { callFetchAccount } from "./services/api";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice";
import Loading from "./components/Loading";
import NotFound from "./components/NotFound";
import AdminPage from "./pages/admin";
import ProtectedRoute from "./components/ProtectedRoute";
import LayoutAdmin from "./components/Admin/LayoutAdmin";
import "./styles/reset.scss";
import "./styles/global.scss";
import ManageUserPage from "./pages/admin/user";
import ManageBookPage from "./pages/admin/book";
import OrderPage from "./pages/order";
import HistoryPage from "./pages/history";
import AdminOrderPage from "./pages/admin/order";
import ManageCustomerPage from "./pages/admin/customer";
import ManageEmployeePage from "./pages/admin/employee";
import ManageReceiptPage from "./pages/admin/receipt";
import ManageSupply from "./pages/admin/supply";
import ManageSupplyPage from "./pages/admin/supply";
import ManageSupplierPage from "./pages/admin/supplier";
import ManagePermissionPage from "./pages/admin/permission";
import ManageRolePage from "./pages/admin/role";
import Authenticate from "./pages/authenticate/Authenticate";

const Layout = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="layout-app">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Outlet context={[searchTerm, setSearchTerm]} />
      <Footer />
    </div>
  );
};

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.account.isLoading);

  const getAccount = async () => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    )
      return;

    const res = await callFetchAccount();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data));
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },

        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "book/:slug",
          element: <BookPage />,
        },
        {
          path: "order",
          element: (
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "history",
          element: (
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          ),
        },
      ],
    },

    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "user",
          element: (
            <ProtectedRoute>
              <ManageUserPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "customer",
          element: (
            <ProtectedRoute>
              <ManageCustomerPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "employee",
          element: (
            <ProtectedRoute>
              <ManageEmployeePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "book",
          element: (
            <ProtectedRoute>
              <ManageBookPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "order",
          element: (
            <ProtectedRoute>
              <AdminOrderPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "receipt",
          element: (
            <ProtectedRoute>
              <ManageReceiptPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "supply",
          element: (
            <ProtectedRoute>
              <ManageSupplyPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "supplier",
          element: (
            <ProtectedRoute>
              <ManageSupplierPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "permission",
          element: (
            <ProtectedRoute>
              <ManagePermissionPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "role",
          element: (
            <ProtectedRoute>
              <ManageRolePage />
            </ProtectedRoute>
          ),
        },
      ],
    },

    {
      path: "/login",
      element: <LoginPage />,
    },

    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/authenticate",
      element: <Authenticate />,
    },
  ]);

  return (
    <>
      {isLoading === false ||
      window.location.pathname === "/authenticate" ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ||
      window.location.pathname === "/" ||
      window.location.pathname.startsWith("/book") ? (
        <RouterProvider router={router} />
      ) : (
        <Loading />
      )}
    </>
  );
}
