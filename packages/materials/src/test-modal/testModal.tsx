import Modal from "antd/es/modal";
import { memo } from "react";

interface Props {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const TestModal = memo((props: Props) => {
  return (
    <Modal open={props.open} onCancel={props.onCancel} onOk={props.onOk}>
      123123
    </Modal>
  );
});

export default TestModal;
