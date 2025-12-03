import React from 'react';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Head>
        <title>PaddyFlow Insights</title>
      </Head>

      {/* NAVIGASI */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-green-700">PaddyFlow Insights</span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#dashboard" className="text-gray-600 hover:text-green-700 font-medium">Dasbor</a>
              <a href="#analysis" className="text-gray-600 hover:text-green-700 font-medium">Analisis</a>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative bg-green-900 text-white">
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <span className="uppercase tracking-wide text-green-300 font-semibold mb-2">Rantai Pasokan Beras Berkelanjutan</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Buka Efisiensi dalam <br />Rantai Pasokan Anda</h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-200">
            PaddyFlow Insights menyediakan alat analisis canggih untuk mengoptimalkan efisiensi proses.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="#dashboard" className="px-8 py-3 bg-white text-green-900 rounded-md font-bold hover:bg-gray-100">
              Lihat Dasbor
            </a>
          </div>
        </div>
      </header>

      {/* DASHBOARD SECTION */}
      <section id="dashboard" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Dasbor Analitik</h2>
          <div className="mt-8 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl h-64 flex items-center justify-center">
            <p className="text-gray-500">Area Grafik / Power BI (Placeholder)</p>
          </div>
        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p>&copy; 2025 PaddyFlow Insights.</p>
      </footer>
    </div>
  );
}