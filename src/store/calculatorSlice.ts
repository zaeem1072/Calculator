import { createSlice } from '@reduxjs/toolkit';
import { CalculatorState, PAPER_SIZES } from '../types/paperTypes';

const calculatePaperWeight = (length: number, width: number, grammage: number, numberOfSheets: number): number => {
  const l = length / 1000;
  const w = width / 1000;
  const a = l * w;
  return a * grammage * numberOfSheets;
};

const initialState: CalculatorState = {
  numberOfSheets: 1,
  selectedFormat: 'din_a',
  selectedSize: 'a4',
  customLength: 210,
  customWidth: 297,
  customGrammage: 80,
  totalWeight: calculatePaperWeight(210, 297, 80, 1),
};

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    setNumberOfSheets: (state, action) => {
      state.numberOfSheets = Math.max(1, action.payload);
      state.totalWeight = calculatePaperWeight(
        state.customLength,
        state.customWidth,
        state.customGrammage,
        state.numberOfSheets
      );
    },
    incrementSheets: (state) => {
      state.numberOfSheets += 1;
      state.totalWeight = calculatePaperWeight(
        state.customLength,
        state.customWidth,
        state.customGrammage,
        state.numberOfSheets
      );
    },
    decrementSheets: (state) => {
      if (state.numberOfSheets > 1) {
        state.numberOfSheets -= 1;
        state.totalWeight = calculatePaperWeight(
          state.customLength,
          state.customWidth,
          state.customGrammage,
          state.numberOfSheets
        );
      }
    },
    setSelectedFormat: (state, action) => {
      state.selectedFormat = action.payload;
    },
    setSelectedSize: (state, action) => {
      state.selectedSize = action.payload;
      const size = PAPER_SIZES[state.selectedFormat]?.find(s => s.id === action.payload);
      if (size) {
        state.customLength = size.length;
        state.customWidth = size.width;
        state.totalWeight = calculatePaperWeight(
          state.customLength,
          state.customWidth,
          state.customGrammage,
          state.numberOfSheets
        );
      }
    },

    setPaperLength: (state, action) => {
      state.customLength = action.payload;
      state.totalWeight = calculatePaperWeight(
        state.customLength,
        state.customWidth,
        state.customGrammage,
        state.numberOfSheets
      );
    },
    setPaperWidth: (state, action) => {
      state.customWidth = action.payload;
      state.totalWeight = calculatePaperWeight(
        state.customLength,
        state.customWidth,
        state.customGrammage,
        state.numberOfSheets
      );
    },
    setPaperGrammage: (state, action) => {
      state.customGrammage = action.payload;
      state.totalWeight = calculatePaperWeight(
        state.customLength,
        state.customWidth,
        state.customGrammage,
        state.numberOfSheets
      );
    },
  },
});

export const { setNumberOfSheets, incrementSheets, decrementSheets, setSelectedFormat, setSelectedSize, setPaperLength, setPaperWidth, setPaperGrammage } = calculatorSlice.actions;

export default calculatorSlice.reducer;
