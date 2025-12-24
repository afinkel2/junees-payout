import { formatCurrency } from './helper-functions.jsx';
import TextRow from './TextRow.jsx';



export default function PrintSummaryPage({expectedCash, countedCash, amtToRemove}) {
  function printSummary() {

      const documentPath ='';
      shopify.print.print(documentPath);
      }
  return (
     <s-page>

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
              <s-button  variant='secondary' onClick={window.close}>Done</s-button>
                </s-box>
              </s-stack>
     </s-page>
        );

  }