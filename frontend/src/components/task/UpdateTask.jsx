import React, { useState, useEffect } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import Button from "../Button";
import { useUpdateTaskMutation } from "../../redux/slices/api/taskApiSlice";

const UpdateTask = ({ open, setOpen, taskData, refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: taskData });

  useEffect(() => {
    if (typeof taskData === "object" && taskData !== null) {
      reset(taskData);
      setTeam(taskData.team || []);
    }
  }, [taskData, reset]);


  const [team, setTeam] = useState(taskData?.team || []);
  const [updateTask, { isLoading }] = useUpdateTaskMutation();

  const submitHandler = async (data) => {
    try {
      const updatedData = { ...data, team, _id: taskData._id };
      const res = await updateTask(updatedData).unwrap();
      toast.success(res.message);

      if (typeof refetch === "function") {
        refetch();
      }
      setOpen(false);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update task");
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Dialog.Title className='text-base font-bold text-purple-700 mb-4'>
          UPDATE PROJECT
        </Dialog.Title>

        <div className='mt-2 flex flex-col gap-6'>
          <Textbox
            placeholder='Project Title'
            type='text'
            name='title'
            label='Project Title'
            className='w-full rounded'
            register={register("title", { required: "Title is required" })}
            error={errors.title?.message}
          />

          <Textbox
            placeholder='Project Description'
            type='text'
            name='description'
            label='Project Description'
            className='w-full rounded'
            register={register("description", { required: "Description is required" })}
            error={errors.description?.message}
          />

          <UserList setTeam={setTeam} team={team} />

          <Textbox
            placeholder='Date'
            type='date'
            name='date'
            label='Date'
            className='w-full rounded'
            register={register("date", { required: "Date is required!" })}
            error={errors.date?.message}
          />

          <div className='bg-gray-50 py-6 flex justify-end gap-4'>
            <Button label='Cancel' onClick={() => setOpen(false)} />
            <Button label={isLoading ? "Updating..." : "Update"} type='submit' />
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default UpdateTask;
