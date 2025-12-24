import {useState} from 'preact/hooks';
import { formatCurrency, formatDenomination } from './helper-functions.jsx';

export default function CountingTool({onClose, onConfirm}) {
  const denominations = [100, 50, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  const [counts, setCounts] = useState(() => denominations.reduce((acc, d) => (acc[String(d)] = 0, acc), {}));
  
  const total = denominations.reduce((sum, d) => {
    const c = Number(counts[String(d)] || 0);
    return sum + c * d;
  }, 0);

  return (
     <s-section >{/* heading='Counting Tool'> */}
      {/* <s-box padding='small-100'> */}
            <s-text>Counted total: {formatCurrency(total)}</s-text>
            <s-stack direction='inline' alignItems='center' justifyContent='space-between' padding='large-100 none'>
            <s-box inlineSize='45%'>
              <s-button onClick={onClose}>Cancel</s-button>
            </s-box>
            <s-box inlineSize='45%'>
              <s-button onClick={() => onConfirm(total)}>Save</s-button>  
            </s-box>
            </s-stack>
        {/* <s-scroll-box> */}
          {denominations.map((d) => (
            // <s-text>yay</s-text>
            <>
            <s-text>{formatDenomination(d)}</s-text>
            <s-number-field 
              controls='stepper'
              value={counts[String(d)]}
              placeholder='0'
              onInput={(e) => {
              setCounts((prev) => ({...prev, [String(d)]: e.currentTarget.value}));
              }}
              inputMode='numeric'
              min={0}        
              />
            </>
            ))
            }
            {/* </s-scroll-box> */}
            {/* </s-box> */}
  </s-section>

  );
}