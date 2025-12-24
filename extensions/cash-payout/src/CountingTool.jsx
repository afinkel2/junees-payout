import {useState} from 'preact/hooks';
import { formatCurrency, formatDenomination } from './helper-functions.jsx';

export default function CountingTool({onClose, onConfirm}) {
  const denominations = [100, 50, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  const [counts, setCounts] = useState(() => denominations.reduce((acc, d) => (acc[String(d)] = 0, acc), {}));
  //const [stateChangeFlag, setStateChangeFlag] = useState(false); // to force re-render
  
  const total = denominations.reduce((sum, d) => {
    const c = Number(counts[String(d)] || 0);
    return sum + c * d;
  }, 0);

  function increment(denomination, amount) {
    setCounts(prev => {
      const prevAmt = Number(prev[String(denomination)] || 0);
      const next = Math.max(0, prevAmt + Number(amount || 0));
      return { ...prev, [String(denomination)]: next };
    });
    //setStateChangeFlag((f) => !f);
  }
  return (
      // <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999}}>
      // <div style={{background: '#fff', padding: 20, borderRadius: 8, width: 480, maxWidth: '95%'}}>
       
     <s-section heading='Counting Tool'>
      <s-box padding='small-100'>
        {/* <s-scroll-box> */}
          {denominations.map((d) => (
            // <s-text>yay</s-text>
            <>
            <s-text>{formatDenomination(d)}</s-text>
            <InputCashAmountRow
            denomination={d}
            amt={counts[String(d)]}
            updateCount={(e) => {
              setCounts((prev) => ({...prev, [String(d)]: e.currentTarget.value}));
              }}
            //updateCount={updateDenominationAmount}
            increment={(amount) => increment(d, amount)}
            //flag ={stateChangeFlag}
            />
            </>
            ))
            }
            {/* </s-scroll-box> */}
            <s-text>Counted total: {formatCurrency(total)}</s-text>
            <s-button onClick={onClose}>Cancel</s-button>
            <s-button onClick={() => onConfirm(total)}>Save</s-button>  
            </s-box>
  </s-section>

  );
}


 function InputCashAmountRow({updateCount, denomination, amt, increment}) {
  //const [count, setCount] = useState(amt);
   return(//<s-text>testing</s-text>  
    <s-stack direction="inline" justifyContent="space-between" alignItems='center'//gap="small" padding="small"
    >
      <s-box maxInlineSize='30%' minInlineSize='30%'>
       <s-button variant="secondary" onClick={() =>increment(-1)}
       >-</s-button>
       </s-box>
       <s-box maxInlineSize='30%' minInlineSize='30%' maxBlockSize='80%'>
        <s-number-field 
         value={amt}
         placeholder='0'
         onInput={(e) => {updateCount(e);}}// setCount(e.currentTarget.value);}} 
         inputMode='numeric'
         min={0}        
         />
         </s-box>
       <s-box maxInlineSize='30%' minInlineSize='30%'>
         <s-button variant='primary' onClick={() =>{increment(1);}}// setCount((prev) => Number(prev) + 1); }}
         >+</s-button>
         </s-box>
     </s-stack>
    )
  }