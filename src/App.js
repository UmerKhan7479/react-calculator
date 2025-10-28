import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);

  // Handles number input
  const handleNumber = (num) => {
    setDisplay((prev) => (prev === '0' ? num : prev + num));
  };

  // Handles operator input
  const handleOperator = (op) => {
    if (previousValue === null) {
      setPreviousValue(parseFloat(display));
      setDisplay('0');
    } else if (operation) {
      const result = calculate(previousValue, parseFloat(display), operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }
    setOperation(op);
  };

  // Performs calculation
  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : 'Error';
      default: return b;
    }
  };

  // Handles "=" key
  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const result = calculate(previousValue, parseFloat(display), operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
    }
  };

  // Handles "C" key
  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
  };

  // Keyboard event handler
  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;

      if (!isNaN(key)) {
        handleNumber(key);
      } else if (['+', '-', '*', '/'].includes(key)) {
        handleOperator(key);
      } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        handleEquals();
      } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        handleClear();
      } else if (key === 'Backspace') {
        setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
      } else if (key === '.') {
        setDisplay((prev) => (prev.includes('.') ? prev : prev + '.'));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [display, previousValue, operation]);

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        {['7','8','9','/','4','5','6','*','1','2','3','-','0'].map((num, index) =>
          <button
            key={index}
            className={['/', '*', '-', '+'].includes(num) ? 'operator' : ''}
            onClick={() => (['/', '*', '-', '+'].includes(num) ? handleOperator(num) : handleNumber(num))}
          >
            {num}
          </button>
        )}
        <button className="clear" onClick={handleClear}>C</button>
        <button className="equals" onClick={handleEquals}>=</button>
        <button className="operator" onClick={() => handleOperator('+')}>+</button>
      </div>
    </div>
  );
}

export default App;
