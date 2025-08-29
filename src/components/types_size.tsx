import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { PAPER_FORMATS, PAPER_SIZES } from "../types/paperTypes";
import { RootState, AppDispatch } from '../store/store';

import { setSelectedFormat, setSelectedSize } from "../store/calculatorSlice";

function PaperSelector() {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedFormat, selectedSize } = useSelector((state: RootState) => state.calculator);
  const handleFormatSelect = (formatId: string) => {
    dispatch(setSelectedFormat(formatId));
    const sizes = PAPER_SIZES[formatId];
    if (sizes && sizes.length > 0) {
      dispatch(setSelectedSize(sizes[0].id));
    }
  };

  const handleSizeSelect = (sizeId: string) => {
    dispatch(setSelectedSize(sizeId));
  };

  const typeStyles = {
    padding: "20px",
    marginLeft: "500px",
  }
  return (
    <div style={ typeStyles }>
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        {Object.values(PAPER_FORMATS).map((format) => (
          <button
            key={format.id}
            onClick={() => handleFormatSelect(format.id)}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor:
                selectedFormat === format.id ? "#5c6bc0" : "#f5f5f5",
              color: selectedFormat === format.id ? "#fff" : "#333",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {format.name}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {PAPER_SIZES[selectedFormat]?.map((size) => (
          <button
            key={size.id}
            onClick={() => handleSizeSelect(size.id)}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              backgroundColor:
                selectedSize === size.id ? "#29b6f6" : "#f5f5f5",
              color: selectedSize === size.id ? "#fff" : "#333",
              cursor: "pointer",
            }}
          >
            {size.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export {PaperSelector};
