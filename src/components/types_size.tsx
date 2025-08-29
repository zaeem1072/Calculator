import { PAPER_FORMATS, PAPER_SIZES, CalculatorState } from "../types/paperTypes";

interface PaperSelectorProps {
  state: CalculatorState;
  setSelectedFormat: (format: string) => void;
  setSelectedSize: (size: string) => void;
}

function PaperSelector({ state, setSelectedFormat, setSelectedSize }: PaperSelectorProps) {
  const { selectedFormat, selectedSize } = state;
  console.log("PaperSelector render - selectedFormat:", selectedFormat, "selectedSize:", selectedSize);
  const handleFormatSelect = (formatId: string) => {
    setSelectedFormat(formatId);
  };


  const handleSizeSelect = (sizeId: string) => {
    setSelectedSize(sizeId);
  };

  const typeStyles = {
    padding: "20px",
    marginLeft: "500px",
  }
  return (
    <div style={typeStyles}>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
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

export { PaperSelector };
