import { useState } from 'preact/hooks';
import { formatCurrency } from './helper-functions.jsx';

export default function RemoveCashPage({countedCash, goToNextPage, amtToRemove, setAmtToRemove}) {
    const [error, setError] = useState('');
  

    return (
      //  <s-text>testing...</s-text>
      <>

             <s-heading>Select amount of cash to remove</s-heading>
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
            }}
            />
             <s-button slot='footer' variant={error ?  'secondary' :'primary' } onClick={error ? null : goToNextPage}>Remove Cash</s-button>
      </>
        );

  }