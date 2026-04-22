import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const tools = [
    {
      name: "Merge",
      link: "/merge",
      icon: "🔗",
      description: "Combine multiple PDFs into one",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Split",
      link: "/split",
      icon: "✂️",
      description: "Split PDFs into separate pages",
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Compress",
      link: "/compress",
      icon: "📦",
      description: "Reduce PDF file size",
      color: "from-green-500 to-green-600",
    },
    {
      name: "PDF → JPG",
      link: "/pdf-to-jpg",
      icon: "🖼️",
      description: "Convert PDF pages to images",
      color: "from-orange-500 to-orange-600",
    },
    {
      name: "JPG → PDF",
      link: "/jpg-to-pdf",
      icon: "📄",
      description: "Convert images to PDF format",
      color: "from-pink-500 to-pink-600",
    },
    {
      name: "Watermark",
      link: "/watermark",
      icon: "💧",
      description: "Add watermarks to your PDFs",
      color: "from-cyan-500 to-blue-600",
    },
    {
      name: "Rotate",
      link: "/rotate",
      icon: "🔄",
      description: "Rotate PDF pages as needed",
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Delete Pages",
      link: "/delete-pages",
      icon: "🗑️",
      description: "Remove unwanted pages from PDFs",
      color: "from-red-500 to-orange-600",
    },
    {
      name: "Extract Pages",
      link: "/extract-pages",
      icon: "📤",
      description: "Extract specific pages from PDFs",
      color: "from-indigo-500 to-purple-600",
    },
    {
      name: "History",
      link: "/history",
      icon: "⏱️",
      description: "View your recent conversions",
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-950">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-300 mb-2">PDF Tools</h1>
          <p className="text-gray-400">
            Process your documents with ease and precision
          </p>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Tools Grid */}
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {tools.map((tool) => (
              <Link key={tool.name} to={tool.link} className="group relative">
                <div className="h-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
                  {/* Color Bar */}
                  <div className={`h-2 bg-linear-to-r ${tool.color}`}></div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Icon */}
                    <div
                      className={`text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300`}
                    >
                      {tool.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {tool.description}
                    </p>

                    {/* Button */}
                    <div
                      className={`inline-block bg-linear-to-r ${tool.color} text-white px-6 py-2 rounded-lg font-semibold text-sm group-hover:shadow-lg transition-all duration-300`}
                    >
                      Get Started →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
