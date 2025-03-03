import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import Button from "../Button";
import { useCreateTaskMutation } from "../../redux/slices/api/taskApiSlice";

const AddTask = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [team, setTeam] = useState([]);
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const submitHandler = async (data) => {
    try {
      const newData = { ...data, team };
      const res = await createTask(newData).unwrap();
      toast.success(res.message);

      setTimeout(() => {
        setOpen(false);
        reset(); // Reset form after closing
        setTeam([]); // Reset team selection
      }, 500);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create task");
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(submitHandler)(e);
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Dialog.Title className='text-base font-bold text-purple-700 mb-4'>
          ADD PROJECT
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
            <Button label={isLoading ? "Creating..." : "Submit"} type='submit' />
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddTask;













