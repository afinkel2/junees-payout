import {render} from 'preact';
import CashCountModal from './CashCountingModal.jsx';
import {useState, useEffect} from 'preact/hooks';
import { formatCurrency } from './helper-functions.jsx';

export default async () => {
  render(<Extension />, document.body);
};

async function getExpectedCashAmt(locationId) {
  try {

    const res = await fetch('shopify:admin/api/graphql.json', {
      method: 'POST',
      body: JSON.stringify({
        query: `
        query getCashSession {
          cashTrackingSessions(first: 1) {
            edges {
              node {
                id
                expectedBalance { amount currencyCode }
              }
            }
    }}
        `      }),
    });
    return res.json();
  }
  catch (e) {
    return Promise.reject(e);
  }
}

function Extension() {
  const [expectedCash, setExpectedCash] = useState(0.0); //TODO
  const [countedCash, setCountedCash] = useState(0.0);
  const [showCountModal, setShowCountModal] = useState(false);
  const [error, setError] = useState('');
  const [debugMsg, setDebugMsg] = useState('');



    useEffect(() => {
      var mounted = true;
      if(mounted) {
        // If your extension needs a specific location, supply it here
        // setDebugMsg('fetching cash-session');
        getExpectedCashAmt()
        .catch((e) => { setError('error fetching current register amount: ' + e.message); })
        .then(({data}) => {
          //setDebugMsg('in then. data: ' + data.cashTrackingSessions.edges[0].node.expectedBalance.amount);
          setExpectedCash(Number(data.cashTrackingSessions.edges[0].node.expectedBalance.amount));
        }).catch((e) => { setError('error processing current register amount: ' + e.message); });
        mounted = false;
      }
      }, []);

  return (
    <s-page heading="Pay Out">
      <s-text tone="critical">{error}</s-text>
      <s-text tone="info">{debugMsg}</s-text>
      <s-scroll-box>
        <s-box padding="large">
          <s-text>Current Register Balance</s-text>
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
            value={formatCurrency(countedCash)}      
            
            />
            </s-box>
            </s-stack>
        </s-box>
      {showCountModal && (
        <CashCountModal
          onClose={() => setShowCountModal(false)}
          onConfirm={(total) => {
              setCountedCash(Number(total.toFixed(2)));
              setShowCountModal(false);
            }}
          />
        )} 
        </s-scroll-box>
    </s-page>
  );
}

