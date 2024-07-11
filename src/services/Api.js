import axios from "axios";
import toast from "react-hot-toast";
axios.defaults.baseURL = "https://api.unsplash.com/";
export const fetchImg = async (number, searchQuery) => {
  const response = await axios.get("search/photos", {
    params: {
      client_id: "15wgyaekuwfQchIVoE3QhgA-HRNMHb0mlcQDMiWXYQY",
      page: number,
      per_page: 12,
      query: searchQuery,
    },
  });
  return response.data.results;
};

export const notify = () =>
  toast("Text must be entered to search for images.", {
    style: {
      border: "1px solid black",
      color: "red",
    },
  });
