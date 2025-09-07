export const projectInfo = [
  { title: 'Health Flow' ,logo:"/logo3.png",className:"text-3xl font-bold", classNameimg:""}
];

export const navItems = [
  
  { name: "Home", link: "/",className:"text-sm md:text-lg text-grey-200 font-medium "  },
  { name: "Medicine Cabinet", link: "/medicine-cabinet",className:"text-sm  md:text-lg text-grey-200 font-medium"  },
  { name: "Appointments", link: "/appointment",className:"text-sm md:text-lg text-grey-200 font-medium"  },
  { name: "Reports", link: "/reports",className:"text-sm md:text-lg text-grey-200 font-medium"  },
  // { name: "Setting", link: "#contact",className:"text-sm md:text-lg text-grey-200 font-medium"  },

];

export const actions=[

  {id:1,name:"Add New Remainder", logo:"/a1.png", description:"Quickly set up a new medication schedule", link:"/add"},
  {id:2,name:"Check Today's Remainders", logo:"/a2.png", description:"Review Your Medication Schedule for the day",link:"/reminders"},
  {id:3,name:"Schedule Appointment", logo:"/a3.png", description:"Book or manage your upcoming doctor visits."},
  {id:4,name:"Medicine Detail", logo:"/a4.png", description:"Access comprehensive information about your medications", link:"/medicine-detail"},

];

export const gridItems = [
  {
    id: 1,
    title: "Upcoming medication",
    className: "bg-[rgb(19,27,44)] text-white p-5 md:col-span-6 lg:col-span-3 row-span-2 border border-amber-300 rounded-2xl min-h-[30vh]",
    titleClassName: "p-4 font-bold text-xl",
  },
  {
    id: 2,
    title: "Medication taken",
    className: "bg-[rgb(19,27,44)] text-white p-5 md:col-span-3 lg:col-span-3 border border-amber-300  rounded-2xl min-h-[15vh]",
    titleClassName: "p-4",
  },
  {
    id: 3,
    title: "Adherence Rate",
    className: " bg-[rgb(19,27,44)] text-white p-5 md:col-span-3 lg:col-span-3 border border-amber-300 rounded-2xl min-h-[17vh] ",
    titleClassName: "p-4",
  },
  // {
  //   id: 2,
  //   title: "Next Appointment",
  //   description: "",
  //   className: "bg-[rgb(19,27,44)] text-white p-5 lg:col-span-2 md:col-span-3 md:row-span-2 lg:h-[20vh] border border-amber-300 rounded-2xl w-[30vw]",
  //   imgClassName: "",
  //   titleClassName: "justify-start",
  //   img: "",
  //   spareImg: "",
  // },
  {
    id: 2,
    title: "Notification",
    description: "",
    className: "bg-[rgb(19,27,44)] text-white p-5 lg:col-span-2 md:col-span-2 md:row-span-2  border border-amber-300 rounded-2xl  max-h-[19vh]",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 2,
    title: "Diet & Exercise plan",
    description: "",
    className: "bg-[rgb(19,27,44)] text-white p-5 lg:col-span-4 md:col-span-3 md:row-span-2  border border-amber-300 rounded-2xl ",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  
  
];
