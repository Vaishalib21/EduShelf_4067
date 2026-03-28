import React from "react";
<file>d</file>
function Footer() {
  return (
    <footer className="bg-base-200 dark:bg-slate-700 text-gray-800 dark:text-white py-8">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-20 flex flex-col items-center space-y-4">

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-6">
          <a href="/" className="hover:text-pink-500">Home</a>
          <a href="/course" className="hover:text-pink-500">Courses</a>
          <a href="/contact" className="hover:text-pink-500">Contact</a>
          <a href="/about" className="hover:text-pink-500">About</a>
        </div>

        {/* Author Info */}
        <div className="text-center space-y-1">
          <p className="font-semibold text-lg">Vaishali Bansal</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">BCA Sem 6</p>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} bookStore. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;