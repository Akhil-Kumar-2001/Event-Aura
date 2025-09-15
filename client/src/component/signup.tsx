import React, { useEffect, useState } from 'react';
import { User, Crown, Mail, Lock, Eye, EyeOff, Calendar, ArrowRight, ArrowLeft, UserPlus, Loader2 } from 'lucide-react';
import { Signup } from '../service/auth/authApi';
import { toast } from 'react-toastify';
import { useAuthStore } from "../store/userAuthStore";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [selectedRole, setSelectedRole] = useState<"attendee" | "organizer">('attendee');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
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
      [e.target.name]: e.target.value
    });
  };

  // Validation functions
  const isNameValid = (name: string) => {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    return nameRegex.test(name.trim());
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password: string) => {
    return password.length >= 8;
  };

  const isFormValid = () => {
    return (
      isNameValid(formData.fullName) &&
      isEmailValid(formData.email) &&
      isPasswordValid(formData.password) &&
      formData.password === formData.confirmPassword &&
      agreedToTerms
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast.error('Please fill all fields correctly and agree to the terms.');
      return;
    }
    setIsLoading(true);
    const filteredFormData = {
      username: formData.fullName,
      email: formData.email,
      password: formData.password
    };
    try {
      const response = await Signup(filteredFormData, selectedRole);
      if (response && response?.success) {
        toast.success(response.message);
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
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
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
            <p className="text-teal-100 text-lg">Unleash your event experience with us!</p>
          </div>
          <div className="text-center text-sm opacity-80 pt-8">
            <p>By creating an account, you agree to our</p>
            <a href="/terms" className="underline hover:text-teal-200">Terms of Service</a> and{' '}
            <a href="/privacy" className="underline hover:text-teal-200">Privacy Policy</a>
          </div>
        </div>

        {/* Form Panel */}
        <div className="md:w-2/3 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-teal-800 mb-6 flex items-center gap-3">
            <UserPlus className="w-7 h-7 text-teal-600" />
            Create Your Account
          </h2>

          <div className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-teal-700 mb-2">Account Type</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedRole('attendee')}
                  className={`flex-1 py-4 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                    selectedRole === 'attendee'
                      ? 'bg-teal-100 text-teal-800 border-2 border-teal-500 shadow-md'
                      : 'bg-gray-100 text-gray-600 border-2 border-gray-200 hover:bg-teal-50'
                  }`}
                >
                  <User className="w-6 h-6 mx-auto mb-2 text-teal-600" />
                  <span className="font-semibold">Attendee</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('organizer')}
                  className={`flex-1 py-4 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                    selectedRole === 'organizer'
                      ? 'bg-teal-100 text-teal-800 border-2 border-teal-500 shadow-md'
                      : 'bg-gray-100 text-gray-600 border-2 border-gray-200 hover:bg-teal-50'
                  }`}
                >
                  <Crown className="w-6 h-6 mx-auto mb-2 text-teal-600" />
                  <span className="font-semibold">Organizer</span>
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-teal-700">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full mt-2 p-3 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 bg-teal-50/50"
                required
              />
              {!isNameValid(formData.fullName) && formData.fullName && (
                <div className="text-xs text-red-500 mt-1">Name must be 2-50 characters long and contain only letters and spaces</div>
              )}
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
              {!isEmailValid(formData.email) && formData.email && (
                <div className="text-xs text-red-500 mt-1">Please enter a valid email address</div>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-teal-700">Password</label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-teal-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
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
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {!isPasswordValid(formData.password) && formData.password && (
                <div className="text-xs text-red-500 mt-1">Password must be at least 8 characters</div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-teal-700">Confirm Password</label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-teal-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-10 p-3 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 bg-teal-50/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-teal-400 hover:text-teal-600"
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <div className="text-xs text-red-500 mt-1">Passwords do not match</div>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-teal-300 rounded"
              />
              <label htmlFor="terms" className="text-sm text-teal-700">
                I agree to the{' '}
                <a href="/terms" className="text-teal-500 hover:text-teal-700 font-medium">Terms of Service</a>{' '}
                and{' '}
                <a href="/privacy" className="text-teal-500 hover:text-teal-700 font-medium">Privacy Policy</a>
              </label>
            </div>

            {/* Create Account Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid() || isLoading}
              aria-disabled={!isFormValid() || isLoading}
              aria-busy={isLoading}
              aria-label={isLoading ? 'Creating account, please wait' : 'Create account'}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                isFormValid() && !isLoading
                  ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                  : 'bg-teal-200 text-teal-400 cursor-not-allowed opacity-75'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                  <span className="sr-only">Creating account, please wait</span>
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </>
              )}
            </button>

            {/* Link to Sign In */}
            <div className="text-center">
              <p className="text-teal-700">Already have an account?</p>
              <a
                href="/signin"
                className="text-teal-500 hover:text-teal-700 font-semibold flex items-center justify-center gap-2 mt-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Sign in here
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;