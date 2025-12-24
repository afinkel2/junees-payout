import { LoaderFunctionArgs } from "react-router";
import { authenticate } from "../shopify.server";

 export const loader = async ({ request }: LoaderFunctionArgs) => {    
    const { cors } = await authenticate.admin(request);

    const url = new URL(request.url);
    const countedCash = Number(url.searchParams.get("counted") || "0");
    const expectedCash = Number(url.searchParams.get("expected") || "0");
    const amtToRemove = Number(url.searchParams.get("removed") || "0");

    const htmlToPrint = 
   `<!doctype html>
   <html>
   <head><meta charset="utf-8">
   <title>Cash Summary</title>
        <style>body{font-family:Arial,Helvetica,sans-serif;padding:20px;color:#111} .row{display:flex;justify-content:space-between;padding:6px 0}</style>
    </head>
    <body>
        <h1>Cash Summary</h1>
        <div class="row">
            <div>Amount left in drawer</div>
            <div>${formatCurrency(countedCash - amtToRemove)}</div>
        </div>
        <div class="row">
            <div>Removed Cash</div><div>${formatCurrency(amtToRemove)}</div>
        </div>
        <div class="row">
            <div>Counted Cash</div><div>${formatCurrency(countedCash)}</div></div>
        <div class="row">
            <div>Expected Cash</div><div>${formatCurrency(expectedCash)}</div>
        </div>
        <div class="row">
            <div>Discrepancy</div><div>${formatCurrency(countedCash - expectedCash)}</div>
        </div>
    </body></html>`;

  return cors(
    new Response(htmlToPrint, {
      status: 200,
      headers: {
        "Content-type": "text/html",
      },
    }),
  );
}



function formatCurrency(n: string | number): string { 
    return `$${Number(n).toFixed(2)}`;
}