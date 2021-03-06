import axios from 'axios'

const offDay = {
  whoOff: async (date) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/request-leave/is-off`, {
        params: {
          date
        }
      })
      return response
    } catch (error) {
      throw error.response;
    }
  },
  offLeft: async (employee_id) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/request-leave/quota`, {
        params: {
          employee_id: employee_id
        }
      })
      return response
    } catch (error) {
      throw error.response;
    }
  },
  submit: async (employee_id,type,start_date,end_date,total,notes) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/request-leave`, {
        employee_id,type,start_date,end_date,total,notes
      })
      return response
    } catch (error) {
      throw error.response
    }
  },
  history: async (company_id,start_date,end_date, status, employee_id) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/request-leave/history`, {
        params: {
          company_id,
          start_date,
          end_date,
          status,
          employee_id
        }
      })
      return response
    } catch (error) {
      throw error.response
    }
  },
  actionApproval: async (leave_id, processed_by, action) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/request-leave/action`,{
        leave_id, processed_by, action
      })
      return response
    } catch (error) {
      throw error.response
    }
  }
}

export default offDay