import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type MenuItemProps = {
    icon: IconProp;
    text: string;
    to: string;
};

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, to }) => {
    return (
        <li className="px-4 hover:bg-blue-600">
            <Link to={to} className="text-white block">
                <FontAwesomeIcon icon={icon} className="mr-2" />
                {text}
            </Link>
        </li>
    );
};

export default MenuItem;
