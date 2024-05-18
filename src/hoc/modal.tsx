import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  visible: boolean;
  setVisible: () => void;
}

const CustomModal: React.FC<Props> = ({ visible, setVisible, children }) => {
  return visible ? (
    <div className="modal_container">
      <div className="modal_backdrop" onClick={setVisible}></div>
      <div className="modal_content">{children}</div>
    </div>
  ) : null;
};

export default CustomModal;
