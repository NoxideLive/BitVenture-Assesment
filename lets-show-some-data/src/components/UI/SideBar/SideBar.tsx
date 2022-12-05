import React from "react";
import {
    faChartBar,
    faEye,
    faFileImport,
    faHome,
    faLightbulb,
    faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";
import MenuItem from "./MenuItem";

const Sidebar = () => {
    return (
        <aside className="bg-blue-500 h-screen min-w-max">
            <ul className="flex-col items-center p-4 text-xl font-bold space-y-4">
                <MenuItem icon={faHome} text="Home" to="/"/>
                <MenuItem
                    icon={faFileImport}
                    text="Import File"
                    to="/import"
                />
                <MenuItem icon={faEye} text="Viewing Imports" to="/view"/>
                <MenuItem icon={faChartBar} text="Reports" to="/reports"/>
                <MenuItem icon={faLightbulb} text="Improvements" to="/improvements"/>
                <MenuItem icon={faQuestionCircle} text="Explanations" to="/explain"/>
            </ul>
        </aside>
    );
};


export default Sidebar;
