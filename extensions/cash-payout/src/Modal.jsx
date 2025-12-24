import {render} from 'preact';
import CountingTool from './CountingTool.jsx';
import {useState, useEffect} from 'preact/hooks';
import { formatCurrency } from './helper-functions.jsx';
import CountCashPage from './CountCash.jsx';
import SummaryPage from './SummaryPage.jsx';
import RemoveCashPage from './RemoveCashPage.jsx';
import PrintSummaryPage from './PrintSummaryPage.jsx';

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
          cashTrackingSessions(first: 1, sortKey:OPENING_TIME_DESC) {
            edges {
              node {
                id
                closingBalance { amount currencyCode }
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
  const [expectedCash, setExpectedCash] = useState(0.0);
  const [countedCash, setCountedCash] = useState(0.0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [debugMsg, setDebugMsg] = useState('');
  const [amtToRemove, setAmtToRemove] = useState(0.0);
  


    useEffect(() => {
      //var mounted = true;
      if(true) {
        // setDebugMsg('fetching cash-session');
        getExpectedCashAmt()
        .catch((e) => { setError('error fetching current register amount: ' + e.message); })
        .then(({data}) => {
          const cashTrackingSession = data.cashTrackingSessions.edges[0].node;
          const amountInRegister = cashTrackingSession.closingBalance?.amount ?? cashTrackingSession.expectedBalance.amount;
          //setDebugMsg('in then. data: ' + data.cashTrackingSessions.edges[0].node.expectedBalance.amount);
          setExpectedCash(Number(amountInRegister));
        }).catch((e) => { setError('error processing current register amount: ' + e.message); });
        //mounted = false;
      }
      }, []);

      function goToNextPage() {
        setPage((prev) => prev + 1);
      }
      const backButtonText = '<  Back';
  return (
    <s-page heading="Pay Out">
      {error && <s-text tone="critical">{error}</s-text>}
      {debugMsg && <s-text tone="info">{debugMsg}</s-text>}
      { page!=1 && 
          <s-stack direction='inline' alignItems='center' gap='small-100' justifyContent='start' padding='small-200' >
            <s-button onClick={() =>setPage((prev) => prev - 1)}>{backButtonText}</s-button>
            </s-stack>}
      <s-scroll-box padding='small large-100'>
        {(() => {
        switch (page) {
          case 1:
            return <CountCashPage expectedCash={expectedCash} countedCash={countedCash} setCountedCash={setCountedCash} goToNextPage={goToNextPage}/>
          case 2:
            return <SummaryPage expectedCash={expectedCash} countedCash={countedCash} goToNextPage={goToNextPage}/>
          case 3:
            return <RemoveCashPage countedCash={countedCash} amtToRemove={amtToRemove} setAmtToRemove={setAmtToRemove} goToNextPage={goToNextPage}/>
          case 4:
            return <PrintSummaryPage expectedCash={expectedCash} countedCash={countedCash} amtToRemove={amtToRemove}/>
          
          }})()
      } 
        </s-scroll-box>
    </s-page>
  );
}

