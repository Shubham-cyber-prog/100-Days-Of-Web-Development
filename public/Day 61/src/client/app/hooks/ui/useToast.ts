import { addToast, removeToast, Toast } from "@/app/store/slices/ToastSlice";
import { useAppDispatch } from "../state/useRedux";

const useToast = () => {
  const dispatch = useAppDispatch();

  const showToast = (message: string | undefined, type: Toast["type"]) => {
    dispatch(addToast({ message, type }));
  };

  const dismissToast = (id: string) => {
    dispatch(removeToast(id));
  };

  return { showToast, dismissToast };
};

export default useToast;
