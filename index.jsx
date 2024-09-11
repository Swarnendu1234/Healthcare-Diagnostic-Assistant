import React, { useState } from 'react';
import { FaUpload, FaSearch, FaInfoCircle, FaArrowRight } from 'react-icons/fa';
import { MdAccessibility } from 'react-icons/md';

const SwarnHealthAssistant = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setUploadedImage(URL.createObjectURL(file));
    setCurrentPage('analysis');
    simulateAnalysis();
  };

  const simulateAnalysis = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setAnalysisProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setAnalysisResult({
          disease: 'Pneumonia',
          confidence: '95%',
          treatment: 'Antibiotics and rest',
          risk: 'Moderate'
        });
      }
    }, 500);
  };

  const LandingPage = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <h1 className="text-4xl font-bold text-blue-800 mb-6">Welcome to SwarnHealth Assistant</h1>
      <p className="text-xl text-gray-600 mb-8 text-center max-w-2xl">
        Upload your medical images for instant analysis and disease detection.
      </p>
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="imageUpload"
        />
        <label
          htmlFor="imageUpload"
          className="bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center cursor-pointer hover:bg-blue-700 transition duration-300"
        >
          <FaUpload className="mr-2" />
          Upload Medical Image
        </label>
      </div>
    </div>
  );

  const AnalysisPage = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">Image Analysis</h2>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <img src={uploadedImage} alt="Uploaded medical image" className="w-1/2 h-48 object-cover rounded" />
          <div className="w-1/2 pl-4">
            <h3 className="text-xl font-semibold mb-2">Analysis Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${analysisProgress}%` }}
              ></div>
            </div>
            {analysisResult && (
              <div>
                <p className="font-semibold">Detected: {analysisResult.disease}</p>
                <p>Confidence: {analysisResult.confidence}</p>
              </div>
            )}
          </div>
        </div>
        {analysisResult && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Treatment Plan</h3>
            <p>{analysisResult.treatment}</p>
            <h3 className="text-xl font-semibold mt-4 mb-2">Risk Assessment</h3>
            <p>Risk Level: {analysisResult.risk}</p>
            <button
              onClick={() => setCurrentPage('report')}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
            >
              View Detailed Report
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const ReportPage = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">Detailed Report</h2>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Diagnosis</h3>
            <p className="mb-4">
              Based on the image analysis, there is a high probability (95% confidence) of Pneumonia.
              The AI model detected characteristic patterns in the lung tissue consistent with this condition.
            </p>
            <h3 className="text-xl font-semibold mb-2">Treatment Plan</h3>
            <ul className="list-disc pl-5 mb-4">
              <li>Prescribed antibiotics for 7-10 days</li>
              <li>Rest and hydration</li>
              <li>Follow-up chest X-ray in 2 weeks</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Risk Assessment</h3>
            <p className="mb-4">
              The risk level is considered moderate. While pneumonia can be serious, with proper treatment
              and care, most patients recover fully. However, close monitoring is advised.
            </p>
            <h3 className="text-xl font-semibold mb-2">Recommendations</h3>
            <ul className="list-disc pl-5">
              <li>Consult with a pulmonologist for a comprehensive evaluation</li>
              <li>Monitor symptoms closely and seek immediate care if condition worsens</li>
              <li>Consider pneumococcal vaccination for future prevention</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setCurrentPage('analysis')}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Back to Analysis
          </button>
          <button
            onClick={() => setCurrentPage('landing')}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
          >
            Start New Analysis
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative">
      {currentPage === 'landing' && <LandingPage />}
      {currentPage === 'analysis' && <AnalysisPage />}
      {currentPage === 'report' && <ReportPage />}
      <button
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-300"
        title="Accessibility Options"
      >
        <MdAccessibility size={24} />
      </button>
    </div>
  );
};

export default SwarnHealthAssistant;