export default function CallToAction({ results }: any) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-8 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to Implement These Insights?</h2>
      <p className="text-xl mb-6">Book a free 30-minute strategy call to discuss your personalized roadmap</p>
      <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
        📞 Schedule Strategy Call
      </button>
    </div>
  );
}
