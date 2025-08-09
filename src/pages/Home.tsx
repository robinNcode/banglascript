import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Typewriter from 'typewriter-effect';
import axios from '../api/axios';

// Icons
import {SquareCode, Cpu} from 'lucide-react';

// Image import for the homepage
import banglaLogo from '../assets/images/bs_horizontal_logo-removebg.png';
import Footer from "../components/Footer.tsx";

export default function Home() {
  const [visitors, setVisitors] = useState<number | null>(null);
  const navigate = useNavigate();

  // Send visitor info to the server when the component mounts ...
  useEffect(() => {
    const sendVisitorInfo = async () => {
      try {
        await axios.post('/api/visitor');
        console.log('Visitor info Sent!');
      } catch (error) {
        console.error('Error sending visitor info:', error);
      }
    };

    sendVisitorInfo().then(response => {
      console.log('Visitor info sent successfully:', response);
    }).catch(error => {
      console.error('Unable to store visitor info:', error);
    });
  }, []);

  // Fetch visitor count from the server
  useEffect(() => {
    axios.get('/api/visitor-count')
      .then(res => setVisitors(res.data.count))
      .catch(() => setVisitors(null));
  }, []);

  return (
    <>
      <Navbar />
      <main className="main-content">
      <section className="from-blue-100 to-white min-h-[calc(100vh-64px)] flex flex-col justify-center items-center text-center p-6">
        <img src={banglaLogo} alt="BanglaScript Logo" className="w-100 h-24 mb-2" />
        <h1 className="text-5xl font-extrabold text-white-800 mb-4">
          <Typewriter
          options={{
            strings: ['বাংলাScript'],
            autoStart: true,
            loop: true,
          }}
        /></h1>
        <p className="max-w-2xl text-lg text-gray-700 leading-relaxed mb-6">
          বাংলায় কোড লেখার জন্য তৈরি একটি শিক্ষামূলক প্রোগ্রামিং ভাষা। সহজ, সরল ও মাতৃভাষায় শেখার নতুন পথ।
        </p>
        <p className="text-sm text-gray-600 mb-4">
          মোট ভিজিটর: <span className="font-bold">{visitors ?? 'লোড হচ্ছে...'}</span>
        </p>
        <button
          onClick={() => navigate('/editor')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition flex items-center gap-2"
        >
          <SquareCode /> কোড শুরু করুন
        </button>

        <p className="mt-8 text-gray-500 flex items-center">
          - ডেভেলপ এবং মেইনটেইন:
          <a className="text-blue-500 flex items-center" href="https://www.linkedin.com/in/robinncode/" target="_blank"><Cpu className="m-2"/>
            <Typewriter
              options={{
                strings: ['MsM Robin'],
                autoStart: true,
                loop: true,
              }}
            />
          </a>
        </p>

      </section>
      </main>
      <Footer />
    </>
  );
}
