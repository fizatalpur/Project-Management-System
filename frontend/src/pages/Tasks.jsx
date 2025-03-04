import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import Table from "../components/task/Table";
import Spinner from "../components/Spinner";
import { useGetTasksQuery } from "../redux/slices/api/taskApiSlice";


const Tasks = ({task}) => {
 
  const {data, isLoading, refetch} = useGetTasksQuery({
    strQuery: task,
  });

  useEffect(()=>{
      refetch();
    }, [task, refetch]);

   return isLoading? (
      <div className='py-10'>
      <Spinner />
    </div>
   
):(
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <Title title= "All Projects" />

      </div>

      <div className='w-full'>
        <Table tasks={data?.tasks} />
      </div>
    </div>
  )
 

}

export default Tasks;
