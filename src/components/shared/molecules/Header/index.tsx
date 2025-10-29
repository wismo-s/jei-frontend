
import { Link } from "react-router-dom";

import UserActions from "../UserActions";

import Jei from "@components/shared/atoms/Jei";


const Header: React.FC = () => {

    return (
        <header className="md:px-14 py-2 flex justify-between items-center bg-white-full sticky top-0 z-50 shadow-sm">
            <div className="flex items-center md:gap-12 px-2 md:px-0">
            
                <Link to="/" className="flex items-center">
                    <Jei className="h-16" aria-label="JEI Logo" />
                </Link>

                
            </div>

            <UserActions />

        
        </header>
    );
};

export default Header;
