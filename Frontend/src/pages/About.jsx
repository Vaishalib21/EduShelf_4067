import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Main Content */}
      <div className="mt-16 max-w-screen-2xl container mx-auto md:px-20 px-4 py-16">
        
        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">
          About <span className="text-pink-500">Us</span>
        </h1>

        {/* Intro Section */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-lg mb-4">
            Welcome to our online bookstore 📚 — your one-stop destination for
            discovering knowledge, inspiration, and growth.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            We are passionate about making quality books accessible to everyone.
            Whether you're a student, a professional, or a curious learner, our
            platform offers a wide range of books to help you learn and grow.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          
          <div className="p-6 rounded-2xl shadow-lg hover:scale-105 duration-300 dark:bg-slate-900 dark:border">
            <h2 className="text-xl font-semibold text-pink-500 mb-2">
              📖 Wide Collection
            </h2>
            <p>
              Explore books across categories like self-help, finance, technology,
              and more — all in one place.
            </p>
          </div>

          <div className="p-6 rounded-2xl shadow-lg hover:scale-105 duration-300 dark:bg-slate-900 dark:border">
            <h2 className="text-xl font-semibold text-pink-500 mb-2">
              🚀 Easy Access
            </h2>
            <p>
              Our platform is designed for a smooth and user-friendly experience,
              making it easy to browse and find books.
            </p>
          </div>

          <div className="p-6 rounded-2xl shadow-lg hover:scale-105 duration-300 dark:bg-slate-900 dark:border">
            <h2 className="text-xl font-semibold text-pink-500 mb-2">
              🎯 Our Mission
            </h2>
            <p>
              To promote reading habits and provide valuable knowledge to people
              anytime, anywhere.
            </p>
          </div>

        </div>

        {/* Footer Message */}
        <div className="text-center mt-16">
          <p className="text-lg font-medium">
            Start your reading journey with us today! 📚✨
          </p>
        </div>

      </div>

      {/* ✅ Footer (ALWAYS outside main div) */}
      <Footer />
    </>
  );
}

export default About;