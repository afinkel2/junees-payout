import {useState} from 'preact/hooks';
import { formatCurrency, formatDenomination } from './helper-functions.jsx';

export default function CashCountModal({onClose, onConfirm}) {
  const denominations = [100, 50, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  const [counts, setCounts] = useState(() => denominations.reduce((acc, d) => (acc[String(d)] = 0, acc), {}));

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
  }
  return (
    <s-section heading='Count Bills'>
      <s-box padding='large'>
           {/* <s-heading >Count cash</s-heading> */}
        <s-scroll-box>
          {denominations.map((d) => (
            // <s-text>yay</s-text>
            <>
            <s-text>{formatDenomination(d)}</s-text>
            <InputCashAmountRow
            denomination={d}
            amt={counts[String(d)]}
            updateCount={(e) => setCounts((prev) => ({...prev, [String(d)]: e.currentTarget.value}))}
            //updateCount={updateDenominationAmount}
            increment={(amount) => increment(d, amount)}
            />
            </>
            ))
            }
            </s-scroll-box>
            <s-text>Counted total: {formatCurrency(total)}</s-text>
            <s-button onClick={onClose}>Close</s-button>
            <s-button onClick={onConfirm}>Save</s-button>  
            </s-box>
  </s-section>
  );
}


 function InputCashAmountRow({updateCount, denomination, amt, increment}) {
   return(//<s-text>testing</s-text>

  
    <s-stack direction="inline" justifyContent="space-between" alignItems='center'//gap="small" padding="small"
    >
      <s-box maxInlineSize='30%' minInlineSize='30%'>
       <s-button variant="secondary" onClick={() =>increment(-1)}
       >-</s-button>
       </s-box>
       <s-box maxInlineSize='30%' minInlineSize='30%'>
        <s-number-field 
         value={amt}
         placeholder='0'
         onInput={updateCount} 
         inputMode='numeric'
         min={0}        
         />
         </s-box>
       <s-box maxInlineSize='30%' minInlineSize='30%'>
         <s-button variant='primary' onClick={() =>increment(1)}
         >+</s-button>
         </s-box>
     </s-stack>
    )
  }