function ToastNotification({ message, onClose }) {
  return (
    <div className="toast-notification">
      <span>{message}</span>
      <button onClick={onClose}>✖</button>
    </div>
  );
}

export default ToastNotification;