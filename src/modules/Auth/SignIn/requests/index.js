import axios from 'axios'
import { API_BASE } from 'shared/constants'

function performSignIn(values) {
  return axios({
    url: `${API_BASE}/my-session`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      username: values.username,
      password: values.password,
    },
  })
}

export default performSignIn