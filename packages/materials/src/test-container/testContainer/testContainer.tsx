import { memo } from "react";

interface Props {
  slot?: {
    header: (props?: any) => JSX.Element | null;
    footer: (props?: any) => JSX.Element | null;
  };
}

const TestContainer = memo((props: Props) => {
  const { header: Header = null, footer: Footer = null } = props.slot ?? {};

  return (
    <div>
      <div>{Header && <Header />}</div>

      <div>123</div>

      <div>{Footer && <Footer />}</div>
    </div>
  );
});

export default TestContainer;
