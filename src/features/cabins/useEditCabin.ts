// cabin feature에서만 쓰이는 hook이므로 hooks에 들어가지 않음
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabin } from "@/services/apiCabins";
import { Cabin } from "@/types/cabin";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabin, id }: { newCabin: Partial<Cabin>; id: number }) =>
      createEditCabin(newCabin, id),
    // mutationFn은 arg를 하나만 허용한다. 그러므로 여러 값을 넣으려면
    // obj 하나에 destructuring으로
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isEditing, editCabin };
}
