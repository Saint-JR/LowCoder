import { memo } from "react";

interface Props {
  slot?: {
    content: (props?: any) => JSX.Element | null;
  };
}

const RootContainer = memo((props: Props) => {
  const { slot } = props;
  const { content: Content = null } = slot ?? {};

  return <div>{Content && <Content />}</div>;
});

export default RootContainer;
