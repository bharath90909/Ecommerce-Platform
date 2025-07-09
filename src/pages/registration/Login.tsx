import React, { useState, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase/FirebaseConfig.ts";
import { useAppDispatch } from "../../store/hooks";
import { loginSuccess } from "../../store/slices/authSlice";
import { ROUTES } from "../../utils/constants";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const userData = {
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email || "",
          name: userCredential.user.displayName || "User",
        },
      };

      dispatch(loginSuccess(userData));
      toast.success("Login successful!");

      // Redirect based on role
      if (userCredential.user.email === "admin@admin.com") {
        navigate(ROUTES.DASHBOARD);
      } else {
        navigate(ROUTES.HOME);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full mx-auto px-4">
        <Card>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome Back
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={loading}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={loading}
            />

            <Button type="submit" fullWidth size="large" disabled={loading}>
              {loading ? (
                <>
                  <LoadingSpinner size="small" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to={ROUTES.SIGNUP}
                className="text-pink-600 hover:text-pink-700 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
});

Login.displayName = "Login";

export default Login;
