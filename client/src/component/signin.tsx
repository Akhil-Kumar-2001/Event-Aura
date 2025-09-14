import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Crown, Mail, Lock, Eye, EyeOff, Calendar, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import { Signin } from "../service/auth/authApi";
import { useAuthStore } from "../store/userAuthStore";

const SignInComponent = () => {
  const [selectedRole, setSelectedRole] = useState<"attendee" | "organizer">("attendee");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false); // New loading state

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
    setIsLoading(true); // Set loading to true when submitting
    try {
      const response = await Signin(formData, selectedRole);
      if (response && response.success) {
        toast.success(response.message || "Sign-in successful!");
        setAuth(true, {
          user: response.data.user,
          accessToken: response.data.accessToken,
          role: selectedRole
        });
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
    } finally {
      setIsLoading(false); // Reset loading state after completion
    }
  };

  return (
    <div className="min-h-screen bg-teal-50 flex items-center justify-center p-4 md:p-8">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Sidebar Branding Panel */}
        <div className="md:w-1/3 bg-teal-600 text-white p-8 flex flex-col justify-between items-center">
          <div className="text-center pt-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Calendar className="w-10 h-10 animate-spin-slow" />
              <h1 className="text-3xl font-extrabold">Event Aura</h1>
            </div>
            <p className="text-teal-100 text-lg">Welcome back to your event journey!</p>
          </div>
          <div className="text-center text-sm opacity-80 pt-8">
            <p>By signing in, you agree to our</p>
            <a href="/terms" className="underline hover:text-teal-200">Terms of Service</a> and{' '}
            <a href="/privacy" className="underline hover:text-teal-200">Privacy Policy</a>
          </div>
        </div>

        {/* Form Panel */}
        <div className="md:w-2/3 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-teal-800 mb-6 flex items-center gap-3">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-teal-700 mb-2">Sign in as</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedRole("attendee")}
                  className={`flex-1 py-4 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 ${
                    selectedRole === "attendee"
                      ? 'bg-teal-100 text-teal-800 border-2 border-teal-500 shadow-md'
                      : 'bg-gray-100 text-gray-600 border-2 border-gray-200 hover:bg-teal-50'
                  }`}
                >
                  <User className="w-6 h-6 mx-auto mb-2 text-teal-600" />
                  <span className="font-semibold">Attendee</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole("organizer")}
                  className={`flex-1 py-4 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 ${
                    selectedRole === "organizer"
                      ? 'bg-teal-100 text-teal-800 border-2 border-teal-500 shadow-md'
                      : 'bg-gray-100 text-gray-600 border-2 border-gray-200 hover:bg-teal-50'
                  }`}
                >
                  <Crown className="w-6 h-6 mx-auto mb-2 text-teal-600" />
                  <span className="font-semibold">Organizer</span>
                </button>
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-teal-700">Email Address</label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-teal-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full pl-10 p-3 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 bg-teal-50/50"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-teal-700">Password</label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-teal-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 p-3 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 bg-teal-50/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-teal-400 hover:text-teal-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-teal-500 hover:text-teal-700 font-medium"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button with Loading Effect */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-6 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Switch to Sign Up */}
            <div className="text-center">
              <p className="text-teal-700">Don't have an account?</p>
              <Link
                to="/signup"
                className="text-teal-500 hover:text-teal-700 font-semibold flex items-center justify-center gap-2 mt-2"
              >
                Create account here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;