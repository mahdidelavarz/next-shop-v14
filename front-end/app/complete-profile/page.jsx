"use client";
import TextField from "@/common/TextField";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { completeProfile } from "@/services/authServices";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/navigation";
const completeProfileForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { mutateAsync, isPending, data } = useMutation({
    mutationFn: completeProfile,
  });
  const handleCompleteProfile = async (data) => {
    try {
      const { message, user } = await mutateAsync(data);
      toast.success(message);
      router.push("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="w-full h-[100vh] bg-primary-200 flex justify-center py-8">
      <div className="w-[25rem] h-[39rem] md:w-[35rem] md:h-[40rem]  bg-white rounded-2xl flex flex-col items-center justify-between py-8">
        <h1 className="text-2xl text-primary-500">تکمیل مشخصات</h1>
        <form
          className="flex flex-col gap-10 justify-center items-center min-w-[70%]"
          onSubmit={handleSubmit(handleCompleteProfile)}
        >
          <TextField
            label={"نام و نام خانوادگی"}
            name={"name"}
            register={{
              ...register("name", { required: "نام و نام خانوادگی ضروری است" }),
            }}
            required
            errors={errors}
          />
          <TextField label={"نام کاربری"} />
          <TextField
            label={"ایمیل"}
            name={"email"}
            required
            register={{
              ...register("email", {
                required: "ایمیل ضروری است",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "ایمیل نامعتبر است",
                },
              }),
            }}
            errors={errors}
          />
          <button className="btn btn--primary w-full">
            {isPending ? (
              <ThreeDots
                height="60"
                width="60"
                radius="9"
                color="white"
                ariaLabel="loading"
              />
            ) : (
              "تایید"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default completeProfileForm;
