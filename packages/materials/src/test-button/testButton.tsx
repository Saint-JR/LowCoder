import { Button } from "antd";
import { memo } from "react";

interface Props {
  content: string;
  [key: string]: any;
}

const TestButton = memo((props: Props) => {
  const { content, ...rest } = props;
  return <Button {...rest}>{content}</Button>;
});

export default TestButton;
