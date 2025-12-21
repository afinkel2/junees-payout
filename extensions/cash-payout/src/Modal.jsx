import {render} from 'preact';
import CashCountModal from './CashCountingModal.jsx';
import {useState, useEffect} from 'preact/hooks';
import { formatCurrency } from './helper-functions.jsx';

export default async () => {
  render(<Extension />, document.body);
};

function Extension() {
  const [expectedCash, setExpectedCash] = useState(125.0); //TODO
  const [showCountModal, setShowCountModal] = useState(false);

  return (
    <s-page heading="Pay Out">
      <s-scroll-box>
        <s-box padding="large">
          <s-text>TODO: Current Register Balance</s-text>
          <s-text>{formatCurrency(expectedCash)}</s-text> 

          <s-stack direction='inline' justifyContent='space-around'
          alignItems='center'
          padding='large'>
            <s-box maxInlineSize='40%' minInlineSize='40%'>
              <s-button onClick={() => setShowCountModal(true)} aria-label="count-cash">Count Bills</s-button>
            </s-box>
            <s-box maxInlineSize='40%' minInlineSize='40%'>
            <s-number-field
            label='Amount counted'
            
            />
            </s-box>
            </s-stack>
        </s-box>
      {showCountModal && (
        <CashCountModal
          onClose={() => setShowCountModal(false)}
          onConfirm={(total) => {
              setExpectedCash(Number(total.toFixed(2)));
              setShowCountModal(false);
            }}
          />
        )} 
        </s-scroll-box>
    </s-page>
  );
}

