import { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/AuthContext";
import {
  Sparkles,
  Link2,
  Scissors,
  Package,
  Image,
  FileText,
  Droplets,
  RotateCw,
  Trash2,
  FileOutput,
  History,
  LockKeyhole,
  Zap,
  Target,
  ArrowRight,
} from "lucide-react";

function App() {
  const { token } = useContext(AuthContext);

  const features = [
    {
      icon: Link2,
      title: "Merge PDFs",
      desc: "Combine multiple PDF files into one seamlessly",
      color: "from-blue-500 to-cyan-500",
      iconColor: "text-blue-500",
    },
    {
      icon: Scissors,
      title: "Split PDF",
      desc: "Divide PDFs into individual pages instantly",
      color: "from-purple-500 to-pink-500",
      iconColor: "text-purple-500",
    },
    {
      icon: FileText,
      title: "JPG to PDF",
      desc: "Convert images to professional PDF documents",
      color: "from-green-500 to-emerald-500",
      iconColor: "text-green-500",
    },
    {
      icon: Image,
      title: "PDF to JPG",
      desc: "Extract pages as high-quality images",
      color: "from-orange-500 to-red-500",
      iconColor: "text-orange-500",
    },
    {
      icon: Package,
      title: "Compress PDF",
      desc: "Reduce file size without losing quality",
      color: "from-pink-500 to-rose-500",
      iconColor: "text-pink-500",
    },
    {
      icon: Droplets,
      title: "Watermark PDF",
      desc: "Add custom text or image watermarks to PDFs",
      color: "from-cyan-500 to-blue-500",
      iconColor: "text-cyan-500",
    },
    {
      icon: RotateCw,
      title: "Rotate PDF",
      desc: "Rotate pages to the correct orientation instantly",
      color: "from-yellow-500 to-orange-500",
      iconColor: "text-yellow-500",
    },
    {
      icon: Trash2,
      title: "Delete Pages",
      desc: "Remove unwanted pages from your PDF documents",
      color: "from-red-500 to-orange-600",
      iconColor: "text-red-500",
    },
    {
      icon: FileOutput,
      title: "Extract Pages",
      desc: "Extract selected pages into a new PDF file",
      color: "from-indigo-500 to-purple-500",
      iconColor: "text-indigo-500",
    },
  ];

  const stats = [
    { number: "10K+", label: "Files Processed" },
    { number: "1.5K+", label: "Happy Users" },
    { number: "99.9%", label: "Uptime" },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-950">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="text-center">
            {/* Badge */}
            <div className="mb-6 inline-block">
              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-medium">
                <Sparkles className="w-6 h-6 text-orange-500" /> The Ultimate
                PDF Solution
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
                  Get Started Free{" "}
                  <ArrowRight className="w-4 h-4 inline-block ml-2" />
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
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 py-12">
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
                  <div className="text-5xl mb-4 block">
                    <feature.icon
                      className={`w-12 h-12 ${feature.iconColor}`}
                    />
                  </div>
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
        <section className="max-w-7xl mx-auto px-6 py-2 mb-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-blue-400/50 transition-all duration-300">
              <div className="text-4xl mb-4">
                <LockKeyhole className="w-12 h-12 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Secure</h3>
              <p className="text-gray-400">
                All files are encrypted and automatically deleted after
                processing
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-cyan-400/50 transition-all duration-300">
              <div className="text-4xl mb-4">
                <Zap className="w-12 h-12 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-400">
                Process multiple files instantly with our optimized servers
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-blue-400/50 transition-all duration-300">
              <div className="text-4xl mb-4">
                <Target className="w-12 h-12 text-green-400" />
              </div>
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
        <section className="max-w-4xl mx-auto px-6 py-2">
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
        <section className="border-t border-white/10 py-4 mt-12">
          <div className="max-w-6xl mx-auto px-6 text-center text-gray-400">
            <p>
              &copy; 2026 PDF Toolkit. Trusted by thousands of users worldwide.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
