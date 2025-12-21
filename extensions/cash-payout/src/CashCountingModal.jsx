import {useState} from 'preact/hooks';

export default function CashCountModal({onClose, onConfirm}) {
  const denominations = [100, 50, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  const [counts, setCounts] = useState(() => denominations.reduce((acc, d) => (acc[String(d)] = 0, acc), {}));

  const total = denominations.reduce((sum, d) => {
    const c = Number(counts[String(d)] || 0);
    return sum + c * d;
  }, 0);

  return (
    <s-stack>
           <s-heading >Count cash</s-heading>
        <s-scroll-box>
          {denominations.map((d) => (
              <InputCashAmountRow
                denomination={d}
                amt={counts[String(d)]}
                updateCount={(e) => setCounts((prev) => ({...prev, [String(d)]: Number(e.target.value)}))}
                increment={(amt) => setCounts((prev) => ({...prev, [String(d)]: Number(prev[String(d)] || 0) + amt}))}
                />
          ))}
        </s-scroll-box>
        <s-text>Counted total: {formatCurrency(total)}</s-text>
          <s-button onClick={onClose}>Close</s-button>
          <s-button onClick={onConfirm}>Confirm</s-button>  
  </s-stack>
  );
}


function InputCashAmountRow({updateCount, denomination, amt, increment}) {
  return(
    <s-stack direction="inline" justifyContent="space-between" gap="small" padding="small-200">
      <s-button variant="secondary" onClick={increment(-1)}>-</s-button>
      <s-number-field
        required
        label={formatDenomination(denomination)}
        value={amt}
        onInput={updateCount}
        inputMode='numeric'
        min={0}        
        />
        <s-button variant='primary' onClick={increment(1)}>+</s-button>
    </s-stack>
  )
}