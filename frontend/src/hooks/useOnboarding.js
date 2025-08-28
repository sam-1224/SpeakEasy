import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeOnboarding } from "../lib/api";
import toast from "react-hot-toast";

const useOnboarding = () => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
     onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to complete onboarding");
    }
  });

  return { isPending, onboardingMutation: mutate };
};

export default useOnboarding;
