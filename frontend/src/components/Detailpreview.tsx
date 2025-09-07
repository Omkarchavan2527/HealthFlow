import { useState, useEffect } from "react";
import { useUser } from "./UserContext";
import { gridItems } from "../data";
import ChartComponent from "./chartcomponent";
import DietExercisePlan from "./DietExercisePlan";
type Medicine = {
  _id: string;
  MedicineName: string;
  Type: string;
  Schedule: string;
  startDate: string;
};

export default function DetailLoggedIn() {
  const[totalMedicines,settotalMedicines]  =useState(0);
  const[takenMedicines,settakenMedicines]  =useState(0);
  const[Adherence,setAdherence]  =useState(0);

  const [allMedicines, setAllMedicines] = useState<Medicine[]>([]);
  const [windowMedicines, setWindowMedicines] = useState<Medicine[]>([]);
  // const [pastcount, setpastcount] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();

  // ✅ Safe remove medicine
  const removeMedicine = async (index: number) => {
    if (!user?.id) return;

    try {
      const res = await fetch("http://localhost:5000/medicines/window/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, index }),
      });

      if (!res.ok) {
        console.error("Remove API failed", res.status);
        return;
      }


      const data = await res.json();

   setAdherence(data.adherencerate);
    const totaltaken=allMedicines.length-data.removedCount;
settotalMedicines(totaltaken);
settakenMedicines(data.removedCount)

     
if (data && Array.isArray(data.currentWindow)) {
  setWindowMedicines(data.currentWindow);
} else if (Array.isArray(data)) {
  // in case backend directly sends an array
  setWindowMedicines(data);
} else {
  console.warn("Unexpected backend response:", data);
  setWindowMedicines([]);
}
    } catch (err) {
      console.error("Failed to remove medicine", err);
    }
  };

  // ✅ Fetch medicines + window
  useEffect(() => {
    if (!user?.id) return;

    const fetchMedicines = async () => {
      try {
        const date = new Date().toISOString().split("T")[0];

        // 1️⃣ Fetch all medicines for user
        const res = await fetch("http://localhost:5000/api/medicines", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: user.id, date }),
        });

        if (!res.ok) {
          console.error("Medicines API failed", res.status);
          return;
        }

        const medicines: Medicine[] = await res.json();
        setAllMedicines(Array.isArray(medicines) ? medicines : []);

        // 2️⃣ Get current window from backend
        const windowRes = await fetch("http://localhost:5000/medicines/window", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, allMedicines: medicines }),
        });
        if (!windowRes.ok) {
          console.error("Window API failed", windowRes.status);
          return;
        }

        const windowData = await windowRes.json();
        setAdherence(windowData.adherencerate);
        console.log(windowData);
          let pastcounts=windowData.total-windowData.currentWindow.length;
        settakenMedicines(pastcounts);

        settotalMedicines(windowData.currentWindow.length);

        

        if (windowData && Array.isArray(windowData.currentWindow)) {
  setWindowMedicines(windowData.currentWindow);
} else if (Array.isArray(windowData)) {
  // in case backend directly sends an array
  setWindowMedicines(windowData);
} else {
  console.warn("Unexpected backend response:", windowData);
  setWindowMedicines([]);
}
      } catch (err) {
        console.error("Failed to fetch medicines or window", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mt-10 mb-14 mx-10 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-4">
      {gridItems.map((item) => (
        <div key={item.title} className={item.className}>
          <div className={item.titleClassName}>{item.title}</div>

          {/* ✅ Upcoming medication */}
          {item.title === "Upcoming medication" && (
            <div className="mt-2">
              {!windowMedicines || windowMedicines.length === 0 ? (
                <p>No medications found.</p>
              ) : (
                windowMedicines.map((med, index) => (
                  <div key={med._id || index} className="medicine-card text-black mt-2">
                    <div className="medicine-header flex justify-between items-center">
                      <h4>{med.MedicineName}</h4>
                      <button
                        className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition"
                        onClick={() => removeMedicine(index)}
                      >
                        Reminder On
                      </button>
                    </div>
                    <p className="dosage">
                      {med.Type} - {med.Schedule}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ✅ Chart */}
          {item.title === "Medication taken" && (
            <div className=" text-sm h-[200px] text-blue-600 mt-2">
              <ChartComponent
                type="doughnut"
                remaining={totalMedicines}
                taken={takenMedicines}
                title="Today's Medicine Status"
              />
            </div>
          )}
{item.title === 'Adherence Rate' && (
              <div className="text-lg font-extrabold font-stretch-extra-expanded  mt-2">
                <p >  {Adherence }  of doses taken on time</p>
              </div>
            )}

          {/* ✅ Diet plan */}
          {item.title === "Diet & Exercise plan" && (
          <DietExercisePlan />
          )}
        </div>
      ))}
    </div>
  );
}
