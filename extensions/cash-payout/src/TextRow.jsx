
  export default function TextRow({label, value, orange=false}) {
    return (
      <s-stack direction='inline' justifyContent='space-between' alignItems='center' padding='small-100'>
        <s-text>{label}</s-text>
        <s-text tone={orange ? 'caution' : 'neutral'}>{value}</s-text>
      </s-stack>
    );
  }