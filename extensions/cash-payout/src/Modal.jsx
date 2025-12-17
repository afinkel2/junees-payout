import {render} from 'preact';

export default async () => {
  render(<Extension />, document.body);
};

function Extension() {
  return (
    <s-page heading='POS modal'>
      <s-scroll-box>
        <s-box padding="small">
          <s-text>Welcome to the preact extension</s-text>
        </s-box>
      </s-scroll-box>
    </s-page>
  );
}