import React from "react";
import SideBar from "./components/UI/SideBar/SideBar";
import {Route, Routes} from "react-router-dom";
import ImportFile from "./pages/ImportFile";
import ViewingImports from "./pages/ViewingImports";
import Reports from "./pages/Reports";
import Home from "./pages/Home";
import ViewTransactions from "./pages/ViewTransactions";
import Explanations from "./pages/Explanations";
import Improvements from "./pages/Improvements";
import UpdateAccountType from "./pages/UpdateAccountType";


const App = () => {
    return (
        <div className="flex">
            <SideBar/>
            <div className="p-4 mx-auto overflow-y-scroll h-screen w-full">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/explain" element={<Explanations/>}/>
                    <Route path="/import" element={<ImportFile/>}/>
                    <Route path="/view" element={<ViewingImports/>}/>
                    <Route path="/reports" element={<Reports/>}/>
                    <Route path="/improvements" element={<Improvements/>}/>
                    <Route path="/account/:accountNumber" element={<ViewTransactions/>}/>
                    <Route path="/account/:accountNumber/edit" element={<UpdateAccountType/>}/>
                </Routes>
            </div>
        </div>
    );
};


export default App;
