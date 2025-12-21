import {render} from 'preact';
import CashCountModal from './CashCountingModal.jsx';
import {useState} from 'preact/hooks';

export default async () => {
  render(<Extension />, document.body);
};

function Extension() {
  const [expectedCash, setExpectedCash] = useState(125.0);
  const [showCountModal, setShowCountModal] = useState(false);

  return (
    <s-page heading="POS modal">
      <s-scroll-box>
        <s-box padding="small">
          <s-text>TODO: Expected cash balance</s-text>
          <s-text>{formatCurrency(expectedCash)}</s-text>

            <s-button onClick={() => setShowCountModal(true)} aria-label="count-cash">Count cash</s-button>
        </s-box>
      </s-scroll-box>

      {showCountModal && (
        <CashCountModal
          onClose={() => setShowCountModal(false)}
          onConfirm={(total) => {
            setExpectedCash(Number(total.toFixed(2)));
            setShowCountModal(false);
          }}
        />
      )}
    </s-page>
  );
}

