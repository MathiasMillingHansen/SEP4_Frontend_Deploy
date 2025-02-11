import axios from "axios";

const API_BASE_URL = "/Broker";

class UserService {
  // Fetch all users
  static async fetchAllUsers() {
    try {
      const token = localStorage.getItem("user");
      const response = await axios.get(`${API_BASE_URL}/GetAllUsers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async adjustUserPermissions(usersToChange) {
    try {
      const token = localStorage.getItem("user");
      const response = await axios.put(
        `${API_BASE_URL}/users/adjustUserPermissions/${usersToChange}`,
        {
          ...usersToChange,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default UserService;
