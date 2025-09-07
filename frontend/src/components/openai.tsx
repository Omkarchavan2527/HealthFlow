import { useState } from "react";
import { searchMedicine } from "./medicineHelper"; // import helper

function MedicineSearch() {
  const [medicine, setMedicine] = useState("");
  const [info, setInfo] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // new loading state

  const handleSearch = async () => {
    setError("");
    setInfo(null);

    if (!medicine.trim()) {
      setError("Please enter a medicine name.");
      return;
    }

    setLoading(true); // start spinner
    try {
      const result = await searchMedicine(medicine);
      if (result) {
        setInfo(result);
      } else {
        setError("No information found in FDA database.");
      }
    } catch {
      setError("Error fetching medicine info.");
    } finally {
      setLoading(false); // stop spinner
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Medicine Info Finder</h2>

      <input
        className="border p-2 w-full mb-4"
        type="text"
        value={medicine}
        placeholder="Enter medicine (brand or generic)"
        onChange={(e) => setMedicine(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center disabled:opacity-50"
        onClick={handleSearch}
        disabled={loading} // disable button while loading
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          "Search"
        )}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {info && (
        <div className="border p-4 mt-4 rounded bg-gray-50">
          <h3 className="font-semibold text-lg">
            {info.openfda?.generic_name?.[0] || "Unknown"}{" "}
            {info.openfda?.brand_name && `(${info.openfda.brand_name.join(", ")})`}
          </h3>
          <p>
            <strong>Uses:</strong>{" "}
            {info.indications_and_usage?.[0] || "Not available"}
          </p>
          <p>
            <strong>Dosage:</strong>{" "}
            {info.dosage_and_administration?.[0] || "Not available"}
          </p>
          <p>
            <strong>Warnings:</strong>{" "}
            {info.warnings?.[0] || "Not available"}
          </p>
        </div>
      )}
    </div>
  );
}

export default MedicineSearch;
