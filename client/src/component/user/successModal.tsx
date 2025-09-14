interface SuccessModalProps {
  isOpen: boolean
  paymentMethod: "wallet" | "razorpay" | null
  onGoToTickets: () => void
  onGoToHome: () => void
}

export default function SuccessModal({ isOpen, paymentMethod, onGoToTickets, onGoToHome }: SuccessModalProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Success Modal */}
      <div 
        className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
        style={{
          animation: 'fadeIn 0.3s ease-out'
        }}
      >
        <div 
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full border border-teal-100 relative overflow-hidden"
          style={{
            animation: 'slideInScale 0.4s ease-out'
          }}
        >
          {/* Success Animation Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-green-50 opacity-30"></div>
          
          {/* Confetti Animation Elements */}
          <div className="absolute top-4 left-4 w-3 h-3 bg-teal-400 rounded-full opacity-60" style={{ animation: 'bounce 1s infinite delay-100ms' }}></div>
          <div className="absolute top-6 right-8 w-2 h-2 bg-green-400 rounded-full opacity-60" style={{ animation: 'bounce 1s infinite delay-300ms' }}></div>
          <div className="absolute top-12 left-12 w-2 h-2 bg-blue-400 rounded-full opacity-60" style={{ animation: 'bounce 1s infinite delay-500ms' }}></div>
          <div className="absolute bottom-8 right-4 w-3 h-3 bg-purple-400 rounded-full opacity-60" style={{ animation: 'bounce 1s infinite delay-700ms' }}></div>
          
          <div className="text-center relative z-10">
            {/* Animated Success Icon */}
            <div 
              className="mx-auto w-20 h-20 bg-gradient-to-br from-teal-100 to-green-100 rounded-full flex items-center justify-center mb-6 border-4 border-teal-200"
              style={{ 
                animation: 'pulseGlow 2s ease-in-out infinite'
              }}
            >
              <svg
                className="w-12 h-12 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  animation: 'checkmarkDraw 0.6s ease-out 0.2s both'
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* Success Text */}
            <h2 
              className="text-3xl font-bold text-gray-900 mb-3"
              style={{ animation: 'slideUp 0.5s ease-out 0.3s both' }}
            >
              🎉 Purchase Successful!
            </h2>
            
            <p 
              className="text-gray-600 mb-8 text-lg leading-relaxed"
              style={{ animation: 'slideUp 0.5s ease-out 0.4s both' }}
            >
              Your ticket has been purchased successfully using{" "}
              <span className="font-semibold text-teal-700 capitalize">
                {paymentMethod === "wallet" ? "wallet" : paymentMethod}
              </span>!
              <br />
              <span className="text-sm text-gray-500 mt-2 block">
                You can view your tickets or return to home
              </span>
            </p>

            {/* Action Buttons */}
            <div 
              className="flex flex-col sm:flex-row gap-3"
              style={{ animation: 'slideUp 0.5s ease-out 0.5s both' }}
            >
              <button
                onClick={onGoToTickets}
                className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 px-6 rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                View My Tickets
              </button>
              
              <button
                onClick={onGoToHome}
                className="flex-1 bg-white text-teal-700 py-3 px-6 rounded-xl border-2 border-teal-200 hover:bg-teal-50 hover:border-teal-300 transition-all duration-300 font-semibold text-lg shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInScale {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 20px rgba(20, 184, 166, 0.3);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 30px rgba(20, 184, 166, 0.5);
          }
        }

        @keyframes checkmarkDraw {
          from {
            stroke-dasharray: 50;
            stroke-dashoffset: 50;
          }
          to {
            stroke-dasharray: 50;
            stroke-dashoffset: 0;
          }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </>
  )
}