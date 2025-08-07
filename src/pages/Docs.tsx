import { useState, type SetStateAction} from 'react';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer.tsx";
import topics from '../data/documentationTopics.json';

export default function Docs() {
  const [activeTopic, setActiveTopic] = useState(topics[0].id);
  const [activeTab, setActiveTab] = useState(0); // New state for the active tab index

  const activeContent = topics.find(topic => topic.id === activeTopic);

  // Reset tab index when topic changes
  const handleTopicChange = (topicId: SetStateAction<string>) => {
    setActiveTopic(topicId);
    setActiveTab(0);
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 p-6 border-r border-gray-300">
          <h2 className="text-xl font-bold mb-4 text-blue-700">উদাহরণ সমূহ</h2>
          <hr className="py-1" />
          <ul>
            {topics.map((topic) => (
              <li key={topic.id} className="mb-2">
                <button
                  onClick={() => handleTopicChange(topic.id)}
                  className={`w-full text-left p-2 rounded transition-colors duration-200
                              ${activeTopic === topic.id
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-gray-800 hover:bg-blue-100'
                  }`}
                >
                  {topic.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4 max-w-4xl mx-auto text-gray-800">
          <h1 className="text-4xl font-bold mb-4 text-center text-blue-700">BanglaScript ডকুমেন্টেশন</h1>
          <hr className="py-1" />

          {activeContent && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">{activeContent.title}</h2>
              <p className="mb-4 text-lg">
                এখানে `{activeContent.title}` এর বিস্তারিত ব্যাখ্যা থাকবে।
              </p>

              {/* Tabs for multiple examples */}
              {activeContent.examples.length > 1 && (
                <div className="flex border-b border-gray-300 mb-4">
                  {activeContent.examples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(index)}
                      className={`py-2 px-4 text-lg font-medium transition-colors duration-200
                                  ${activeTab === index
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-600 hover:text-blue-500'
                      }`}
                    >
                      {example.tab}
                    </button>
                  ))}
                </div>
              )}

              <h3 className="text-xl font-semibold mb-2 text-blue-500">উদাহরণ</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-auto">
                <code>
                  {activeContent.examples[activeTab].code}
                </code>
              </pre>
            </section>
          )}

          <section className="mt-10 mb-10 border-t pt-10">
            <h2 className="text-2xl font-semibold mb-2 text-blue-600">👋 পরিচিতি</h2>
            <p className="text-lg leading-relaxed">
              BanglaScript একটি বাংলাভাষায় প্রোগ্রামিং শেখার প্রাথমিক প্ল্যাটফর্ম। এটি একটি ফান প্রজেক্ট, যা আপনাকে মাতৃভাষায় কোডিংয়ের অভিজ্ঞতা দেবে।
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-600">📚 পরবর্তী</h2>
            <p className="text-lg">
              আরও ডকুমেন্টেশন, ফিচার, গাইড এবং ভিডিও টিউটোরিয়াল শীঘ্রই যুক্ত হবে। অবদান রাখতে চাইলে GitHub রিপোজিটরিতে PR করুন।
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}