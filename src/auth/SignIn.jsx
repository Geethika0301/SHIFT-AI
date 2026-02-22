function SignIn({ onLogin }) {
  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2>Nurse Sign In 👩‍⚕️</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}
        >
          <input type="text" placeholder="Nurse ID" required />
          <input type="text" placeholder="Email or Phone Number" required />
          <input type="password" placeholder="Password" required />

          <div className="captcha-box">
            <span>1234hs= </span>
            <input type="text" placeholder="Enter Answer" required />
          </div>

          <div className="otp-box">
            <input type="text" placeholder="Enter OTP" required />
            <button type="button" className="otp-btn">
              Send OTP
            </button>
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
