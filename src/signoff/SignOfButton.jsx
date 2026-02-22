function SignOffButton({ disabled, onClick }) {
  return (
    <button
      className={`signoff-btn ${disabled ? "disabled" : ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      Sign Off Shift
    </button>
  );
}

export default SignOffButton;