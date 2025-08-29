import React, { useState, useEffect } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { setPaperGrammage, setPaperLength, setPaperWidth } from '../store/calculatorSlice';
import { RootState } from '../store/store';

function NumberRangeSelector() {
  const { customLength, customWidth, customGrammage } = useSelector((state: RootState) => state.calculator);
  const [length, setLength] = useState<[number, number]>([0, customLength]);
  const [width, setWidth] = useState<[number, number]>([0, customWidth]);
  const [grammage, setGrammage] = useState<[number, number]>([0, customGrammage]);

  const dispatch = useDispatch();

  useEffect(() => {
    setLength([0, customLength]);
    setWidth([0, customWidth]);
    setGrammage([0, customGrammage]);
  }, [customLength, customWidth, customGrammage]);

  const handleLengthChange = (newLength: [number, number]) => {
    // console.log(newLength);
    setLength(newLength);
    dispatch(setPaperLength(newLength[1]));
  };

  const handleWidthChange = (newWidth: [number, number]) => {
    setWidth(newWidth);
    dispatch(setPaperWidth(newWidth[1]));
  };

  const handleGrammageChange = (newGrammage: [number, number]) => {
    setGrammage(newGrammage);
    dispatch(setPaperGrammage(newGrammage[1]));
  };


  const sliderStyles = {
    marginTop: '20px',
    marginLeft: '50px',
    marginRight: '50px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    height: '220px',
    borderRadius: '20px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07)',
    padding: '25px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  };

  return (
    <div style={sliderStyles}>
      <div >
        <p >Length: {length[1]} mm</p>
        <RangeSlider
          min={0}
          max={700}
          step={1}
          value={length}
          onInput={handleLengthChange}
        />
      </div>

      <div >
        <p >Width: {width[1]} mm</p>
        <RangeSlider
          min={0}
          max={700}
          step={1}
          value={width}
          onInput={handleWidthChange}
        />
      </div>

      <div >
        <p >Grammage: {grammage[1]} gsm</p>
        <RangeSlider
          min={0}
          max={500}
          step={1}
          value={grammage}
          onInput={handleGrammageChange}
        />
      </div>
    </div>
  );
}

export { NumberRangeSelector };
