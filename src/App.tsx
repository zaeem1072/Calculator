import React from 'react';
import { PaperCalculator } from './components/PaperCalculator';
import { CalculatorState, PAPER_SIZES, PAPER_FORMATS } from './types/paperTypes';
import {useLocalStorage} from './components/hooks/useLocalStorage';
import './App.css';

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

const App: React.FC = () => {
  const [state, setState] = useLocalStorage<CalculatorState>('calculatorState', initialState);

  const setNumberOfSheets = (numberOfSheets: number) => {
    const newNumberOfSheets = Math.max(1, numberOfSheets);
    const totalWeight = calculatePaperWeight(
      state.customLength,
      state.customWidth,
      state.customGrammage,
      newNumberOfSheets
    );
    setState(prev => ({ ...prev, numberOfSheets: newNumberOfSheets, totalWeight }));
  };

  const incrementSheets = () => {
    const newNumberOfSheets = state.numberOfSheets + 1;
    const totalWeight = calculatePaperWeight(
      state.customLength,
      state.customWidth,
      state.customGrammage,
      newNumberOfSheets
    );
    setState(prev => ({ ...prev, numberOfSheets: newNumberOfSheets, totalWeight }));
  };

  const decrementSheets = () => {
    if (state.numberOfSheets > 1) {
      const newNumberOfSheets = state.numberOfSheets - 1;
      const totalWeight = calculatePaperWeight(
        state.customLength,
        state.customWidth,
        state.customGrammage,
        newNumberOfSheets
      );
      setState(prev => ({ ...prev, numberOfSheets: newNumberOfSheets, totalWeight }));
    }
  };

  const setSelectedFormat = (selectedFormat: string) => {
    console.log("Selected Format:", selectedFormat);
    // When format changes, also update the size to the first available size and grammage
    const sizes = PAPER_SIZES[selectedFormat];
    console.log("Available Sizes for format:", sizes);
    const format = PAPER_FORMATS[selectedFormat];
    console.log("Format Details:", format);
    const firstSize = sizes && sizes.length > 0 ? sizes[0] : null;
    console.log("First Size:", firstSize);
    if (firstSize && format) {
      const totalWeight = calculatePaperWeight(
        firstSize.length,
        firstSize.width,
        format.grammage,
        state.numberOfSheets
      );
      setState(prev => ({
        ...prev,
        selectedFormat,
        selectedSize: firstSize.id,
        customLength: firstSize.length,
        customWidth: firstSize.width,
        customGrammage: format.grammage,
        totalWeight
      }));
    } else {
      setState(prev => ({ ...prev, selectedFormat }));
    }
  };

  const setSelectedSize = (selectedSize: string) => {
    console.log("Selected Size:", selectedSize);
    const size = PAPER_SIZES[state.selectedFormat]?.find(s => s.id === selectedSize);
    if (size) {
      const totalWeight = calculatePaperWeight(
        size.length,
        size.width,
        state.customGrammage,
        state.numberOfSheets
      );
      setState(prev => ({
        ...prev,
        selectedSize,
        customLength: size.length,
        customWidth: size.width,
        totalWeight
      }));
    } else {
      setState(prev => ({ ...prev, selectedSize }));
    }
  };

  const setPaperLength = (customLength: number) => {
    const totalWeight = calculatePaperWeight(
      customLength,
      state.customWidth,
      state.customGrammage,
      state.numberOfSheets
    );
    setState(prev => ({ ...prev, customLength, totalWeight }));
  };

  const setPaperWidth = (customWidth: number) => {
    const totalWeight = calculatePaperWeight(
      state.customLength,
      customWidth,
      state.customGrammage,
      state.numberOfSheets
    );
    setState(prev => ({ ...prev, customWidth, totalWeight }));
  };

  const setPaperGrammage = (customGrammage: number) => {
    const totalWeight = calculatePaperWeight(
      state.customLength,
      state.customWidth,
      customGrammage,
      state.numberOfSheets
    );
    setState(prev => ({ ...prev, customGrammage, totalWeight }));
  };

  const appStyle: React.CSSProperties = {
    backgroundColor: "white",
    minHeight: '100vh',
  };

  return (
    <div style={appStyle}>
      <PaperCalculator
        state={state}
        setNumberOfSheets={setNumberOfSheets}
        incrementSheets={incrementSheets}
        decrementSheets={decrementSheets}
        setSelectedFormat={setSelectedFormat}
        setSelectedSize={setSelectedSize}
        setPaperLength={setPaperLength}
        setPaperWidth={setPaperWidth}
        setPaperGrammage={setPaperGrammage}
      />
    </div>
  );
};

export default App;
