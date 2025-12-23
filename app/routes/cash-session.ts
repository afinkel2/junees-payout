// //import { json } from 'stream/consumers';
// import shopify, { apiVersion, authenticate } from '../shopify.server'; 
// import { LoaderFunctionArgs } from 'react-router';

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   try {
//     console.log('in cash session loader');
//    const { admin, cors } = await authenticate.admin(request);
    
//     const url = new URL(request.url);
//     const locationId = url.searchParams.get('locationId');

//     const query = `
//       query getCashSession($locationId: ID) {
//         cashTrackingSessions(first: 1, locationId: $locationId) {
//           edges {
//             node {
//               id
//               expectedBalance { amount currencyCode }
//             }
//           }
//         }
//       }
//     `;

//     const variables = locationId ? { locationId } : {};

//     const resp = await admin.graphql( query, {variables});
//     //const responseJson = await resp.json();
//     // admin.graphql may return a Fetch Response or a parsed object — handle both
//     const responseJson = typeof (resp as any)?.json === 'function' ? await (resp as any).json() : resp;

//     if (!responseJson?.data) {
//       console.error('Unexpected GraphQL payload', responseJson);
//       return JSON.stringify({ error: 'unexpected response from Shopify', status: 502 });
//     }

//     const node = responseJson.data?.cashTrackingSessions?.edges?.[0]?.node;
//     if (!node) return JSON.stringify({ error: 'no open cash session', status: 404 });

//     return JSON.stringify({
//       id: node.id,
//       // status: node.status,
//       expectedBalance: node.expectedBalance, // { amount, currencyCode }
//     });

//     return cors(
//     new Response(JSON.stringify({
//       id: node.id,
//       // status: node.status,
//       expectedBalance: node.expectedBalance, // { amount, currencyCode }
//     }), {
//       status: 200,
//       headers: {
//         "Content-type": "text/html",
//       },
//     }),
//   );
//   } catch (err) {
//     console.error(err);
//       return JSON.stringify({ error: 'internal server error' , status: 500 });

//   }
// };
