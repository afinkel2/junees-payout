
export function formatCurrency(n) { //n is a num
//  try {
//     if (typeof Intl !== 'undefined' && typeof Intl.NumberFormat === 'function') {
//       return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
//     }
//   } catch (e) {
    //return `caught: $${n.toFixed(2)}`;
 // }
 return `$${n.toFixed(2)}`;
}

export function formatDenomination(d) {
  return d >= 1 ? `$${d}` : `${Math.round(d * 100)}¢`;
}