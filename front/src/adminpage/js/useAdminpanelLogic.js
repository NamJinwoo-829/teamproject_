import { useState } from "react";
import { Panel_PostData } from "../js/admnsdbPost";

export function useAdminPanelLogic(initLocations, onClose) {
  const [locations, setLocations] = useState(initLocations);
  const [showAddPanel, setShowAddPanel] = useState(false);

  const [wages, setWages] = useState(() => {
    const initial = {};
    initLocations.forEach((loc) => {
      initial[loc] = "";
    });
    return initial;
  });

  const handleWageChange = (location, value) => {
    setWages((prev) => ({
      ...prev,
      [location]: value,
    }));
  };

  const handleDeletLocation = (locationDelet) => {
    setLocations((prev) => prev.filter((loc) => loc !== locationDelet));
    setWages((prev) => {
      const copy = { ...prev };
      delete copy[locationDelet];
      return copy;
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payLoad = {
      data_type: "user_login_info",
      data: wages,
    };
    try {
      const result = await Panel_PostData(payLoad);
      console.log("저장 성공", result);
      onClose();
    } catch (err) {
      alert("저장 중 오류 발생");
    }
  };

  const handleAddNewCompany = (company, wage) => {
    if (locations.includes(company)) {
      alert("이미 존재하는 회사입니다.");
      return;
    }
    setLocations((prev) => [...prev, company]);
    setWages((prev) => ({ ...prev, [company]: wage }));
  };

  return {
    locations,
    wages,
    showAddPanel,
    setShowAddPanel,
    handleWageChange,
    handleDeletLocation,
    handleSave,
    handleAddNewCompany,
  };
}
