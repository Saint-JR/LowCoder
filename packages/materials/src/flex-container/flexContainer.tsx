import { Flex } from "antd";
import { memo } from "react";

interface Props {
  slot?: {
    content: (props?: any) => JSX.Element | null;
  };
  [key: string]: any;
}

const FlexContainer = memo((props: Props) => {
  const { slot, ...rest } = props;
  const { content: Content = null } = slot ?? {};

  return <Flex {...rest}>{Content && <Content />}</Flex>;
});

export default FlexContainer;
