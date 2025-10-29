import Header from "@components/shared/molecules/Header";
import ErpSideBar from "@components/erp/molecules/ErpSideBar";
import { useEffect } from "react";

type DashboardLayoutProps = {
    children?: React.ReactNode;
};
export default function DashboardLayout({ children }: DashboardLayoutProps) {
    useEffect(() => {
        document.title = "ERP - Enterprise Resource Program";
    }, []);
    return (
        <div>
            <Header />
            <div className="flex h-[calc(100vh-64px)]">
                <ErpSideBar />
                <div className="bg-blue-low w-full rounded-tl-lg p-2 md:p-6 overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
