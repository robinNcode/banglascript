import { useState, type SetStateAction} from 'react';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer.tsx";
import topics from '../data/documentationTopics.json';
import {javascript} from "@codemirror/lang-javascript";
import CodeMirror from '@uiw/react-codemirror';

export default function Docs() {
  const [activeTopic, setActiveTopic] = useState(topics[0].id);
  const [activeTab, setActiveTab] = useState(0); // New state for the active tab index

  const activeContent = topics.find(topic => topic.id === activeTopic);
  const currentIndex = topics.findIndex(topic => topic.id === activeTopic);

  // Reset tab index when topic changes
  const handleTopicChange = (topicId: SetStateAction<string>) => {
    setActiveTopic(topicId);
    setActiveTab(0);
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      handleTopicChange(topics[currentIndex - 1].id);
    }
  };

  const goToNext = () => {
    if (currentIndex < topics.length - 1) {
      handleTopicChange(topics[currentIndex + 1].id);
    }
  };

  return (
    <>
      <Navbar />
      <main className="main-content">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 p-6 border-r border-gray-300">
          <ul>
            {topics.map((topic) => (
              <li key={topic.id} className="mb-1">
                <button
                  onClick={() => handleTopicChange(topic.id)}
                  className={`w-full text-left p-1 rounded transition-colors duration-200
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
          {activeContent && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">{activeContent.title}</h2>
              <p className="mb-4 text-lg">
                {activeContent.description}
              </p>

              {/* Tabs for multiple examples */}
              {activeContent.examples.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold mb-2 text-blue-500">উদাহরণ</h3>
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

                  <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-auto">
                    <CodeMirror
                      value={activeContent.examples[activeTab].code}
                      height="100%"
                      theme="dark"
                      extensions={[javascript()]}
                      className="h-full"
                    />
                  </pre>
                </>
              )}

              {activeContent.extended_description && (
                <section className="mt-10 mb-10 pt-10">
                  <h3 className="text-xl font-semibold mb-2 text-blue-500">বিস্তারিত</h3>
                  <p className="text-lg leading-relaxed">
                    {activeContent.extended_description}
                  </p>
                </section>
              )}

              {activeContent.conclusion && (
                <section className="mt-10 mb-10 pt-10">
                  <h3 className="text-xl font-semibold mb-2 text-blue-500">উপসংহার</h3>
                  <p className="text-lg leading-relaxed">
                    {activeContent.conclusion}
                  </p>
                </section>
              )}

              <div className="flex justify-between mt-8">
                <button
                  onClick={goToPrevious}
                  disabled={currentIndex === 0}
                  className={`py-2 px-4 rounded transition-colors duration-200
                              ${currentIndex === 0
                                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                              }`}
                >
                  পূর্ববর্তী
                </button>
                <button
                  onClick={goToNext}
                  disabled={currentIndex === topics.length - 1}
                  className={`py-2 px-4 rounded transition-colors duration-200
                              ${currentIndex === topics.length - 1
                                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                              }`}
                >
                  পরবর্তী
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
