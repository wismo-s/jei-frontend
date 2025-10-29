import ErpLayout from "@layouts/erp/DashboardLayout";

import NotFound404 from "@assets/icons/general/404-color.svg?react";

export default function NotFoundPage() {
    return (
        <>
            <ErpLayout>
                <div className="w-full flex flex-col justify-center min-h-full items-center">
                    <NotFound404 className="w-32 h-32 text-gray-500" />
                    <h1 className="text-2xl text-gray-500">Not found page</h1>
                    <h2 className="text-lg text-gray-500">Or coming soon...</h2>
                </div>
            </ErpLayout>
        </>
    );
}
