import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Checkbox from "@mui/material/Checkbox";
import TablePagination from "@mui/material/TablePagination";
import CommonHeader from "../../superadmincompo/CommonHeader/index";
import { useParams } from "react-router-dom";

import { approvedPayment, getProductUserId } from "../../ApiServices";

const ITEMS_PER_PAGE = 6;

const AdminTimesheet = () => {
  const { userId } = useParams();
  const [timesheetData, setTimesheetData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [selectedTimesheets, setSelectedTimesheets] = useState([]);

  const fetchTimesheets = async () => {
    setLoading(true);
    try {
      const data = await getProductUserId(userId);
      console.log(data)
      const userSpecificData = data.bookings
        .filter((item) => item.userId === userId)
        .map((item) => ({
          ...item,
          isApproved: item.status === "approved", // Assuming your API returns a status field
        }));
      setTimesheetData(userSpecificData || []);
      console.log(userSpecificData)

    } catch (error) {
      console.error("Failed to fetch timesheets:", error);
      setTimesheetData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimesheets();
  }, [userId]);

  useEffect(() => {
    const newOffset = page * rowsPerPage;
    setCurrentItems(timesheetData.slice(newOffset, newOffset + rowsPerPage));
  }, [page, rowsPerPage, timesheetData]);

  const handleRefreshClick = () => {
    fetchTimesheets();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAll = () => {
    if (selectedTimesheets.length === currentItems.length) {
      setSelectedTimesheets([]);
    } else {
      const allTimesheetIds = currentItems.map((item) => item._id);
      setSelectedTimesheets(allTimesheetIds);
    }
  };

  const handleSelectTimesheet = (timesheetId) => {
    if (selectedTimesheets.includes(timesheetId)) {
      setSelectedTimesheets(
        selectedTimesheets.filter((id) => id !== timesheetId)
      );
    } else {
      setSelectedTimesheets([...selectedTimesheets, timesheetId]);
    }
  };

  const handleApprove = async (bookingId) => {
    try {
      await approvedPayment(bookingId);

      // Update the local state immediately
      setTimesheetData((prevData) =>
        prevData.map((timesheet) =>
          timesheet._id === bookingId
            ? { ...timesheet, isApproved: true, status: "approved" }
            : timesheet
        )
      );

      toast.success("Payment approved successfully");
    } catch (error) {
      console.error("Failed to approve payment:", error);
      toast.error("Failed to approve payment");
    }
  };

  return (
    <div>
      <div className="AdminDocument-table-container">
        <CommonHeader
          showSearchFilter={true}
          showIcons={{ plus: false, trash: false, rotate: true }}
          handleRefreshClick={handleRefreshClick}
        />
        {loading ? (
          <p>Loading</p>
        ) : (
          <div className="AdminDocument-tablebody">
            <table className="AdminDocument-table-data">
              <thead>
                <tr>
                  <th style={{ padding: "5px" }}>
                    <Checkbox
                      checked={
                        selectedTimesheets.length === currentItems.length &&
                        currentItems.length > 0
                      }
                      indeterminate={
                        selectedTimesheets.length > 0 &&
                        selectedTimesheets.length < currentItems.length
                      }
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Product ID</th>
                  <th>UserName</th>
                  <th>Title</th>
                  <th>Income</th>
                  <th>Percentage</th>
                  <th>Booking Date</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((timesheet) => (
                  <tr key={timesheet._id}>
                    <td style={{ padding: "5px", textAlign: "left" }}>
                      <Checkbox
                        checked={selectedTimesheets.includes(timesheet._id)}
                        onChange={() => handleSelectTimesheet(timesheet._id)}
                      />
                    </td>
                    <td data-label="Product ID">{timesheet.productId}</td>
                    <td data-label="Product ID">{timesheet.firstName}</td>

                    <td data-label="Title">{timesheet.title}</td>
                    <td data-label="Income">{timesheet.income}</td>
                    <td data-label="Income">{timesheet.Persantage}</td>

                    <td data-label="Booking Date">{timesheet.bookingDate}</td>
                    <td data-label="Payment Status">
                      <div className="d-flex gap-2 ">
                        {timesheet.isApproved ? (
                          <span className="text-success">Approved</span>
                        ) : (
                          <>
                            <span className="text-warning">Pending</span>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => handleApprove(timesheet.userId)}
                            >
                              Approve
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
          }}
        >
          <TablePagination
            component="div"
            count={timesheetData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AdminTimesheet;
