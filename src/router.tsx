import React from "react";
import { Route, Routes } from "react-router-dom";
import ConfilmPassword from "./page/auth/ConfilmPassword";
import Login from "./page/auth/Login";
import AddDevices from "./page/device/AddDevices";
import DetailDevices from "./page/device/DetailDevices";
import ListDevices from "./page/device/ListDevices";
import UpdateDevices from "./page/device/UpdateDevices";
import ListServices from "./page/service/ListServices";
import AddServices from "./page/service/AddServices";
import DetailServices from "./page/service/DetailServices";
import UpdateServices from "./page/service/UpdateServices";
import ListProgressives from "./page/progressive/ListProgressives";
import ListReport from "./page/report/ListReport";
import AddRoleManagements from "./page/management/role/AddRoleManagements";
import UpdateRoleManagements from "./page/management/role/UpdateRoleManagements";
import UserLogManagements from "./page/management/user/UserLogManagements";
import ListRole from "./page/management/role/RoleManagements";
import AddPro from "./page/progressive/AddProgressives";
import DetailProgressive from "./page/progressive/DetailProgressives";
import Account from "./page/management/account/Account";
import AddAccount from "./page/management/account/AddAccount";
import UpdateAccount from "./page/management/account/UpdateAccount";
import Proflie from "./page/auth/profile";
import ForgotPassword from "./page/auth/ForgetPass";
import AddProWithoutLogin from "./page/newProWithOutLogin/AddproWithOutLogin";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<ForgotPassword />} />
            <Route path="/confilm-password" element={<ConfilmPassword />} />
            <Route path="/newProw" element={<AddProWithoutLogin />} />

            <Route path="/device" element={<ListDevices />} />
            <Route path="/addDivice" element={<AddDevices />} />
            <Route path="/detailDivice/:id" element={<DetailDevices />} />
            <Route path="/updateDivice/:id" element={<UpdateDevices />} />

            <Route path="/service" element={<ListServices />} />
            <Route path="/addService" element={<AddServices />} />
            <Route path="/detailService/:id" element={<DetailServices />} />
            <Route path="/editService/:id" element={<UpdateServices />} />

            <Route path="/progressive" element={<ListProgressives />} />
            <Route path="/addPro" element={<AddPro />} />
            <Route path="/detailPro/:id" element={<DetailProgressive />} />

            <Route path="/report" element={<ListReport />} />

            <Route path="/role" element={<ListRole />} />
            <Route path="/addRoleManagement" element={<AddRoleManagements />} />
            <Route
                path="/updateRoleManagement/:id"
                element={<UpdateRoleManagements />}
            />

            <Route path="/account" element={<Account />} />
            <Route path="/addAcount" element={<AddAccount />} />
            <Route path="/updateAccount/:id" element={<UpdateAccount />} />

            <Route path="/user" element={<UserLogManagements />} />

            <Route path="/profile" element={<Proflie />} />
        </Routes>
    );
};

export default Router;
