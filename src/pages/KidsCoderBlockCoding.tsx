import React from 'react';
import Navbar from "../components/Navbar.tsx";

const KidsCoderBlockCoding: React.FC = () => {
  return (
    <>
      <Navbar/>

      <main className="main-content">
        <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white">
          <h1 className="text-4xl font-bold">KidsCoder Block Coding - Coming Soon!</h1>
        </div>
      </main>
    </>
  );
};

export default KidsCoderBlockCoding;