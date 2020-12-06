import axios from "axios";

const UserAPI = {
  login: async (username,password) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/login`, {username, password})
      return response
    } catch (error) {
      return error.response;
    }
  },
  createUser: async (company_id, full_name, email,identity_number,address,date_of_birth,phone_number,gender,marital_status,religion,organization_name,position,level,status,branch,join_date) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/employee`, {
        company_id,
        full_name,
        email,
        identity_number,
        address,
        date_of_birth,
        phone_number,
        gender,
        marital_status,
        religion,
        organization_name,
        position,
        level,
        status,
        branch,
        join_date
      })
      return response
    } catch (error) {
      return error.response
    }
  },
  userDetail: async (employee_id) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/employee?employee_id=${employee_id}`)
      return response
    } catch (error) {
      return error.response
    }
  }
}

export default UserAPI