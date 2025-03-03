import React, { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import clsx from "clsx";
import Spinner from "../components/Spinner";
import ConfirmatioDialog, { UserAction } from "../components/Dialogs";
import AddUser from "../components/AddUser";
import { useDeleteUserMutation, useGetAllUsersQuery, useUserActionMutation } from "../redux/slices/api/userApiSlice";
import UpdateUser from "../components/UpdateUser";

const Users = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);

  const { data, isLoading, refetch } = useGetAllUsersQuery({
    strQuery: "",
  });

  const [deleteUser] = useDeleteUserMutation();
  const [userAction] = useUserActionMutation();


  const userActionHandler = async () => {
    try {
      const result = await userAction({
        isActive: !selected?.isActive,
        id: selected?._id,
      });

      refetch()

      toast.success(result.data.message);
      setSelected(null);
      setTimeout(() => {
        setOpenAction(false);
      }, 500);
    } catch (error) {
      console.log(err);
      toast.error(err?.data?.message || err.message);

    }
  };
  const deleteHandler = async () => {
    try {
      const result = await deleteUser(selected)

      refetch()
      toast.success("Deleted");
      setSelected(null);
      setTimeout(() => {
        setOpenDialog(false);
      }, 500);
    } catch (error) {
      console.log(err);
      toast.error(err?.data?.message || err.message);
    }
  };

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);

  };

  const editClick = (el) => {
    setSelected(el);
    setIsEditing(true);
    setOpen(true);
  };

  const addClick = () => {
    setSelected(null);
    setIsEditing(false);
    setOpen(true);
  };

  const userStatusClick = (el) => {
    setSelected(el);
    setOpenAction(true);
  }

  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-left'>
        <th className='py-2'>Full Name</th>
        <th className='py-2'>Position</th>
        <th className='py-2'>Email</th>
        <th className='py-2'>Role</th>
        <th className='py-2'>Active</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
      <td className='p-2'>
        <div className='flex items-center gap-3'>
          {user.name}
        </div>
      </td>

      <td className='p-2'>{user.position}</td>
      <td className='p-2'>{user.email || "user.emal.com"}</td>
      <td className='p-2'>{user.role}</td>

      <td>
        <button
          onClick={() => userStatusClick(user)}
          className={clsx(
            "w-fit px-4 py-1 rounded-full",
            user?.isActive ? "bg-purple-200" : "bg-yellow-100"
          )}
        >
          {user?.isActive ? "Active" : "N/A"}
        </button>
      </td>

      <td className='p-2 flex gap-4 justify-end'>
        <Button
          className='text-blue-600 hover:text-blue-500 font-semibold sm:px-0'
          label='Edit'
          type='button'
          onClick={() => editClick(user)}
        />

        <Button
          className='text-red-700 hover:text-red-500 font-semibold sm:px-0'
          label='Delete'
          type='button'
          onClick={() => deleteClick(user?._id)}
        />
      </td>
    </tr>
  );

  return isLoading ? (
    <div className='py-10'>
      <Spinner />
    </div>
  ) : (
    <>
      <div className='w-full md:px-1 px-0 mb-6'>
        <div className='flex items-center justify-between mb-8'>
          <Title title='Employees' />
        </div>
        <div className="flex justify-end mb-4">
          <Button
            label='Add Employee'
            className='flex flex-row-reverse gap-1 items-center bg-purple-600 text-white rounded-md text-lg px-6 py-2 2xl:py-2.5'
            onClick={() => addClick()}
          />
        </div>

        <div className='bg-white px-2 md:px-4 py-4 shadow-md rounded'>
          <div className='overflow-x-auto'>
            <table className='w-full mb-5'>
              <TableHeader />
              <tbody>
                {data?.map((user, index) => (
                  <TableRow key={index} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isEditing ? (
        <UpdateUser open={open} setOpen={setOpen} userData={selected} />
      ) : (
        <AddUser open={open} setOpen={setOpen} />
      )}


      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={userActionHandler}
      />
    </>
  );
};

export default Users;
