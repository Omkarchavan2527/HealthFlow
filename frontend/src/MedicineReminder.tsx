import { useNotification } from "./useNotification";
import { useUser } from "./components/UserContext";

export default function MedicineReminder() {
  const { user } = useUser();
 if (!user) {
    alert("User not found. Please log in first.");
    return;
  }
  const { subscribeUser } = useNotification();
  const handleSubscribe = async () => {

    alert("entered")
    await subscribeUser();
    alert("Subscribed to medicine reminders!");
  };

  const handleSchedule = async () => {
    const time = new Date();
    time.setHours(13, 19, 0, 0); 

    const res=await fetch("http://localhost:5000/api/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
         userId: user.id, 
        title: "Medicine Reminder 💊",
        body: "Time to take Paracetamol 500mg",
        time: time.toISOString(),
      }),
    });
console.log(res)
    alert("Reminder scheduled!");
  };

  return (
    <div className="p-4">
      <button
        onClick={handleSubscribe}
        className="bg-green-600 text-white px-4 py-2 rounded mb-2"
      >
        Enable Notifications
      </button>
      <br />
      <button
        onClick={handleSchedule}
       
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Schedule 9:00 AM Reminder
      </button>
    </div>
  );
}
