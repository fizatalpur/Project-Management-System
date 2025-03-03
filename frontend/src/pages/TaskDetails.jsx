import React from "react";
import { useParams } from "react-router-dom";
import { useGetTaskQuery } from "../redux/slices/api/taskApiSlice";
import { useGetAllUsersQuery } from "../redux/slices/api/userApiSlice";
import Spinner from "../components/Spinner";
import { useEffect } from "react";

const TaskDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetTaskQuery(id);
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery();

  useEffect(() => {
    if (data) {
      console.log("Task Response:", JSON.stringify(data, null, 2));
    } else if (error) {
      console.error("API Error:", error);
    }
  }, [data, error]);

  if (isLoading || usersLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  const task = data?.task;
  console.log("Team Data:", task?.team);

  // Map team IDs (from task.team) to full user objects from usersData.
  const teamDetails =
    task?.team?.map((teamId) => {
      return usersData?.find(
        (user) => user._id.toString() === teamId.toString()
      );
    }).filter(Boolean) || [];

  return (
    <div className="flex justify-center -mt-20 items-center min-h-screen">
      {/* Header Section */}
      <div className="max-w-5xl w-full  p-6 bg-purple-200 shadow-lg rounded-lg">
      <div className="border-b pb-4 mb-6">
        <h1 className="text-center text-3xl font-bold text-gray-800">{task?.title}</h1>
        <p className="text-gray-500 text-center">
          Created on: {new Date(task?.date).toLocaleDateString()}
        </p>
      </div>

      {/* Description & Budget Section */}
      <div className="mb-8">
        <p className="text-gray-700 text-lg text-center">{task?.description}</p>
      </div>

      {/* Team Members Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Assigned Team :
        </h2>
        {teamDetails.length > 0 ? (
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {teamDetails.map((member) => (
              <div
                key={member._id}
                className="p-4 bg-gray-50 rounded shadow hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-medium text-gray-700">
                  {member.name}
                </h3>
                {member.email && (
                  <p className="text-gray-500 text-sm">
                    <span className="font-semibold">Email:</span> {member.email}
                  </p>
                )}
                {member.role && (
                  <p className="text-gray-500 text-sm">
                    <span className="font-semibold">Role:</span> {member.role}
                  </p>
                )}
              </div>
))}
          </div>
        ) : (
          <p className="text-gray-500">No team members assigned.</p>
        )}
      </div>
      </div>
    </div>

  );
};

export default TaskDetails;













