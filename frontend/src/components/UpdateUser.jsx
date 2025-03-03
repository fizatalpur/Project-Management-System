import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import { toast } from "sonner";
import ModalWrapper from "./ModalWrapper";
import Textbox from "./Textbox";
import Button from "./Button";
import { useUpdateUserMutation } from "../redux/slices/api/userApiSlice";
import { setCredentials } from "../redux/slices/authSlice";

const UpdateUser = ({ open, setOpen, userData }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: userData });

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleOnSubmit = async (data) => {
    try {
      const result = await updateUser(data).unwrap();
      toast.success(result?.message);

      if (userData?._id === user?._id) {
        dispatch(setCredentials({ ...result.user }));
      }

      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Dialog.Title className="text-base font-bold text-purple-900 mb-4">
          UPDATE PROFILE
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
            label={isLoading ? "Updating..." : "Save"}
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

export default UpdateUser;
























// import React from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import ModalWrapper from "./ModalWrapper";
// import { Dialog } from "@headlessui/react";
// import { toast } from "sonner";
// import Textbox from "./Textbox";
// import Button from "./Button";
// import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
// import { useUpdateUserMutation } from "../redux/slices/api/userApiSlice";
// import Users from "../pages/Users";

// import { setCredentials } from "../redux/slices/authSlice";

// const AddUser = ({ open, setOpen, userData }) => {
//   // let defaultValues = userData ?? {};
//   let defaultValues = userData 
//   ? {...userData}
//   : {name: "", position: "", email: "", role: ""};
//   const { user } = useSelector((state) => state.auth);
  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ defaultValues });

//   const dispatch = useDispatch()
//   const [addNewUser, {isLoading }] = useRegisterMutation();
//   const [updateUser, { isLoading: isUpdating}] = useUpdateUserMutation();
//   const handleOnSubmit = async(data) => {
//     // console.log("Form data:", data);
//     try {
//       if(userData){
//         const result = await updateUser(data).unwrap()

//         toast.success(result?.message)

//         if(userData?._id===user?._id){
//           dispatch(setCredentials({...result.user}))
//         }
//       }else{
//         await addNewUser({...data, password: data.email}).unwrap();

//         toast.success("New Employee added successfully");
//       }

//       setOpen(false);

//       // setTimeout(()=>{
//       //   setOpen(false)
//       // }, 1500)
//     } catch (error) {
//       toast.error("something went wrong");
//     }
//   };

//   return (
//     <>
//       <ModalWrapper open={open} setOpen={setOpen}>
//         <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
//           <Dialog.Title
//             as='h2'
//             className='text-base font-bold leading-6 text-purple-900 mb-4'
//           >
//             {userData ? "UPDATE PROFILE" : "ADD EMPLOYEE"}
//           </Dialog.Title>
//           <div className='mt-2 flex flex-col gap-6'>
//             <Textbox
//               placeholder='Full name'
//               type='text'
//               name='name'
//               label='Full Name'
//               className='w-full rounded'
//               register={register("name", {
//                 required: "Full name is required!",
//               })}
//               error={errors.name ? errors.name.message : ""}
//             />
//             <Textbox
//               placeholder='position'
//               type='text'
//               name='position'
//               label='Position'
//               className='w-full rounded'
//               register={register("position", {
//                 required: "Position is required!",
//               })}
//               error={errors.position ? errors.position.message : ""}
//             />
//             <Textbox
//               placeholder='Email Address'
//               type='email'
//               name='email'
//               label='Email Address'
//               className='w-full rounded'
//               register={register("email", {
//                 required: "Email Address is required!",
//               })}
//               error={errors.email ? errors.email.message : ""}
//             />

//             <Textbox
//               placeholder='Role'
//               type='text'
//               name='role'
//               label='Role'
//               className='w-full rounded'
//               register={register("role", {
//                 required: "User role is required!",
//               })}
//               error={errors.role ? errors.role.message : ""}
//             />
//           </div>

//           {/* {isUpdating? (
//             <div className='py-5'>
//               <spinner />
//              </div> */}

//             <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
//               <Button
//                 type='submit'
//                 className='bg-purple-600 px-8 text-sm font-semibold text-white hover:bg-purple-700  sm:w-auto'
//                 // onClick={() => setOpen(false)}
//                 label={isUpdating ? "Updating..." : "Save"}
//               />

//               <Button
//                 type='button'
//                 className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
//                 onClick={() => setOpen(false)}
//                 label='Cancel'
//               />
//             </div>
          
          
//         </form>
//       </ModalWrapper>
//     </>
//   );
// };

// export default AddUser;
