import RegistrationForm from '@/components/RegistrationForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              HACKATHON 2026
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-2">Build. Innovate. Transform.</p>
            <p className="text-gray-400">Register your team now and be part of something amazing!</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card p-6 text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2">48h</div>
              <div className="text-gray-300">Duration</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">$10K</div>
              <div className="text-gray-300">Prize Pool</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">100+</div>
              <div className="text-gray-300">Teams</div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="max-w-4xl mx-auto">
            <RegistrationForm />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 border-t border-white/10">
        <p>© 2026 Hackathon. All rights reserved.</p>
      </footer>
    </main>
  );
}
