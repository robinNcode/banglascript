import Navbar from '../components/Navbar';

export default function Docs() {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800">
        <h1 className="text-4xl font-bold mb-4 text-center text-blue-700">BanglaScript ডকুমেন্টেশন</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">👋 পরিচিতি</h2>
          <p className="text-lg leading-relaxed">
            BanglaScript একটি বাংলাভাষায় প্রোগ্রামিং শেখার প্রাথমিক প্ল্যাটফর্ম। এটি একটি ফান প্রজেক্ট, যা আপনাকে মাতৃভাষায় কোডিংয়ের অভিজ্ঞতা দেবে।
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">📌 কিওয়ার্ড তালিকা</h2>
          <ul className="list-disc list-inside text-lg space-y-1">
            <li><code className="bg-gray-100 px-1 rounded">ধরি</code> — ভ্যারিয়েবল ডিক্লেয়ার করতে</li>
            <li><code className="bg-gray-100 px-1 rounded">দেখাও()</code> — কনসোলে কিছু দেখাতে</li>
            <li><code className="bg-gray-100 px-1 rounded">যদি</code>, <code className="bg-gray-100 px-1 rounded">নয়তো</code> — শর্ত যাচাই</li>
            <li><code className="bg-gray-100 px-1 rounded">জন্য</code>, <code className="bg-gray-100 px-1 rounded">যতক্ষণ</code> — লুপ</li>
            <li><code className="bg-gray-100 px-1 rounded">কাঠামো</code> — ফাংশন তৈরিতে</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">🧪 উদাহরণ</h2>
          <p className="mb-2 text-lg">নিচে একটি সাধারণ কোড উদাহরণ:</p>
          <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-auto">
            {`ধরি নাম = "রহিম";
            দেখাও(নাম);`}
          </pre>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">📚 পরবর্তী</h2>
          <p className="text-lg">
            আরও ডকুমেন্টেশন, ফিচার, গাইড এবং ভিডিও টিউটোরিয়াল শীঘ্রই যুক্ত হবে। অবদান রাখতে চাইলে GitHub রিপোজিটরিতে PR করুন।
          </p>
        </section>
      </div>
    </>
  );
}
