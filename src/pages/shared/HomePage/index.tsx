import Header from "@components/shared/molecules/Header";
import { Link } from "react-router-dom";

export default function HomePage() {
    // Function to check if user has access to a module
    return (
        <>
            <Header />
            <div className="w-full flex justify-center">
                <div className="w-full max-w-screen-lg">
                    <h1 className="text-2xl text-gray-700 font-semibold text-center mt-10">
                        Bienvenido al sistema de gestión de JEI
                    </h1>
                    <p className="text-center">
                        Seleccione la aplicación que desea usar
                    </p>
                    <div className="flex gap-4">
                        <Link to="/erp">
                            <div className="rounded-md border border-blue-full p-6 text-xl font-semibold bg-blue-100">
                                ERP
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
