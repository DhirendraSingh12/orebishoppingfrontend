import React, { useState } from "react";
import SearchInput from "../SearchTextField/index";
import IconMapper from "../IconMapper/IconMapper";
import "./Commonheader.css";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { Checkbox } from "@mui/material";
const CommonHeader = ({
  title,
  searchTerm,
  setSearchTerm,
  handleDeleteSelected,
  selectedPayslips = [],
  handleAddClick,
  showIcons,
  selectedDocuments = [],
  currentDocuments = [],
  handleSelectAll,
  handleRefreshClick
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleTrashClick = () => {
    if (selectedPayslips.length > 0) {
      setModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    handleDeleteSelected();
  };
  return (
    <div className="payslips-header">
      <div className="flex  input-text">
        <div className="checkboxcommonheader">
          <Checkbox
            checked={
              selectedDocuments.length === currentDocuments.length &&
              currentDocuments.length > 0
            }
            indeterminate={
              selectedDocuments.length > 0 &&
              selectedDocuments.length < currentDocuments.length
            }
            onChange={handleSelectAll}/>
        </div>
        <SearchInput
          className="SearchInput"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
        />
        
      </div>
      <div className="payslips-actions">
        {showIcons.plus && (
          <div className="Icon-css" onClick={handleAddClick}>
            <IconMapper iconName="plus" isFontAwesome={true} />
          </div>
        )}
        {showIcons.rotate && (
          <div className="Icon-css"  onClick={handleRefreshClick}>
            <IconMapper iconName="rotate" isFontAwesome={true} />
          </div>
        )}
        {showIcons.trash && selectedPayslips.length > 0 && (
          <div
            className="text-delete Icon-css"
            onClick={handleTrashClick}
            style={{
              cursor: selectedPayslips.length === 0 ? "not-allowed" : "pointer",
            }}
          >
            <IconMapper iconName="trash" isFontAwesome={true} />
          </div>
        )}
       
      </div>
      <ConfirmationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={'Are you sure you want to delete'}
        message={'Are you sure you want to delete'}
      />
    </div>
  );
};

export default CommonHeader;
