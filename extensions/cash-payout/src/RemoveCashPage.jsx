import { useState } from 'preact/hooks';
import { formatCurrency } from './helper-functions.jsx';

export default function RemoveCashPage({countedCash, goToNextPage, amtToRemove, setAmtToRemove}) {
    const [error, setError] = useState('');
  

    return (
      //  <s-text>testing...</s-text>
      <s-stack gap='large-100' direction='block'>

             <s-heading>Select amount of cash to remove</s-heading>
             <s-stack direction='inline' alignItems='center' gap='small-100' justifyContent='end'>
                  <s-text>$</s-text>
             <s-number-field
              label='Amount to remove'
              required
              value={String(amtToRemove)}
              error={error}
              //max={countedCash}
              onInput={(e) => {
                setAmtToRemove(Number(e.currentTarget.value));
                if (Number(e.currentTarget.value) > countedCash) {
                  setError('Amount to remove cannot exceed counted cash amount of ' + formatCurrency(countedCash));
                }
                else {
                  setError('');
                }
            }}
            />
            </s-stack>
             <s-button variant={error ?  'secondary' :'primary' } onClick={error ? null : goToNextPage}>Remove Cash</s-button>
      </s-stack>
        );

  }