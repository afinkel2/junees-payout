import { useState } from 'preact/hooks';
import { formatCurrency } from './helper-functions.jsx';
import TextRow from './TextRow.jsx';



export default function PrintSummaryPage({expectedCash, countedCash, amtToRemove}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const printSummary = async () => {
    const params = new URLSearchParams({
      expected: expectedCash.toString(),
      counted: countedCash.toString(),
      removed: amtToRemove.toString(),
    });
    const src = `/print?${params.toString()}`;

    setIsLoading(true);
    try {
      await shopify.print.print(src);
    } catch (error) {
      setError(error.message)
      console.error('Print failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <s-page>
      <s-text tone='critical'>{error}</s-text>
            <s-heading>Cash Summary</s-heading>
              <TextRow label='Amount left in drawer' value={formatCurrency(countedCash - amtToRemove)} /> 
              <TextRow label='Removed Cash' value={formatCurrency(amtToRemove)} /> 
              <TextRow label='Counted Cash' value={formatCurrency(countedCash)} /> 
              <TextRow label='Expected amount in register' value={formatCurrency(expectedCash)} /> 
              <TextRow label='Discrepancy' value={formatCurrency(countedCash - expectedCash)} orange={countedCash != expectedCash} />
              
              {/* <s-stack direction='inline' justifyContent='end' padding='small-100'>
                {countedCash != expectedCash ?
                <s-text tone='caution'>Discrepancy: {formatCurrency(countedCash - expectedCash)}</s-text>
                : <s-text>As expected</s-text>}
                </s-stack> */}
                 <s-stack  direction='inline' justifyContent='space-between' padding='none'>
                <s-box maxInlineSize='43%' minInlineSize='43%'>
              <s-button  variant='secondary' onClick={printSummary}>Print</s-button>
              </s-box>
                <s-box maxInlineSize='43%' minInlineSize='43%'>
              <s-button  variant='secondary'loading={isLoading} onClick={window.close}>Done</s-button>
                </s-box>
              </s-stack>
     </s-page>
        );

  }