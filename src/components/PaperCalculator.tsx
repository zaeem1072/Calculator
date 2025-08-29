import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNumberOfSheets, incrementSheets, decrementSheets } from '../store/calculatorSlice';
import { Button } from './button';
import { RootState, AppDispatch } from '../store/store';
import { PaperSelector } from './types_size';
import {NumberRangeSelector} from "./slider"

const PaperCalculator: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { numberOfSheets, totalWeight } = useSelector((state: RootState) => state.calculator);
  const [inputValue, setInputValue] = useState<string | number>(numberOfSheets);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    dispatch(setNumberOfSheets(Number(inputValue)));
    setIsEditing(false);
  };

  const mainContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px',
    gap: '24px',
  };

  const rightContainerStyle = {
    flex: 1,
    padding: '24px',
    backgroundColor: '#80dbc2ff',
    borderRadius: '16px',
    textAlign: 'center' as const,
  };

  const sheetDisplayStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3d4583ff',
    borderRadius: '16px',
    padding: '24px',
    minWidth: '120px',
    minHeight: '200px',
  };

  const titleStyle  = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '24px',
  };

  const weightStyle = {
    fontSize: '20px',
    color: '#3498db',
    marginBottom: '16px',
  };

  const sheetsCountStyle = {
    fontSize: '18px',
    color: '#2c3e50',
    marginTop: '16px',
    fontWeight: 'bold',
  };


  return (
    <>
    <div style={mainContainerStyle}>
      <div style={rightContainerStyle}>
        {isEditing ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
              }}
            />
          </div>
        ) : (
          <h1
              onClick={() => {
              setInputValue(numberOfSheets);
              setIsEditing(true);
            }}
          >
            Sheets : {numberOfSheets}
          </h1>
        )}

        <h1 style={titleStyle}>Paper Calculator</h1>
        <p style={weightStyle}>Total Weight: {totalWeight.toFixed(2)} g</p>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'center' }}>
          <Button name="-" onClick={() => dispatch(decrementSheets())} />
          <Button name="+" onClick={() => dispatch(incrementSheets())} />
        </div>
      </div>
    </div>
    <PaperSelector />
    <NumberRangeSelector />
    </>
  );
};

export { PaperCalculator };
