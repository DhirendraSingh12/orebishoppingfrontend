import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { leaveRequestValidation } from "../../Utils/validation";
import "./Popup.css";
const PopupForm = ({ open, onClose, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(leaveRequestValidation),
  });
  if (!open) return null;
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <h2>New Leave Request</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-5 popupfrom">
            <Controller
              name="fromDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div className="form-group">
                  <label htmlFor="fromDate">Start Date</label>

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
              name="toDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div className="form-group">
                  <label htmlFor="fromDate">End Date</label>

                  <input
                    {...field}
                    type="date"
                    className={errors.toDate ? "input-error" : ""}
                  />
                  <span className="error-message">
                    {errors.toDate?.message}
                  </span>
                </div>
              )}
            />
          </div>
          <div className="flex gap-5 popupfrom">
            <Controller
              name="Partial days"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div className="form-group">
                  <label htmlFor="fromDate">Partial days</label>
                  <select
                    {...field}
                    className={errors.halfDay ? "input-error" : ""}
                  >
                    <option value="">Select</option>
                    <option value="halfday">Halfday</option>
                    <option value="fullday">Fullday</option>
                  </select>
                  <span className="error-message">
                    {errors.halfDay?.message}
                  </span>
                </div>
              )}
            />
            <Controller
              name="type"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div className="form-group">
                  <label htmlFor="fromDate">type</label>

                  <select
                    {...field}
                    className={errors.type ? "input-error" : ""}
                  >
                    <option value="">Select</option>
                    <option value="sick">Sick</option>
                    <option value="casual">Casual</option>
                  </select>
                  <span className="error-message">{errors.type?.message}</span>
                </div>
              )}
            />
          </div>
          <div className="">
            <Controller
              name="reason"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div className="form-group">
                  <label>Reason*</label>
                  <textarea
                    {...field}
                    rows="4"
                    className={errors.reason ? "input-error" : ""}
                  />
                  <span className="error-message">
                    {errors.reason?.message}
                  </span>
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

export default PopupForm;
