import React, { useState, useEffect } from "react";
import "./ProfiteIncomeAll.css";
import Checkbox from "@mui/material/Checkbox";
import TablePagination from "@mui/material/TablePagination";
import CommonHeader from "../../superadmincompo/CommonHeader/index";
import ProductProfit from "./ProfitePopup";
import {   deleteProfiteIncome, getAllProfiteIncome } from "../../ApiServices";
import IconMapper from "../../superadmincompo/IconMapper/IconMapper";
import ConfirmationModal from "../../superadmincompo/ConfirmationModal/ConfirmationModal";
const ITEMS_PER_PAGE = 6;

const ALLProfiteIncome = () => {
  const [documentsData, setDocumentsData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ITEMS_PER_PAGE);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null); 


  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await getAllProfiteIncome();
      console.log(response);
      setDocumentsData(response);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    const filteredData = documentsData.filter((document) => {
      const matchesSearch = document.brandName.toLowerCase().includes(
        searchQuery.toLowerCase()
      );
      const matchesStatus = statusFilter
        ? document.state === statusFilter
        : true;

      return matchesSearch && matchesStatus;
    });
    const newOffset = page * rowsPerPage;
    setCurrentItems(filteredData.slice(newOffset, newOffset + rowsPerPage));
  }, [searchQuery, page, rowsPerPage, documentsData, statusFilter]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectDocuments = (id) => {
    setSelectedDocuments((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedDocuments(currentItems.map((item) => item._id));
    } else {
      setSelectedDocuments([]);
    }
  };

  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedDocuments.map(async (brandId) => {
          await deleteProfiteIncome(brandId);
        })
      );
      fetchDocuments(); // Refresh list after deletion
      setSelectedDocuments([]);
      setPage(0);
    } catch (error) {
      console.error("Error deleting selected products:", error);
    }
  };

  const handleAddClick = () => {
    setProductToEdit(null)
    setIsPopupOpen(true);
  };
  const handleEditClick = (product) => {
    setProductToEdit(product)
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleFormSubmit = (data) => {
    console.log("Form Submitted", data);
    setIsPopupOpen(false);
  };

  const handleRefreshClick = () => {
    fetchDocuments();
  }

  const handleOpenConfirmationModal = (brandId) => {
    setDocumentToDelete(brandId);
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setDocumentToDelete(null);
    setShowConfirmationModal(false);
  };
  
  const handleConfirmDelete = async () => {
    if (documentToDelete) {
      try {
        await deleteProfiteIncome(documentToDelete); 
        fetchDocuments(); 
        setShowConfirmationModal(false); 
      } catch (error) {
        console.error("Error deleting product:", error);
      } finally {
        setDocumentToDelete(null);
      }
    }
  };

  return (
    <div>
      <div className="AdminDocument-table-container">
        <CommonHeader
          searchTerm={searchQuery}
          setSearchTerm={setSearchQuery}
          handleDeleteSelected={handleDelete}
          selectedPayslips={selectedDocuments}
          showIcons={{ plus: true, trash: true, rotate: true }}
          handleSelectAll={handleSelectAll}
          currentDocuments={currentItems}
          selectedDocuments={selectedDocuments}
          setStatusFilter={setStatusFilter}
          statusFilter={statusFilter}
          showStatusFilter={true}
          handleAddClick={handleAddClick}
          showSearchFilter={true}
          handleRefreshClick={handleRefreshClick}
        />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="AdminDocument-tablebody">
            <table className="AdminDocument-table-data">
              <thead>
                <tr>
                  <th style={{ padding: "5px" }}>
                    <Checkbox
                      checked={
                        selectedDocuments.length === currentItems.length &&
                        currentItems.length > 0
                      }
                      indeterminate={
                        selectedDocuments.length > 0 &&
                        selectedDocuments.length < currentItems.length
                      }
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>brandName</th>
                 
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((document) => (
                  <tr key={document._id}>
                    <td style={{ padding: "5px", textAlign: "left" }}>
                      <Checkbox
                        checked={selectedDocuments.includes(document._id)}
                        onChange={() => handleSelectDocuments(document._id)}
                      />
                    </td>
                    <td data-label="productId">{document.brandName}</td>
                   
                   

                    
                    <td data-label="Action">
                      <div className="AdminAction-DataButon">
                      <button
                        className="assets-edit-button"
                        onClick={() => handleEditClick(document)}  
                      >
                        <IconMapper iconName={"pen"} isFontAwesome={true} />
                      </button>
                        <button
                          className="AdminText-delete"
                          onClick={() =>
                            handleOpenConfirmationModal(document.brandId)
                          }
                        >
                          <IconMapper
                            iconName="Deletebtn"
                            className="AdminDeletebtnView"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="AdminDocument-pagination-table-container">
              <TablePagination
                rowsPerPageOptions={[ITEMS_PER_PAGE, 10, 25]}
                component="div"
                count={documentsData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </div>
          </div>
        )}
      </div>
      <ConfirmationModal
          open={showConfirmationModal}
          onClose={handleCloseConfirmationModal}
          onConfirm={handleConfirmDelete}
          title="Delete Product"
          message="Are you sure you want to delete this Product?"
        />
        <ProductProfit
        open={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={handleFormSubmit}
        product={productToEdit}
        fetchDocuments={fetchDocuments}
      />
    </div>
  );
};

export default ALLProfiteIncome;
