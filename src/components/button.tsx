import React from 'react';
interface ButtonProps {
  name: string;
  onClick?: () => void;
}
const buttonStyle: React.CSSProperties = {
  backgroundColor: '#0c1670ff',
  color: 'white',
  padding: '6px 10px',
  fontSize: '12px',
  margin: '2px',
  width: '35px',
  height: '35px',
  borderRadius: '20px',
};

function Button({ name, onClick }: ButtonProps) {
  return <button style={buttonStyle} onClick={onClick}>{name}</button>;
}

export { Button };
