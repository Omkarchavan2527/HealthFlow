import { gridItems } from '../data'
import '../allcss/Reminder.css';
import ChartComponent from './chartcomponent';


const reminders = [
  {
    name: 'Paracetamol XL2',
    dosage: '150mg, 1 capsule',
    times: ['After Breakfast', 'After Dinner'],
    color: 'primary',
  },
  {
    name: 'DPP-4 Inhibitors',
    dosage: '150mg, 1 capsule',
    times: ['After Lunch'],
    color: 'success',
  },
  {
    name: 'Meglitinides',
    dosage: '150mg, 1 capsule',
    times: ['Before Breakfast', 'Before Dinner'],
    color: 'warning',
  },
];
import { useUser } from './UserContext';


export default function Detail() {
const { user } = useUser();
 
  return ( 
    // return(
      <div className="mt-10 mb-14 mx-10 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-4">

        {gridItems.map((item) => (
          <div className={item.className}>
            <div className={item.titleClassName}>{item.title}</div>

               {!user && item.title === 'Upcoming medication' && (
              <div className="text-sm  text-black mt-2"><div className="medicine-list">
                {reminders.map((med, index) => (
                  <div key={index} className="medicine-card">
                    <div className="medicine-header">
                      <h4>{med.name}</h4>
                      <span className={`badge bg-${med.color}`}>Reminder On</span>
                    </div>
                    <p className="dosage">{med.dosage}</p>
                    <div className="time-tags">
                      {med.times.map((time, i) => (
                        <span key={i} className="time-tag">
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}

              </div>
                <span className='text-white'>*This is a preview. Sign in to manage your medication.*</span>

              </div>
            )}

            

            {item.title === 'Medication taken' && (
              <div className="preview-blur text-sm h-[200px] text-blue-600 mt-2">
                <ChartComponent type="doughnut" />
              </div>
            )}

            {item.title === 'Notification' && (
              <div className="text-sm h-[200px] text-blue-600 mt-2">
                <ChartComponent type="pie" />
              </div>
            )}

            {item.title === 'Adherence Rate' && (
              <div className="text-sm  mt-2">
                <p> ✔️ 85% of doses taken on time
                  🔒 Log in to see your real adherence</p>
              </div>
            )}

            {item.title === 'Next Appointment' && (
              <div className="text-sm  mt-2">
                <p>   Dr. Smith
                  Cardiology Check-up
                  Aug 10, 2025 - 3:00 PM
                  🔒 Log in to manage appointments
                </p>
              </div>
            )}
            {item.title === 'Diet & Exercise plan' && (
              <div className="text-sm  mt-2">
                <p>
                  🥗 1500 kcal / day
                  🏃 30 min walk daily
                  🔒 Log in to customize
                </p>
              </div>
            )}



          </div>
        ))}
      </div>
    )
  }


