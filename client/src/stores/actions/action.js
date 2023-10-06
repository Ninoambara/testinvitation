import axios from "axios";
const BASE_URL = "http://localhost:3000/";
import Swal from "sweetalert2";

export const fetchJobsSuccess = (jobs) => ({
  type: "jobs/fetchSuccess",
  payload: jobs,
});

export const fetchJobs = (searchParams) => {
  return async (dispatch) => {
    try {
      const apiUrl = BASE_URL + "jobs";

      // console.log(searchParams);
      const queryParameters = new URLSearchParams(searchParams).toString();
      const fullUrl = `${apiUrl}?${queryParameters}`;
      console.log(fullUrl);
      const response = await axios.get(fullUrl, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      console.log(response.data);
      dispatch(fetchJobsSuccess(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const login = (inputLogin, navigate) => {
  return async (dispatch) => {
    try {
      const response = await axios(BASE_URL + "users-login", {
        method: "post",
        data: inputLogin,
      });
      console.log(response);
      if (response.data) {
        const responseData = await response.data;
        const accessToken = responseData.access_token;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login success ",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.setItem("access_token", accessToken);
        navigate("/");
      }
    } catch (error) {
      throw error;
    }
  };
};

export const register = (inputregister, navigate) => {
  return async (dispatch) => {
    try {
      const response = await axios(BASE_URL + "users-register", {
        method: "post",
        data: inputregister,
      });
      console.log(response);
      if (response.data) {
        const responseData = await response.data;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Register success ",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      }
    } catch (error) {
      throw error;
    }
  };
};
