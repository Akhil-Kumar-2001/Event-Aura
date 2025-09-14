export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-teal-50 to-teal-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Discover Amazing Events</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Event Aura connects you with incredible experiences. From conferences to concerts, find and book tickets for
          events that inspire and entertain.
        </p>
        <button className="bg-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transition-colors shadow-lg">
          Explore Events
        </button>
      </div>
    </section>
  )
}
