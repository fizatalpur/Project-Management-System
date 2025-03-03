import React, { useState } from "react";
import { toast } from "sonner";
import { formatDate } from "../../utils";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import Button from "../Button";
import AddTask from "./AddTask";
import ConfirmatioDialog from "../Dialogs";
import { useDeleteTaskMutation } from "../../redux/slices/api/taskApiSlice";
import UpdateTask from "./UpdateTask";
import { useGetAllUsersQuery } from "../../redux/slices/api/userApiSlice";
import { useGetTaskQuery } from "../../redux/slices/api/taskApiSlice";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";


const Table = ({ tasks }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const { data, isLoading, refetch } = useGetTaskQuery();
  const task = data?.task;

  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.auth.user?.isAdmin);

  const { data: allUsers } = useGetAllUsersQuery();

  const [deleteTask] = useDeleteTaskMutation();
  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const addTaskHandler = () => {
    setSelected(null);
    setOpen(true);
    setOpenEdit(false);
  };

  const editTaskHandler = (el) => {
    setSelected(el);
    setOpenEdit(true);
    setOpen(false);
  }

  const deleteHandler = async () => {
    try {
      const result = await deleteTask({
        id: selected
      }).unwrap();
      toast.success(result?.message);

      setTimeout(() => {
        openDialog(false);
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(err);
      toast.error(err?.data?.message || err.error);

    }

  };




  const TableHeader = () => (
    <thead className='w-full border-b border-gray-300'>
      <tr className='w-full text-black  text-left'>
        <th className='py-2'>Title</th>
        <th className='py-2'>Description</th>
        <th className='py-2 line-clamp-1'>Created At</th>
        <th className='py-2'>Team</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-300/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <p className='w-full line-clamp-2 text-base text-black'>
            {task?.title}
          </p>
        </div>
      </td>

      <td className='py-2'>
        <div className={"flex gap-1 items-center"}>
          <span className='capitalize line-clamp-1'>
            {task?.description}
          </span>
        </div>
      </td>

      <td className='py-2'>
        <span className='text-sm text-gray-600'>
          {formatDate(new Date(task?.date))}
        </span>
      </td>

      <td className='py-2'>
        <div className='flex'>
          {task?.team?.map((user, key) => {
            console.log("userinfo received:", user);

            return (
              <div key={key} >
                <Popover className="relative">
                  <Popover.Button className="inline-flex items-center focus:outline-none">
                    <FaUser className="w-6 h-6 text-purple-600" />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition duration-200 ease-out"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition duration-150 ease-in"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="popup absolute z-10 mt-2 w-48 p-4 bg-white rounded shadow-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user?.name || "No Name"}</p>
                        <p className="text-sm text-gray-600">{user?.email || "No Email"}</p>

                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>

              </div>
            );
          })}

        </div>
      </td>

      <td className='py-2 flex gap-2 md:gap-4 justify-end'>
        {isAdmin && (
          <Button
            className='text-green-600 hover:text-green-500 sm:px-0 text-sm md:text-base'
            label='View'
            type='button'
            onClick={() => navigate(`/task/${task._id}`)}
          />
        )}

        <Button
          className='text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base'
          label='Edit'
          type='button'
          onClick={() => editTaskHandler(task)}
        />

        <Button
          className='text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base'
          label='Delete'
          type='button'
          onClick={() => deleteClicks(task._id)}
        />
      </td>
    </tr>
  );
  return (
    <>


      <div className="flex justify-end mb-4">
        <Button
          label='Add Project'
          className='flex flex-row-reverse gap-1 items-center bg-purple-600 text-white rounded-md text-lg px-6 py-2 2xl:py-2.5'
          onClick={() => addTaskHandler(task)}
        />
      </div>
      <div className='bg-white  px-2 md:px-4 pt-4 pb-9 shadow-md rounded '>
        <div className='overflow-x-auto table-container'>
          <table className='w-full '>
            <TableHeader />
            <tbody>
              {tasks?.map((task, index) => (
                <TableRow key={index} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {/* TODO */}
      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      {selected ? (
        <UpdateTask open={openEdit} setOpen={setOpenEdit} taskData={selected} refetch={refetch} />
      ) : (
        <AddTask open={open} setOpen={setOpen} />
      )}
    </>
  );
};

export default Table;
