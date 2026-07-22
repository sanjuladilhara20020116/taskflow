import { useEffect, useState } from "react";
import {
  Navigate,
  useNavigate,
} from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const loginMessages = [
  "Organize daily responsibilities in one clear workspace.",
  "Review deadlines before they become overdue.",
  "Turn plans into completed work.",
];

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    login,
    isAuthenticated,
  } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [currentTime, setCurrentTime] =
    useState(new Date());

  const [messageIndex, setMessageIndex] =
    useState(0);

  useEffect(() => {
    const clockTimer = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const messageTimer = window.setInterval(() => {
      setMessageIndex(
        (currentIndex) =>
          (currentIndex + 1) %
          loginMessages.length
      );
    }, 4000);

    return () => {
      window.clearInterval(clockTimer);
      window.clearInterval(messageTimer);
    };
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const useDefaultCredentials = () => {
    setFormData({
      email: "admin@test.com",
      password: "123456",
    });
  };

  const getErrorMessage = (error) => {
    return (
      error.response?.data?.errors?.[0]?.message ||
      error.response?.data?.message ||
      "Login failed. Please try again."
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.email.trim() ||
      !formData.password
    ) {
      toast.error(
        "Email and password are required."
      );
      return;
    }

    try {
      setLoading(true);

      await login({
        email: formData.email.trim(),
        password: formData.password,
      });

      toast.success("Login successful.");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-shape shape-one" />
      <div className="login-shape shape-two" />
      <div className="login-shape shape-three" />

      <section className="login-showcase">
        <div className="brand-area login-brand">
          <div className="brand-mark">TF</div>

          <div>
            <h1 className="brand-name">
              TaskFlow
            </h1>
            <p className="brand-subtitle">
              Personal productivity workspace
            </p>
          </div>
        </div>

        <div className="showcase-content">
          <p className="hero-label">
            Structured daily planning
          </p>

          <h2>
            Manage your work with clarity and
            confidence.
          </h2>

          <p
            className="login-dynamic-message"
            key={messageIndex}
          >
            {loginMessages[messageIndex]}
          </p>

          <div className="login-time-card">
            <strong>
              {currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </strong>

            <span>
              {currentTime.toLocaleDateString([], {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="showcase-metrics">
          <div>
            <strong>5</strong>
            <span>Dashboard insights</span>
          </div>

          <div>
            <strong>3</strong>
            <span>Priority levels</span>
          </div>

          <div>
            <strong>1</strong>
            <span>Focused workspace</span>
          </div>
        </div>
      </section>

      <section className="login-form-section">
        <div className="login-form-card">
          <div className="login-form-heading">
            <p className="section-label">
              Secure access
            </p>

            <h2>Welcome back</h2>

            <p>
              Sign in using the assessment
              administrator account.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="email">
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@test.com"
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="primary-button login-button"
              disabled={loading}
            >
              {loading
                ? "Signing in..."
                : "Sign in"}
            </button>
          </form>

          <div className="default-login-card">
            <div>
              <span>Default account</span>
              <strong>admin@test.com</strong>
              <small>Password: 123456</small>
            </div>

            <button
              type="button"
              onClick={useDefaultCredentials}
            >
              Use credentials
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}