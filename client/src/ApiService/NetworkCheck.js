import { instance } from "./index";

export default function() {
  const option = {
    method: "get",
    url: "/"
  };
  return instance(option).then(
    response => {
      return response;
    },
    error => {
      throw error;
    }
  );
}
