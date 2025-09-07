import React from 'react';
import { useUser } from './UserContext';

const Hero: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="hero items-center">
      <div className="box"></div>
      <div className="mr-5 ml-5 md:mr-20 md:ml-20 mt-10 md:mt-20 flex flex-col gap-3.5 items-center absolute">
        <span className="text-white text-2xl md:text-5xl font-black">
          Welcome Back, {user?.username || 'Guest'}
          
        </span>
        <span className="text-white text-sm md:text-lg font-medium">
          Your personalized health companion for effortless medication and appointment.
          Stay on track with this.
        </span>
        <button
          type="button"
          className="text-white md:w-[15vw] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:font-extrabold rounded-lg md:text-sm px-0 md:py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Manage My Health
        </button>
      </div>
    </div>
  );
};

export default Hero;
