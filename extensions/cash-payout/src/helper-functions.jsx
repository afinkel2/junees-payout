
function formatCurrency(n) {
  return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(n);
}

function formatDenomination(d) {
  return d >= 1 ? `$${d}` : `${Math.round(d * 100)}¢`;
}