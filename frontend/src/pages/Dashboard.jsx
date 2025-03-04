import React from 'react'
import { useEffect } from 'react';
import Spinner from '../components/Spinner';
import { useGetDashboardStatsQuery } from '../redux/slices/api/taskApiSlice';
import { useGetDashboardEmployeesQuery } from '../redux/slices/api/userApiSlice';
import { useSelector } from "react-redux";

const Dashboard = ({stage, emp}) => {

  const {data, isLoading: loadingStats, refetch: refetchStats} = useGetDashboardStatsQuery({
    strQuery: stage,
  },
);
  const isAdmin = useSelector((state) => state.auth.user?.isAdmin);

  useEffect(()=>{
    refetchStats();
  }, [stage, refetchStats]);

  const totals = data?.tasks;
  const {data: employeeData, isLoading: loadingEmp, refetch : refetchEmployees} = useGetDashboardEmployeesQuery({
    strQuery: emp,
  });

  useEffect(()=>{
    refetchEmployees();
  }, [emp, refetchEmployees]);

  const stats = [
    {
      _id: "1",
      label: (
      <span className={isAdmin ? "text-xl font-bold" :"text-xl font-bold"}>
       {isAdmin ? "TOTAL PROJECTS" : "ASSIGNED PROJECTS"}
        </span>),
      total: data?.totalTasks || 0,
  
    },
    // { 
    //   _id: "2",
    //   label: <span className="text-lg font-semibold">TOTAL EMPLOYEES</span>,
    //   total: employeeData?.totalEmployees || 0, 
    // },
    
  ];

  if (isAdmin) {
    stats.push({
        _id: "2",
        label: <span className="text-xl font-bold">TOTAL EMPLOYEES</span>,
        total: employeeData?.totalEmployees || 0,
    });
} 
  const Card = ({ label, count }) => {
    return (
      <div className='w-full h-40 bg-purple-200 p-5 shadow-md rounded-md flex items-center justify-between'>
        <div className='h-full flex flex-1 flex-col justify-between'>
          <p className= ' text-center font-bold text-purple-700'>{label}</p>
          <span className='text-center text-4xl font-semibold'>{count}</span>
        </div>
      </div>
    )
  }

  
  return loadingStats && loadingEmp ? (
    <div className='py-10'>
    <Spinner />
  </div>
): (
    <div classNamee='h-full py-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
        {stats.map(({  label, total }, index) => (
          <Card key={index}  label={label} count={total} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;