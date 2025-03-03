import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Dialog } from "@headlessui/react";
import { toast } from "sonner";
import ModalWrapper from "./ModalWrapper";
import Textbox from "./Textbox";
import Button from "./Button";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";

const AddUser = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", position: "", email: "", role: "" },
  });

  const [addNewUser, { isLoading }] = useRegisterMutation();

  const handleOnSubmit = async (data) => {
    try {
      await addNewUser({ ...data, password: data.email }).unwrap();
      toast.success("New Employee added successfully");
      reset();
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Dialog.Title className="text-base font-bold text-purple-900 mb-4">
          ADD EMPLOYEE
        </Dialog.Title>

        <div className="flex flex-col gap-6">
          <Textbox
            placeholder="Full name"
            type="text"
            name="name"
            label="Full Name"
            className='w-full rounded'
            register={register("name", { required: "Full name is required!" })}
            error={errors.name?.message}
          />
          <Textbox
            placeholder="Position"
            type="text"
            name="position"
            label="Position"
            className='w-full rounded'
            register={register("position", { required: "Position is required!" })}
            error={errors.position?.message}
          />
          <Textbox
            placeholder="Email Address"
            type="email"
            name="email"
            label="Email Address"
            className='w-full rounded'
            register={register("email", { required: "Email Address is required!" })}
            error={errors.email?.message}
          />
          <Textbox
            placeholder="Role"
            type="text"
            name="role"
            label="Role"
            className='w-full rounded'
            register={register("role", { required: "User role is required!" })}
            error={errors.role?.message}
          />
        </div>

        <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
          <Button
            type="submit"
            className="bg-purple-600 px-8 text-sm font-semibold text-white hover:bg-purple-700"
            label={isLoading ? "Adding..." : "Save"}
          />
          <Button
            type="button"
            className="bg-white px-5 text-sm font-semibold text-gray-900"
            onClick={() => setOpen(false)}
            label="Cancel"
          />
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddUser;
