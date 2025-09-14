export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-teal-400 mb-4">Event Aura</h3>
            <p className="text-gray-300 leading-relaxed">
              Your premier destination for discovering and booking amazing events. Connect with experiences that matter
              to you.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="text-gray-300 space-y-2">
              <p>Email: info@eventaura.com</p>
              <p>Phone: (555) 123-4567</p>
              <p>Address: 123 Event St, City, State 12345</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">© 2024 Event Aura. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
