interface CustomDietPlanProps {
  planText: string;
}

const CustomDietPlan = ({ planText }: CustomDietPlanProps) => {
  if (!planText) return null;

  return (
    <div className="mt-2 p-4 border border-cyan-400 bg-gradient-to-tr from-gray-900 to-gray-800 rounded-2xl shadow-lg text-cyan-300 font-mono overflow-auto max-h-48 relative">
      <div className="absolute top-2 right-3 text-cyan-400 text-sm opacity-70">💾 Saved</div>
      <h3 className="text-lg font-bold text-cyan-400 mb-2 border-b border-cyan-400 pb-1">
        Your Custom Diet Plan
      </h3>
      <p className="whitespace-pre-line leading-relaxed">{planText}</p>
    </div>
  );
};

export default CustomDietPlan;
