import { Routes, Route } from "react-router-dom";
import ProductivityDashboardPage from "@pages/erp/DashboardPage";
import NotFoundPage from "@pages/erp/NotFoundPage";

export default function CrmRoutes() {
    return (
        <Routes>
            <Route path="" element={<ProductivityDashboardPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}
