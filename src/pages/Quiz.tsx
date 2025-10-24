import React from 'react';
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";

const Quiz: React.FC = () => {
  return (
    <>
      <Navbar/>

      <main className="main-content">
        <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white">
          <h1 className="text-4xl font-bold">KidsCoder Quiz Guide - Coming Soon!</h1>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Quiz;