import * as Yup from "yup";

export const signupValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First Name is too short")
    .max(50, "First Name is too long")
    .required("First Name is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),

  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),

  address: Yup.string()
    .min(5, "Address is too short")
    .required("Address is required"),

  aadharCard: Yup.mixed()
    .required("Aadhaar Card is required")
    .test(
      "fileSize",
      "File size is too large, should be less than 5MB",
      (value) => value && value.size <= 5242880 // 5MB
    )
    .test(
      "fileType",
      "Only PDF and image files are accepted",
      (value) =>
        value &&
        ["application/pdf", "image/jpeg", "image/png"].includes(value.type)
    ),

  panCard: Yup.mixed()
    .required("PAN Card is required")
    .test(
      "fileSize",
      "File size is too large, should be less than 5MB",
      (value) => value && value.size <= 5242880 // 5MB
    )
    .test(
      "fileType",
      "Only PDF and image files are accepted",
      (value) =>
        value &&
        ["application/pdf", "image/jpeg", "image/png"].includes(value.type)
    ),
});
export const AssetsValidation = Yup.object().shape({
  employeeId: Yup.string().required("Employee ID is required"),
  employeeName: Yup.string().required("Employee Name is required"),
  assetType: Yup.string().required("Asset Type is required"),
  dateGiven: Yup.date().required("Date Given is required").nullable(), // Ensure it's validated as a date
  estimatedValue: Yup.string().required("Estimated Value is required"),
  serialNumber: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Serial Number must be alphanumeric")
    .required("Serial Number is required"),
  insuranceDetails: Yup.string(),
});
export const MeetingShedulValidation = Yup.object().shape({
  meetingType: Yup.string().required("Meeting Type is required"),
  employeeId: Yup.string().required("Employee ID is required"),
  reviewDate: Yup.date().required("Review Date is required"),
  commentsAndNotes: Yup.string().required("Comments are required"),
  nextMeetingDate: Yup.date().required("Next Meeting Date is required"),
  meetingURL: Yup.string().required("Meeting URL is required"),
});
export const AddDocumentValidation = Yup.object().shape({
  ProductName: Yup.string().required("ProductName name is required"),
  Description: Yup.string().required("Description name is required"),
  Months: Yup.string().required("Months name is required"),
  Income: Yup.date().required("Income is required").nullable(),
  Persantage: Yup.string().required("Persantage is required"),
  image: Yup.mixed()
    .required("A file is required")
    .test("fileType", "Only PDF, JPEG, and PNG files are allowed", (value) => {
      const validTypes = ["application/pdf", "image/jpeg", "image/png"];
      return value && validTypes.includes(value.type);
    }),
});

export const ShopProductValidation = Yup.object().shape({
  ProductName: Yup.string().required("ProductName name is required"),
  Description: Yup.string().required("Description name is required"),

  Income: Yup.date().required("Income is required").nullable(),
  Kilogram: Yup.string().required("Kilogram is required"),
  image: Yup.mixed()
    .required("A file is required")
    .test("fileType", "Only PDF, JPEG, and PNG files are allowed", (value) => {
      const validTypes = ["application/pdf", "image/jpeg", "image/png"];
      return value && validTypes.includes(value.type);
    }),
});

export const AddIcomeValidation = Yup.object().shape({
  brandName: Yup.string().required("brandName name is required"),
  
});
export const AddCategoryBusniess = Yup.object().shape({
  categoryName: Yup.string().required("Category name is required"),

});
export const otpValidationSchema = Yup.object().shape({
  otp: Yup.string()
    .length(6, "OTP must be 6 digits")
    .required("OTP is required"),
});
export const PaymentValidation = Yup.object().shape({
  amount: Yup.string().required("amount  is required"),
  date: Yup.string().required("date  is required"),
  paymentscreensort: Yup.mixed()
    .required("A file is required")
    .test("fileType", "Only image files are allowed", (value) => {
      return value && ["image/jpeg", "image/png"].includes(value.type);
    }),
  // ProductName: Yup.string().required("ProductName  is required"),
});
