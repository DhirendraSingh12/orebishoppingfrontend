import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage =
      error.response?.data?.message || "Internal server error occurred";
    toast.error(errorMessage);
    return Promise.reject(error);
  }
);

export const getAllEmployees = async () => {
  const response = await API.get("/superadmin/allemployees");
  return response.data;
};
export const fetchEmployeeById = async (employeeId) => {
  try {
    const response = await API.get(`/superadmin/getemployees/${employeeId}`);
    console.log("API response data:", response.data); // Log response data
    return response.data;
  } catch (error) {
    console.error(
      "Error in fetchEmployeeById:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const addBulkEmployees = async (fileData) => {
  try {
    const response = await API.post("/superadmin/bulkemployee", fileData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addEmployee = async (formData) => {
  try {
    console.log("FormData being sent:", Object.fromEntries(formData.entries()));
    const response = await API.post("/superadmin/addemployee", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Employee added successfully");
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
export const editEmployee = async (employeeId, employeeData) => {
  try {
    const response = await API.put(
      `/superadmin/editemployees/${employeeId}`,
      employeeData
    );
    console.log("API Response:", response.employeeData);
    // toast.success(response.data.message);
    return response.data;
  } catch (error) {}
};

export const deleteSelectedUsers = async (ids) => {
  try {
    const deletePromises = ids.map((employeeId) =>
      API.delete(`/superadmin/deleteemployees/${employeeId}`)
    );
    const responses = await Promise.all(deletePromises);
    responses.forEach((response) => {
      toast.success(response.data.message);
    });
    return responses;
  } catch (error) {
    throw error;
  }
};

//Super Admin Login Services
export const loginSuperAdmin = async (email, password) => {
  try {
    const response = await API.post(`/super`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetWithdrawal = async () => {
  const response = await API.get(`/api/withdrawalRequests`);
  return response.data.data;
};

export const deleteUser = async (userId) => {
  try {
    const response = await API.delete(`/employee/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    toast.error(error.response?.data?.message || "Error deleting user");
    throw error;
  }
};

export const AddBusinessCategories = async (formData) => {
  try {
    const response = await API.post(`/category`, formData, {
    
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};




export const fetchCategories = async () => {
  const response = await API.get("/category");
  return response.data;
};
//AddAssets Services api service

export const addAsset = async (formDataToSend) => {
  try {
    const response = await API.post(
      "/superadmin/addassets",
      formDataToSend,
      {}
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllAssets = async () => {
  const response = await API.get("/superadmin/allassets");
  return response.data;
};

export const updateAsset = async (assetId, assetData) => {
  try {
    const response = await API.put(
      `/superadmin/editassets/${assetId}`,
      assetData,
      {}
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to update asset.");
    throw error;
  }
};
export const deleteassets = async (assetId) => {
  try {
    const response = await API.delete(`/superadmin/deleteassets/${assetId}`);
    toast.success("Asset deleted successfully");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Error deleting asset");
    throw error;
  }
};

export const deleteAllassets = async (assetId) => {
  try {
    const response = await API.delete(`/superadmin/deleteassets/${assetId}`);
    toast.success("asstes deleted successfully");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Error deleting user");
    throw error;
  }
};

//Metting Recod dailog all apis

export const addMeetingRecord = async (formData) => {
  try {
    const response = await API.post(`/superadmin/createsession`, formData, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMeettingRecod = async () => {
  const response = await API.get("/superadmin/allsession");
  return response.data;
};

export const updateMeetingRecod = async (sessionId, data) => {
  try {
    const response = await API.put(
      `/superadmin/editsession/${sessionId}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteaDailog = async (sessionId) => {
  try {
    const response = await API.delete(`/superadmin/deletesession/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting asset:", error);
    toast.error(error.response?.data?.message || "Error deleting asset");
    throw error;
  }
};
//Perks Services

export const addPerk = async (formData) => {
  try {
    const response = await API.post("/superadmin/addperks", formData);
    return response.data;
  } catch (error) {
    console.error("Error adding perk:", error);
    throw error;
  }
};

export const fetchAllPerksData = async () => {
  const response = await API.get("superadmin/allperks");
  return response.data;
};

export const deletePerk = async (perkId) => {
  try {
    const response = await API.delete(`/superadmin/deletePerk/${perkId}`);
    toast.success("Perks deleted successfully");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePolicies = async (policyId) => {
  try {
    const response = await API.delete(`/superadmin/deletePolicy/${policyId} `);
    toast.success("Policies deleted successfully");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEmployee = async (employeeId) => {
  try {
    const response = await API.delete(
      `/superadmin/deleteemployees/${employeeId}`
    );
    toast.success("Employee deleted successfully");
    return response.data;
  } catch (error) {
    throw error;
  }
};

//  Documents Services
export const createSession = async (formData) => {
  try {
    const response = await API.post("/superadmin/adddocuments", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchEmployeeDocuments = async () => {
  const response = await API.get("/superadmin/alldocuments");
  return response.data;
};

export const policies = async (formData) => {
  try {
    const response = await API.post("/superadmin/addpolicies", formData, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchPoliciesDatas = async () => {
  const response = await API.get("/superadmin/allpolicies");
  return response.data;
};

export const fetchalltimeoff = async () => {
  const response = await API.get("/superadmin/alltimeoff");
  return response.data;
};

export const approveTimeOff = async (leaveId) => {
  try {
    const response = await API.put(`/superadmin/approvetimeoff/${leaveId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error approving expense: " + error.message);
  }
};

export const rejectTimeOff = async (leaveId) => {
  try {
    const response = await API.put(`/superadmin/rejecttimeoff/${leaveId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error rejecting expense: " + error.message);
  }
};

export const getAllTimesheets = async () => {
  const response = await API.get("/superadmin/alltimesheets");
  return response.data;
};
export const getTimesheetById = async (employeeId) => {
  const response = await API.get(`/superadmin/timesheets/${employeeId}`);
  return response.data;
};

export const approveTimesheet = async (timesheetId) => {
  try {
    const response = await API.put(
      `/superadmin/approveTimesheet/${timesheetId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error approving expense: " + error.message);
  }
};

export const rejectTimesheet = async (timesheetId) => {
  try {
    const response = await API.put(
      `/superadmin/rejectTimesheet/${timesheetId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error rejecting expense: " + error.message);
  }
};

//Fetch Expenses

export const fetchAllExpenseData = async () => {
  const response = await API.get("/superadmin/allexpenses");
  return response.data;
};

export const approveExpense = async (expenseId) => {
  try {
    const response = await API.put(`/superadmin/approveExpense/${expenseId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error approving expense: " + error.message);
  }
};

export const rejectExpense = async (expenseId) => {
  try {
    const response = await API.put(`/superadmin/rejectExpense/${expenseId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error rejecting expense: " + error.message);
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await API.post("/api/employee/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const approveUser = async (userId) => {
  try {
    const response = await API.put(`/api/approveUser/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error approving user:", error);
    throw error;
  }
};
export const approvedPayment = async (userId) => {
  try {
    const response = await API.put(`/api/approve/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error approving user:", error);
    throw error;
  }
};

//contact from
export const contactFrom = async (data) => {
  try {
    const response = await API.post(`/api/Contact`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const registerUser = async (formData) => {
  try {
    const response = await API.post(`/api/registeruser`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const verifyOTP = async (userId, otp) => {
  if (!userId || !otp) {
    throw new Error("User ID and OTP are required");
  }

  try {
    // Use `userId` in the URL path
    const response = await API.post(`/api/verifyOTP/${userId}`, {
      otp: String(otp),
    });
    return response.data;
  } catch (error) {
    throw error.response || error;
  }
};
export const Withdrawal = async (formData) => {
  try {
    const response = await API.post(`/api/withdrawal`, formData, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProductData = async () => {
  try {
    const response = await API.get(`/api/product`);
    return response.data;
  } catch (error) {
    console.error("Error fetching dialogue sessions:", error);
    throw error;
  }
};
export const fetchProductId = async (productId) => {
  try {
    const response = await API.get(`/api/products/${productId}`);
    return response.data; // Return the product data from the API
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to load product data");
  }
};

export const ProductBookingApi = async (bookingData) => {
  try {
    // Send a POST request to the API to create the booking
    const response = await API.post(`/api/booking`, bookingData);
    return response.data;
  } catch (error) {
    // Handle errors gracefully
    console.error("Error creating booking:", error);
    throw error; // Re-throw the error so it can be handled by the calling function
  }
};
export const fetchBookingDataUserId = async (userId) => {
  try {
    const response = await API.get(`/api/bookings/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to load product data");
  }
};
export const deleteProductById = async (productId) => {
  try {
    const response = await API.delete(`/api/booking/${productId}`, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Fetch All User
export const getAllUserInSuperadmin = async () => {
  const response = await API.get(`/employee`);
  return response.data;
};

export const getAllProducts = async () => {
  const response = await API.get(`/uploaddocument`);
  return response.data;
};

// add category

export const getAllBusinessCategories = async () => {
  const response = await API.get(`/category`);
  return response.data;
};

export const DeleteCategoryBusiness = async (categoryId) => {
  try {
    const response = await API.delete(`/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    toast.error(error.response?.data?.message || "Error deleting user");
    throw error;
  }
};

export const AddProduct = async (formData) => {
  try {
    const response = await API.post(`/api/product`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const EditProduct = async (productId, formData) => {
  try {
    const response = await API.put(`/api/product/${productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await API.delete(`/api/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    toast.error(error.response?.data?.message || "Error deleting user");
    throw error;
  }
};

//get all booking product user

export const getAllBookingProduct = async () => {
  const response = await API.get(`/api/allbooking`);
  return response.data;
};
export const getProductUserId = async (userId) => {
  const response = await API.get(`/api/bookings/${userId}`);
  return response.data;
};

//  get widthdrwa rewuest

// payment request send
export const AddPaymentDetails = async (formData) => {
  try {
    const response = await API.post(`/api/payment-details`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetallPaymets = async () => {
  const response = await API.get(`/api/getAllPaymentDetails`);
  return response.data;
};

export const getPaymentUserId = async (userId) => {
  const response = await API.get(`/api/payments/${userId}`);
  return response.data.PaymentDetails;
};

////

export const getIncomeById = async (userId) => {
  const response = await API.get(`/api/addincome/${userId}`);
  return response.data;
};
export const getAllIncome = async () => {
  const response = await API.get(`/api/addincome`);
  return response.data;
};

export const AddIncomeMenual = async (formData) => {
  try {
    const response = await API.post(`/api/addincome`, formData, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const EditIncomeMenual = async (userId, formData) => {
  try {
    const response = await API.put(`/api/addincome/${userId}`, formData, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteIcome = async (userId) => {
  try {
    const response = await API.delete(`/api/addincome/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    toast.error(error.response?.data?.message || "Error deleting user");
    throw error;
  }
};

///      kjgjhbhhhvhgftuvhvuycu
export const getProfiteById = async (userId) => {
  const response = await API.get(`/api/profite/${userId}`);
  return response.data;
};

export const getAllProfiteIncome = async () => {
  const response = await API.get(`/brand`);
  return response.data.categorDocument;
};

export const EditprofitIncome = async (brandId, formData) => {
  try {
    const response = await API.put(`/brand/${brandId}`, formData, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const AddProfiteIncome = async (formData) => {
  try {
    const response = await API.post(`/brand`, formData, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteProfiteIncome = async (brandId) => {
  try {
    const response = await API.delete(`/brand/${brandId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    toast.error(error.response?.data?.message || "Error deleting user");
    throw error;
  }
};

/////////////////////================================================================================================================================

export const AddShopProduct = async (formData) => {
  try {
    const response = await API.post(`/api/shopproduct`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const EditShopProduct = async (productId, formData) => {
  try {
    const response = await API.put(`/api/shopproduct/${productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getShopProduct = async () => {
  const response = await API.get(`/api/shopproduct`);
  return response.data;
};

export const deleteShopProduct = async (productId) => {
  try {
    const response = await API.delete(`/api/shopproduct/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    toast.error(error.response?.data?.message || "Error deleting user");
    throw error;
  }
};

export const ShopProductById = async (productId) => {
  const response = await API.get(`/api/shopproducts/${productId}`);
  return response.data.Product;
};
