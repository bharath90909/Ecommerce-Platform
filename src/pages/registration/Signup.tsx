import React, { useState, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase/FirebaseConfig";
import { useAppDispatch } from "../../store/hooks";
import { loginSuccess } from "../../store/slices/authSlice";
import { ROUTES } from "../../utils/constants";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import LoadingSpinner from "../../components/ui/LoadingSpinner";


interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const userData = {
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email || "",
          name: formData.name,
        },
      };

      dispatch(loginSuccess(userData));
      toast.success("Account created successfully!");
      navigate(ROUTES.HOME);
    } catch (error: any) {
      console.error("Signup error:", error);
      let errorMessage = "Failed to create account";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already registered";
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address";
          break;
        case "auth/weak-password":
          errorMessage = "Password is too weak";
          break;
        default:
          errorMessage = error.message || "Failed to create account";
      }

      toast.error(errorMessage);
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
              Create Account
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Join Fashion Forward today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              disabled={loading}
            />

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
              placeholder="Create a password"
              required
              disabled={loading}
              helperText="Password must be at least 6 characters"
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              disabled={loading}
            />

            <Button type="submit" fullWidth size="large" disabled={loading}>
              {loading ? (
                <>
                  <LoadingSpinner size="small" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to={ROUTES.LOGIN}
                className="text-pink-600 hover:text-pink-700 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
});

Signup.displayName = "Signup";

export default Signup;
