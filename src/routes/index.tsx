import { Route, Routes } from "react-router-dom";
import LoginPage from "@pages/shared/LoginPage";
import LogoutPage from "@pages/shared/LogoutPage";

import ProtectedOutlet from "./ProtectedOutlet";
import ErpRoutes from "./erp/ErpRoutes";
import HomePage from "@pages/shared/HomePage";
import { ModuleProtectedRoute } from "./ProtectedOutlet/module-protected-outlet";

export default function MainRoutes() {
    return (
        <Routes>
            {/** Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutPage />} />

            {/** Private Routes */}
            <Route element={<ProtectedOutlet />}>
                <Route path="/" element={<HomePage />} />

                {/** Core Routes */}
                <Route element={<ModuleProtectedRoute moduleKey="erp" />}>
                    <Route path="/erp/*" element={<ErpRoutes />} />
                </Route>

                {/** Admin Routes */}
                {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}
            </Route>
        </Routes>
    );
}
