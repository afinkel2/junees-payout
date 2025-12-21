import {render} from 'preact';

export default async () => {
  render(<Extension />, document.body);
}

function Extension() {
  return (
    <s-tile
      heading="Cash Pay Out"
      //subheading="preact Extension"
      onClick={() => shopify.action.presentModal()}
    />
  );
}