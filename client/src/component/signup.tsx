import React, { useEffect, useState } from 'react';
import { User, Crown, Mail, Lock, Eye, EyeOff, Calendar, ArrowRight, ArrowLeft, UserPlus } from 'lucide-react';
import { Signup } from '../service/auth/authApi';
import { toast } from 'react-toastify'
import { useAuthStore } from "../store/userAuthStore"; // Import your auth store
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const [selectedRole, setSelectedRole] = useState<"attendee" | "organizer">('attendee');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!agreedToTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    console.log('Sign Up submitted:', { ...formData, role: selectedRole });

    const filteredFormData = {
      username: formData.fullName,
      email: formData.email,
      password: formData.password
    };
    try {
      const response = await Signup(filteredFormData, selectedRole)
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
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-teal-600 p-3 rounded-xl shadow-lg">
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Event Aura</h1>
          <p className="text-gray-600">Create your account to start managing events</p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center flex items-center justify-center gap-2">
              <UserPlus className="w-6 h-6 text-teal-600" />
              Create Account
            </h2>
          </div>

          <div className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Account Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole('attendee')}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${selectedRole === 'attendee'
                    ? 'border-teal-500 bg-teal-50 text-teal-700'
                    : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
                    }`}
                >
                  <User className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Attendee</div>
                  <div className="text-xs mt-1">Join events</div>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('organizer')}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${selectedRole === 'organizer'
                    ? 'border-teal-500 bg-teal-50 text-teal-700'
                    : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
                    }`}
                >
                  <Crown className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Organizer</div>
                  <div className="text-xs mt-1">Create events</div>
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
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
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
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
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Password should be at least 8 characters long
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="w-full pl-11 pr-11 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <div className="text-xs text-red-500 mt-1">
                  Passwords do not match
                </div>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded transition-all duration-300"
              />
              <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                I agree to the{' '}
                <a href="/terms" className="text-teal-600 font-medium hover:text-teal-700">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-teal-600 font-medium hover:text-teal-700">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Create Account Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!agreedToTerms}
              className={`w-full font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${agreedToTerms
                ? 'bg-teal-600 hover:bg-teal-700 text-white hover:shadow-xl transform hover:-translate-y-0.5'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              Create Account
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Link to Sign In */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">Already have an account?</p>
            <a
              href="/signin"
              className="mt-2 text-teal-600 hover:text-teal-700 font-semibold transition-colors duration-300 flex items-center justify-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Sign in here
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>By creating an account, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;