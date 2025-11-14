import React from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useUser } from './UserContext';
import api from "../api";
import "../allcss/AddRemainder.css"; // your existing CSS

// 1️⃣ Define the form data shape
interface ReminderFormData {
  name: string;
  type: string;
  tag: string;
  startDate: string;
  duration: string;
  frequency: string;
  createdBy:BigInteger;
}

const AddReminder: React.FC = () => {
  const { register, handleSubmit } = useForm<ReminderFormData>();
    const { user } = useUser();
  

  // 2️⃣ Submit handler with typed data
const onSubmit: SubmitHandler<ReminderFormData> = async (data) => {
  try {
    const payload = {
      MedicineName: data.name,
      Type: data.type,
      Schedule: data.tag,
      startDate: data.startDate,
      Duration: data.duration,
      Frequency: data.frequency,
      createdBy:user?.id,
    };
    const res = await api.post("/add", payload); 
  {alert(res.data.msg)}

  } catch (err) {
    console.error("Error submitting form:", err);
  }
};

  return (
    <div className="reminder-card">
      <h4 className="card-title">Add Reminder</h4>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Medicine Name</label>
          <input
            {...register("name")}
            type="text"
            className="form-input"
            placeholder="e.g. Abacovir"
          />
        </div>

        <div className="form-group">
          <label>Type</label>
          <select {...register("type")} className="form-select">
            <option value="pill">Pill</option>
            <option value="capsule">Capsule</option>
            <option value="injection">Injection</option>
            <option value="syrup">Syrup</option>
          </select>
        </div>

        <div className="form-group">
          <label>Time & Schedule</label>
          <select {...register("tag")} className="form-select">
            <option value="After Breakfast">After Breakfast</option>
            <option value="After Dinner">After Dinner</option>
            <option value="Before Lunch">Before Lunch</option>
          </select>
        </div>

        <div className="form-group">
          <label>Start Date</label>
          <input type="date" {...register("startDate")} className="form-input" />
        </div>

        <div className="form-group-inline">
          <div>
            <label>Duration</label>
            <select {...register("duration")} className="form-select">
              <option value="1 Month">1 Month</option>
              <option value="3 Months">3 Months</option>
              <option value="6 Months">6 Months</option>
            </select>
          </div>
          <div>
            <label>Frequency</label>
            <select {...register("frequency")} className="form-select">
              <option value="Daily">Daily</option>
              <option value="Every Other Day">Every Other Day</option>
              <option value="Weekly">Weekly</option>
            </select>
          </div>
        </div>

        <div className="btn-wrapper">
          <button type="submit" className="add-btn">
            Add Reminder
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReminder;
