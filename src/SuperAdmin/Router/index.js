import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SuperAdminLayout from "../components/SuperAdminLayout/SuperAdminLayout";
import SuperAdminDashboard from "../page/SuperAdminDashboard/SuperAdminDashboard";
import SuperAdminDocuments from "../page/ProductSection/ProductAll";
import DocumentPage from "../page/ProductSection/ProductAll";
import MeetingRecordPage from "../page/MeetingRecordPage/MeetingRecordPage";
import AssetManagementPage from "../page/AssetManagementPage/AssetManagementPage";
import AllEmployees from "../page/Employees/AllEmployee/AllEmployee";
import BookingProduct from "../page/BookProdcutUser/BookProductUser";
import BookingProductUser from '../page/BookProdcutUser/BookProductDetails'
import Login from "../auth/login";
import { PrivateRoute } from "./PrivateRoute";
import GetAllBusinessCategory from '../page/AddCategoryBusniess/GetAllBusinessCategory'
import AddProfiteIncome from '../page/AddProfiteIcomePage/ProfiteIncomeAll'


const SuperAdminRouting = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route 
        path="" 
        element={
          <PrivateRoute>
            <Navigate to="dashboard" replace />
          </PrivateRoute>
        } 
      />
      <Route
        element={
          <PrivateRoute>
            <SuperAdminLayout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="documentsadmin" element={<SuperAdminDocuments />} />
        <Route path="meetingRecordPage" element={<MeetingRecordPage />} />
        <Route path="assets" element={<AssetManagementPage />} />
        <Route path="documentPage" element={<DocumentPage />} />
        <Route path="allEmployee" element={<AllEmployees />} />
        <Route path="bookingdata" element={<BookingProduct />} />
        <Route path="bookingdataUser/:userId" element={<BookingProductUser />} />
        <Route path="GetAllBusinessCategory" element={<GetAllBusinessCategory />} />
        <Route path="profiteicome" element={<AddProfiteIncome/>} />   



       


      </Route>

      {/* Catch all route - redirect to dashboard or login */}
      <Route 
        path="*" 
        element={
          <Navigate to="dashboard" replace />
        }
      />
    </Routes>
  );
};

export default SuperAdminRouting;