import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Home() {
  const [visitors, setVisitors] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/visitor-count')
      .then(res => res.json())
      .then(data => setVisitors(data.count))
      .catch(() => setVisitors(null));
  }, []);

  return (
    <>
      <Navbar />
      <section className="bg-gradient-to-br from-blue-100 to-white min-h-[calc(100vh-64px)] flex flex-col justify-center items-center text-center p-6">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">বাংলাস্ক্রিপ্ট</h1>
        <p className="max-w-2xl text-lg text-gray-700 leading-relaxed mb-6">
          বাংলায় কোড লেখার জন্য তৈরি একটি শিক্ষামূলক প্রোগ্রামিং ভাষা। সহজ, সরল ও মাতৃভাষায় শেখার নতুন পথ।
        </p>
        <p className="text-sm text-gray-600 mb-4">
          মোট ভিজিটর: <span className="font-bold">{visitors ?? 'লোড হচ্ছে...'}</span>
        </p>
        <button
          onClick={() => navigate('/editor')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition"
        >
          কোড শুরু করুন →
        </button>
      </section>
    </>
  );
}
