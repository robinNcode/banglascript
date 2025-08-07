import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer.tsx";

export default function Feedback() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setError('সকল ঘর পূরণ করা আবশ্যক।');
      return;
    }

    try {
      // TODO: Replace with actual API
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
      setError('');
    } catch (err) {
      setError('পাঠাতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">প্রতিক্রিয়া দিন</h1>

        {submitted ? (
          <div className="bg-green-100 text-green-800 p-4 rounded shadow text-center">
            ✅ ধন্যবাদ! আপনার প্রতিক্রিয়া গ্রহণ করা হয়েছে।
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
            {error && (
              <div className="bg-red-100 text-red-800 px-4 py-2 rounded">{error}</div>
            )}
            <div>
              <label className="block text-sm font-semibold mb-1">আপনার নাম</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="নাম লিখুন"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">ইমেইল</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">বার্তা</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="আপনার বার্তা লিখুন..."
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
              >
                পাঠান
              </button>
            </div>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
}
