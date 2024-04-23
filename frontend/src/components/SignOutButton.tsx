import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { signOut } from "@/api-client";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const SignOutButton = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      toast.success("Logged out successfully!");
      navigate("/");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <Button
      variant="outline"
      onClick={() => mutate()}
      className="rounded-sm font-medium text-blue-600 transition duration-200 hover:text-blue-600"
    >
      Sign out
    </Button>
  );
};

export default SignOutButton;
