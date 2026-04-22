import { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { token } = useContext(AuthContext);

  const features = [
    {
      icon: "🔗",
      title: "Merge PDFs",
      desc: "Combine multiple PDF files into one seamlessly",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: "✂️",
      title: "Split PDF",
      desc: "Divide PDFs into individual pages instantly",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: "📄",
      title: "JPG to PDF",
      desc: "Convert images to professional PDF documents",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: "🖼️",
      title: "PDF to JPG",
      desc: "Extract pages as high-quality images",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: "📦",
      title: "Compress PDF",
      desc: "Reduce file size without losing quality",
      color: "from-pink-500 to-rose-500",
    },
  ];

  const stats = [
    { number: "10M+", label: "Files Processed" },
    { number: "50K+", label: "Happy Users" },
    { number: "99.9%", label: "Uptime" },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-950">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="text-center">
            {/* Badge */}
            <div className="mb-6 inline-block">
              <span className="px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-medium">
                ✨ The Ultimate PDF Solution
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Transform Your PDFs
              <span className="block bg-linear-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Effortlessly
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Merge, split, convert, and compress PDFs with our powerful online
              toolkit. No installation needed. Fast, secure, and completely
              free.
            </p>

            {/* CTA Buttons */}
            {!token ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap mb-16">
                <Link
                  to="/register"
                  className="px-8 py-4 bg-linear-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 transform"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-white/10 text-white font-bold rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 transform"
                >
                  Sign In
                </Link>
              </div>
            ) : (
              <Link
                to="/dashboard"
                className="inline-block px-8 py-4 bg-linear-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 transform mb-16"
              >
                Go to Dashboard
              </Link>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="mt-20 relative">
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>

            {/* Hero Visual */}
            <div className="relative bg-linear-to-br from-blue-900/50 to-cyan-900/50 rounded-2xl border border-blue-400/20 p-8 lg:p-12 backdrop-blur-sm">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="text-4xl mb-2">{feature.icon}</div>
                    <p className="text-gray-300 text-xs font-medium">
                      {feature.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to manage your PDFs efficiently and securely
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-blue-400/50 transition-all duration-300 hover:bg-white/10"
              >
                {/* linear background on hover */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}
                ></div>

                <div className="relative z-10">
                  <div className="text-5xl mb-4 block">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                {/* Bottom accent */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${feature.color} opacity-0 group-hover:opacity-100 rounded-b-xl transition-opacity duration-300`}
                ></div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-blue-400/50 transition-all duration-300">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-white mb-3">Secure</h3>
              <p className="text-gray-400">
                All files are encrypted and automatically deleted after
                processing
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-cyan-400/50 transition-all duration-300">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-400">
                Process multiple files instantly with our optimized servers
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-blue-400/50 transition-all duration-300">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-3">
                Simple & Free
              </h3>
              <p className="text-gray-400">
                No signup required for basic features. Try it now, no credit
                card needed
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <div className="relative bg-linear-to-r from-blue-600 to-cyan-600 rounded-2xl p-12 lg:p-16 text-center overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl z-0"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl z-0"></div>

            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Ready to Manage Your PDFs?
              </h2>
              <p className="text-lg text-blue-100 mb-10 max-w-xl mx-auto">
                Join thousands of users who trust our platform to handle their
                PDF tasks
              </p>
              {!token && (
                <Link
                  to="/register"
                  className="inline-block px-10 py-4 bg-white text-blue-600 font-bold rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 transform"
                >
                  Create Free Account
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="border-t border-white/10 py-12 mt-20">
          <div className="max-w-6xl mx-auto px-6 text-center text-gray-400">
            <p>
              &copy; 2024 PDF Toolkit. Trusted by thousands of users worldwide.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
