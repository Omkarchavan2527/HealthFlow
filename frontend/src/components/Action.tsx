import { Component } from 'react';
import { Link } from 'react-router-dom';
import { actions } from '../data';

export class Action extends Component {
  render() {
    return (
      <div className='mt-10'>
        <h3 className='text-3xl font-bold text-center'>Quick Actions</h3>

        <div className='flex flex-wrap gap-y-3 justify-evenly mt-5'>
          {actions.map((action) => (
            <div
              key={action.id}
              className="lg:min-h-[14.5rem] h-[14.5rem] flex flex-wrap items-center justify-center sm:w-66 w-[80vw]"
            >
              <div
                className="relative w-full h-full rounded-2xl overflow-hidden lg:rounded-3xl flex flex-col items-center justify-center p-4"
                style={{ backgroundColor: "#13162D" }}
              >
                {action.link ? (
                  <Link
                    to={action.link}
                    className="w-full h-full flex flex-col items-center justify-center text-white"
                  >
                    <img src={action.logo} alt={action.name} className="w-24" />
                    <div className="mt-5">{action.name}</div>
                    <div className="text-gray-400">{action.description}</div>
                  </Link>
                ) : (
                  <>
                    <img src={action.logo} alt={action.name} className="w-24" />
                    <div className="text-white mt-5">{action.name}</div>
                    <div className="text-gray-400">{action.description}</div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Action;
