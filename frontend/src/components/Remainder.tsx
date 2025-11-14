import { useState, useEffect } from "react";
import { useUser } from "./UserContext";
import "../allcss/Reminder.css";
import api from "../api";

// Define medicine type according to your backend schema
interface Medicine {
  _id: string;
  MedicineName: string;
  Type: string;
  Schedule: string;
  startDate: string;
  Duration: string;
  Frequency: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

const Reminder = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser();

  // Fetch medicines for a given date
  const fetchMedicines = async (date: Date) => {
    if (!user?.id) return; // Don't fetch if user is not ready
   
    console.log(date);
    setLoading(true);
    try {
      const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
      const res = await api.post<Medicine[]>(
        "/api/medicines",
        {
          id: user.id,           // sending user id in the body
          date: formattedDate    // optional: send the date as well
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      setMedicines(res.data);
    } catch (err) {
      console.error("Error fetching medicines:", err);
      setMedicines([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch for today
  useEffect(() => {
    if (!user?.id) return; // Don't fetch if user is not ready

    fetchMedicines(selectedDate);
  }, []);

  // Generate next 7 days
  const getNext7Days = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    return [...Array(7)].map((_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return {
        fullDate: d,
        day: days[d.getDay()],
        date: d.getDate(),
        isToday: i === 0,
      };
    });
  };

  return (
    <div className="reminder-container">
      <h2 className="reminder-title">Your Medicines Reminder</h2>

      {/* Date Selector */}
      <div className="date-selector">
        {getNext7Days().map((d, idx) => (
          <div
            key={idx}
            className={`date-pill ${selectedDate.getDate() === d.date ? "selected" : ""
              } ${d.isToday ? "today" : ""}`}
            onClick={() => {
              setSelectedDate(d.fullDate);
              fetchMedicines(d.fullDate);
            }}
          >
            <div className="date-number">{d.date}</div>
            <div className="day-label">{d.day}</div>
          </div>
        ))}
      </div>

      {/* Medicines List */}
      <div className="medicine-list">
        {loading ? (
          <p>Loading medicines...</p>
        ) : medicines.length === 0 ? (
          <p>No medicines scheduled for this day</p>
        ) : (
          medicines.map((med) => (
            <div key={med._id} className="medicine-card">
              <div className="medicine-header">
                <h4>{med.MedicineName}</h4>
                <span>{med.Schedule}</span>
              </div>
              <p className="dosage">{med.Type}</p>
              <div className="time-tags">
                <span className="time-tag">{med.Frequency}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reminder;
