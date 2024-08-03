import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const showSuccessAlert = async (title: string, message: string) => {
  await MySwal.fire({
    icon: "success",
    title: title,
    text: message,
    showConfirmButton: true,
  });
};
