import axios from "axios";

// Types for safety
export interface MedicineInfo {
  openfda?: {
    generic_name?: string[];
    brand_name?: string[];
  };
  indications_and_usage?: string[];
  dosage_and_administration?: string[];
  warnings?: string[];
}

// Helper to fetch from OpenFDA
const fetchFromOpenFDA = async (name: string): Promise<MedicineInfo | null> => {
  try {
    const res = await axios.get(
      `https://api.fda.gov/drug/label.json?search=openfda.generic_name:${encodeURIComponent(
        name
      )}+openfda.brand_name:${encodeURIComponent(name)}&limit=1`
    );
    if (res.data.results?.length) {
      return res.data.results[0] as MedicineInfo;
    }
    return null;
  } catch {
    return null;
  }
};

// Helper to get generic name via RxNorm
const fetchGenericFromRxNorm = async (brand: string): Promise<string | null> => {
  try {
    const res = await axios.get(
      `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${encodeURIComponent(brand)}`
    );
    const drugGroup = res.data?.drugGroup;
    if (drugGroup?.conceptGroup) {
      for (const group of drugGroup.conceptGroup) {
        if (group.conceptProperties) {
          // Return the first generic name found
          return group.conceptProperties[0].name;
        }
      }
    }
    return null;
  } catch {
    return null;
  }
};

// Main search function
export const searchMedicine = async (
  medicineName: string
): Promise<MedicineInfo | null> => {
  // 1. Try OpenFDA directly
  let info = await fetchFromOpenFDA(medicineName);
  if (info) return info;

  // 2. If not found, try RxNorm to get generic
  const generic = await fetchGenericFromRxNorm(medicineName);
  if (generic) {
    info = await fetchFromOpenFDA(generic);
    if (info) return info;
  }

  // 3. If still nothing
  return null;
};
