import React, { useContext } from "react";
import AdminPanel from "../adminpage-Front/admnsButon";
import '../css/adminInformation.css';
import UserContext from "../../login/js/userContext";
import { useAdminInformationLogic } from "../js/useAdminInformationLogic";

const AdminInformation = ({ person, onClose, onSave }) => {
  const {
    formData,
    showPanel,
    handleChange,
    handleSubmit,
    handleShowPanel,
    handleBackFromPanel,
    locationsList,
  } = useAdminInformationLogic(person, onClose, onSave);

  if (showPanel) {
    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          <AdminPanel onClose={handleBackFromPanel} locations={locationsList} />
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>정보 수정</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>사원 번호: </label>
            <span>{formData.employee_number}</span>
          </div>
          <div>
            <label>이름: </label>
            <span>{formData.user_name}</span>
          </div>
          <div>
            <label>주민등록번호: </label>
            <span>{formData.resident_number}</span>
          </div>
          <div>
            <label>주소: </label>
            <input name="address" value={formData.address || ""} onChange={handleChange} />
          </div>
          <div>
            <label>전화번호: </label>
            <input name="phone_number" value={formData.phone_number || ""} onChange={handleChange} />
          </div>
          <button type="submit">저장</button>
          <button type="button" className="closeBtn" onClick={onClose}>X</button>
          <button type="button" onClick={handleShowPanel}>일급</button>
        </form>
      </div>
    </div>
  );
};

export default AdminInformation;
