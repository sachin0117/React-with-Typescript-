import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Signin from "../pages/signin/Signin";
import Signup from "../pages/signup/Signup";
import Dashboard, { GetUserDetailLoader } from "../layout/dashboard/Dashboard";
import Cart from "../pages/cartdetail/Cart";
import NotFoundPage from "../pages/error/NotFound";

export default function Routes() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} loader={GetUserDetailLoader} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFoundPage />} />
            </>
        )
    );
    return <RouterProvider router={router} />
}

