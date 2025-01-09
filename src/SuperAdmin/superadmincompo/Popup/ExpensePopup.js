import React, { useCallback } from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { leaveRequestValidation } from "../../Utils/validation";
import "./ExpensePopup.css";

const ExpensePopup = ({ open, onClose, onSubmit }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(leaveRequestValidation),
    });

    // Move useCallback and useDropzone inside the component
    const onDrop = useCallback(acceptedFiles => {
        // Handle file upload
        console.log(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    if (!open) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className="popup-header">
                    <h2>Expenses Claim Form</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex gap-5 popupfrom">
                        <Controller
                            name="Expense Date"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <div className="form-group">
                                    <label htmlFor="fromDate">Expense Date</label>
                                    <input
                                        {...field}
                                        type="date"
                                        placeholder="Apply Date"
                                        className={errors.fromDate ? "input-error" : ""}
                                    />
                                    <span className="error-message">
                                        {errors.fromDate?.message}
                                    </span>
                                </div>
                            )}
                        />
                        <Controller
                            name="expenseCategory" // Changed name to something more appropriate
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <div className="form-group">
                                    <label htmlFor="expenseCategory">Expense Category</label>
                                    <select {...field} id="expenseCategory">
                                        <option value="">Select Category</option>
                                        <option value="phoneBill">Phone Bill</option>
                                        <option value="healthcare">Healthcare</option>
                                        <option value="workshops">Workshops</option>
                                        <option value="software">Software</option>
                                        <option value="officeFurniture">Office Furniture</option>
                                    </select>
                                    <span className="error-message">
                                        {errors.expenseCategory?.message} {/* Updated error message reference */}
                                    </span>
                                </div>
                            )}
                        />
                    </div>
                    <div className="flex gap-5 popupfrom">
                        <Controller
                            name="Expense Description"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <div className="form-group">
                                    <label htmlFor="fromDate">Expense Description</label>
                                    <input type="text" />
                                    <span className="error-message">
                                        {errors.halfDay?.message}
                                    </span>
                                </div>
                            )}
                        />
                        <Controller
                            name="Amount"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <div className="form-group">
                                    <label htmlFor="fromDate">Amount</label>
                                    <input type="number" />
                                    <span className="error-message">{errors.type?.message}</span>
                                </div>
                            )}
                        />
                    </div>
                    <div className="file-uploaded">
                        <Controller
                            name="Receipt"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <div className="form-group">
                                    <label htmlFor="fromDate">Receipt</label>
                                    <div className="receipt-box">
                                        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
                                            <input {...getInputProps()} />
                                            <CloudUploadIcon style={{ fontSize: 50, cursor: 'pointer' }} />
                                            {isDragActive ? (
                                                <p>Drop the files here ...</p>
                                            ) : <></>}
                                        </div>
                                    </div>
                                    <span className="error-message">{errors.type?.message}</span>
                                    <h3 style={{ textAlign: 'center', fontWeight: '500' }}>Drag 'n' drop  files here</h3>
                                </div>
                            )}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="cancel-button" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="save-button">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExpensePopup;
