import { useQueryClient, useMutation } from "@tanstack/react-query";
import { logout } from "../lib/api";

const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutate: logoutMutation, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => queryClient.invalidateQueries(["authUser"]),
  });

  return { isPending, logoutMutation };
};

export default useLogout;
