import {useState} from 'preact/hooks';
import { formatCurrency, formatDenomination } from './helper-functions.jsx';
import CountingTool from './CountingTool.jsx';

export default function CountCashPage({expectedCash, countedCash, setCountedCash, goToNextPage}) {
  const [showCountingTool, setShowCountingTool] = useState(false);
  return (
      showCountingTool ?
        <CountingTool
              onClose={()=>setShowCountingTool(false)}
              onConfirm={(total) => {
                  setCountedCash(Number(total));
                  setShowCountingTool(false);
                }}
              /> :
        <s-box>
              {/*<s-heading>{formatCurrency(expectedCash)}</s-heading> 
               <s-text>Expected cash balance</s-text>
               {countedCash != expectedCash && <s-text tone="caution">Discrepancy: {formatCurrency(countedCash - expectedCash )}</s-text> }*/}
               <s-heading>Count cash in drawer</s-heading> //indent
              <s-stack direction='inline' justifyContent='space-between'
              alignItems='center'
              padding='small small large-100'>
                
                <s-box maxInlineSize='43%' minInlineSize='43%'>
                  <s-stack direction='inline' alignItems='center' gap='small-100' justifyContent='end'>
                  <s-text>$</s-text>
                <s-number-field
                label='Amount counted'
                required                
                value={String(countedCash)}  
                //prefix='$'    
                onInput={(e) => setCountedCash(Number(e.currentTarget.value))}
                />
                </s-stack>
                </s-box>
                <s-box maxInlineSize='43%' minInlineSize='43%'>
                  <s-button slot='accessory' onClick={() => setShowCountingTool(true)} aria-label="count-cash">Counting Tool</s-button>
                </s-box>
                </s-stack>
                <s-button variant='primary'  onClick={goToNextPage}>Next</s-button>
            </s-box>
        );

  }