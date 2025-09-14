
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Crown, Mail, Lock, Eye, EyeOff, Calendar, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import { Signin } from "../service/auth/authApi";
import { useAuthStore } from "../store/userAuthStore"; // Import your auth store

const SignInComponent = () => {
  const [selectedRole, setSelectedRole] = useState<"attendee" | "organizer">(
    "attendee"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setAuth, isAuthenticated, role } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      if (role === "organizer") {
        navigate("/organizer/dashboard", { replace: true });
      } else if (role === "attendee") {
        navigate("/", { replace: true });
      }
    }
  }, [isAuthenticated, role, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign In submitted:", { ...formData, role: selectedRole });

    try {
      console.log("Attempting sign-in with:");
      const response = await Signin(formData, selectedRole);
      console.log(response, "Sign-in response:");

      if (response && response.success) {
        toast.success(response.message || "Sign-in successful!");

        // Store auth data in Zustand store
        setAuth(true, {
          user: response.data.user,
          accessToken: response.data.accessToken,
          role: selectedRole
        });

        // Navigate based on role
        if (selectedRole === "organizer") {
          navigate("/organizer/dashboard");
        } else {
          navigate("/");
        }
      } else {
        toast.error(response?.message || "Sign-in failed. Please try again.");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      toast.error("Sign-in failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-teal-600 p-3 rounded-xl shadow-lg">
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Event Aura
          </h1>
          <p className="text-gray-600">
            Welcome back! Sign in to your account
          </p>
        </div>

        {/* Sign In Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Sign In
          </h2>

          <div className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Sign in as
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole("attendee")}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${selectedRole === "attendee"
                      ? "border-teal-500 bg-teal-50 text-teal-700"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
                    }`}
                >
                  <User className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Attendee</div>
                  <div className="text-xs mt-1">Join events</div>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole("organizer")}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${selectedRole === "organizer"
                      ? "border-teal-500 bg-teal-50 text-teal-700"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
                    }`}
                >
                  <Crown className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Organizer</div>
                  <div className="text-xs mt-1">Create events</div>
                </button>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-11 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-teal-600 hover:text-teal-700 font-medium"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Sign In
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Switch to Sign Up */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">Don't have an account?</p>
            <Link
              to="/signup"
              className="mt-2 inline-block text-teal-600 hover:text-teal-700 font-semibold transition-colors duration-300"
            >
              Create account here
            </Link>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            By continuing, you agree to our Terms of Service and Privacy
            Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;