import axios from "axios";

const UserAPI = {
  login: async (username,password) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/login`, {username, password})
      return response
    } catch (error) {
      return error.response;
    }
  }
}

export default UserAPI