import { useForm } from "react-hook-form";

const useFormFields = () => {
  const {
    register,
    formState: { errors }
  } = useForm<FormData>();

  return { register, errors };
};

export default useFormFields;
