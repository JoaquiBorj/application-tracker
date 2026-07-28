import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function LoginScreen() {
  const { signup, login, error } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isSignup) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: "80px auto", padding: 24 }}>
      <h1>{isSignup ? "Sign Up" : "Log in"}</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          style={{ width: "100%", padding: 10 }}
        >
          {submitting ? "Submitting..." : isSignup ? "Sign Up" : "Log In"}
        </button>
      </form>

      <p style={{ marginTop: 16 }}>
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button type="button" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Log In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}