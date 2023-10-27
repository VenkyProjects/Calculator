import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import SimpleInterest from './SimpleInterst';

function Calculator() {
    const [display, setDisplay] = useState('0');
    const [previous, setPrevious] = useState('0');
    const [operator, setOperator] = useState(null);
    const[interest,setInterest]=useState(false)
    const[finalInterst,setFinalInterst]=useState()
  
    const handleDisplay = (val) => {
        if (display === '0' || operator) {
          // If the display is 0 or an operator was previously clicked, replace it with the new value
            // setDisplay(val)
            setDisplay((prev) => (prev === '0' ? val : prev + val));
        } else {
          // Append the value to the current display
          setDisplay(display+val)
        //   setDisplay((prev) => (prev === '0' ? val : prev + val));
        }
    };

    const handleClear = () => {
        setDisplay('0');
        setPrevious('0');
        setOperator(null);
    };
  
    const handleOperator = (newOperator) => {
        if (operator) {
          // If an operator is already set, perform the previous operation before setting the new operator
          handleEquals();
        } else {
          // If no operator is set, simply update the operator and store the current display as the previous
          setPrevious(display);
          setOperator(newOperator);
          setDisplay('0');
        }
    };

    const handleEquals = () => {
        if (operator || previous !== '0') {
          // Perform the calculation when there is an operator and a previous value
          const result = calculate(parseFloat(previous), parseFloat(display), operator);
          setDisplay(result.toString());
          setPrevious(result.toString());
          setOperator(null);
        }
    };
    const calculate = (num1, num2, op) => {
        switch (op) {
          case '+':
            return num1 + num2;
          case '-':
            return num1 - num2;
          case 'x':
            return num1 * num2;
          case '/':
            return num1 / num2;
          default:
            return num2;
        }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleKeyboardInput = (event) => {
        const key = event.key;
    
        if (/[0-9]/.test(key)) {
          handleDisplay(key);
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
          handleOperator(key);
        } else if (key === 'Enter' || key === '=') {
          handleEquals();
        } else if (key === 'Delete') {
          handleClear();
        }
    };
    useEffect(() => {
        window.addEventListener('keydown', handleKeyboardInput);
        return () => {
          window.removeEventListener('keydown', handleKeyboardInput);
        };
    }, [handleKeyboardInput]);
    let fontSize = '48px';
    if (display.length > 10 && display.length < 15) {
        fontSize = '35px';
    }
    if (display.length >= 15 && display.length < 30) {
        fontSize = '20px';
  }
  const handleSimpleInterst=()=>{
    setInterest(!interest)
  }
  return (
    <>
    {!interest && (
    <div className={styles.top}>
      <div style={{fontSize}} className={styles.display}>{display}</div>
      
        <div className={styles.buttons}>
        <button onClick={() => handleClear()} className={styles.symbols}>
          AC
        </button>
        <button className={styles.symbols}>+/-</button>
        <button className={styles.symbols}>%</button>
        <button onClick={() => handleOperator('/')} className={styles.operations}>
          /
        </button>
        <button className={styles.digits} onClick={() => handleDisplay('7')}>
          7
        </button>
        <button className={styles.digits} onClick={() => handleDisplay('8')}>
          8
        </button>
        <button className={styles.digits} onClick={() => handleDisplay('9')}>
          9
        </button>
        <button onClick={() => handleOperator('x')} className={styles.operations}>
          x
        </button>
        <button className={styles.digits} onClick={() => handleDisplay('4')}>
          4
        </button>
        <button className={styles.digits} onClick={() => handleDisplay('5')}>
          5
        </button>
        <button className={styles.digits} onClick={() => handleDisplay('6')}>
          6
        </button>
        <button onClick={() => handleOperator('-')} className={styles.operations}>
          -
        </button>
        <button className={styles.digits} onClick={() => handleDisplay('1')}>
          1
        </button>
        <button className={styles.digits} onClick={() => handleDisplay('2')}>
          2
        </button>
        <button className={styles.digits} onClick={() => handleDisplay('3')}>
          3
        </button>
        <button onClick={() => handleOperator('+')} className={styles.operations}>
          +
        </button>
        <button className={styles.digits} onClick={() => handleDisplay('0')}>
          0
        </button>
        <button className={styles.digits} onClick={() => handleDisplay('.')}>
          .
        </button>
        <button onClick={() => handleEquals()} className={styles.operations}>
          =
        </button>
        <button onClick={() => handleSimpleInterst()} className={styles.digits}>
          Simple Interest
        </button>
        {/* <button onClick={() => handleEquals()} className={styles.digits}>
          Compound Interest
        </button> */}
      </div>
      
      
    </div>
    )} 
    {interest && (
      <div className={styles.second}>
          <div className={styles.first_div}>
            <span>Simple Calculator</span>
            <div className={styles.para}>calculate Your Simple Interst Easly</div>
          </div>
          <div className={styles.rectangle}>
            <div>{finalInterst? finalInterst : 0}</div>
            Simple Interest
          </div>
          <div className={styles.formdata}>
            <SimpleInterest setFinalInterst={setFinalInterst} setInterest={setInterest} interest={interest}/>
          </div>
      </div>
    )}
    </>
  );
}

export default Calculator;
