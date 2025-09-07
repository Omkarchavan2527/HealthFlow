import { useState } from "react";
import CustomDietPlan from "./CustomDietPlan";

function DietExercisePlan() {
  const [customPlan, setCustomPlan] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  return (
    <div className="text-sm mt-6 space-y-6 p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 rounded-3xl shadow-2xl ring-1 ring-gray-700">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-cyan-400 tracking-wide text-shadow-lg">
          A Balanced Diet Plan for Everyone
        </h2>
        <p className="text-gray-300 text-md leading-relaxed">
          This plan provides general guidance for healthy eating and lifestyle habits. Adjust as necessary to fit your individual needs.
        </p>
        <ul className="space-y-2 list-disc list-inside text-gray-200">
          <li><strong>Focus on Whole Foods:</strong> Prioritize fruits, vegetables, whole grains, and lean proteins.</li>
          <li><strong>Stay Hydrated:</strong> Drink plenty of water throughout the day.</li>
          <li><strong>Limit Processed Foods:</strong> Reduce sugary drinks, processed snacks, and fast food.</li>
          <li><strong>Regular Physical Activity:</strong> At least 30 minutes of moderate exercise daily.</li>
          <li><strong>Listen to Your Body:</strong> Eat when hungry, stop when satisfied.</li>
        </ul>
      </div>

      <button
        className="mt-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300"
        onClick={() => setShowCustomInput(!showCustomInput)}
      >
        {showCustomInput ? "Cancel" : "Add Your Own Diet Plan"}
      </button>

      {showCustomInput && (
        <div className="mt-4 space-y-3">
          <textarea
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl shadow-inner text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300"
            rows={5}
            placeholder="Enter your personalized diet plan here..."
            value={customPlan}
            onChange={(e) => setCustomPlan(e.target.value)}
          />
        </div>
      )}

      {/* Use the separate component to display the custom plan */}
      <CustomDietPlan planText={customPlan} />
    </div>
  );
}

export default DietExercisePlan;
