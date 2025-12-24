import { formatCurrency } from './helper-functions.jsx';
import TextRow from './TextRow.jsx';

export default function SummaryPage({expectedCash, countedCash, goToNextPage}) {
  return (
     <s-section>
            <s-heading>Cash Summary</s-heading>
              <TextRow label='Amount expected' value={formatCurrency(expectedCash)} /> 
              <TextRow label='Amount counted' value={formatCurrency(countedCash)} /> 
              <TextRow label='Discrepancy' value={formatCurrency(countedCash - expectedCash)} orange={countedCash != expectedCash} />
              <s-button  variant='primary' onClick={goToNextPage}>Next</s-button>
     </s-section>
        );

 
  }