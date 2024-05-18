type Props = {
  visible: boolean;
  setVisible: () => void;
};

const CustomModal: React.FC<Props> = ({ visible, setVisible }) => {
  return visible ? (
    <div className="modal_container">
      <div onClick={setVisible}></div>
      <div></div>
    </div>
  ) : null;
};

export default CustomModal;
