import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/user";

class UserService {
    getUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    createUser(user) {
        return axios.post(USER_API_BASE_URL, user);
    }

    getOneUser(id) {
        return axios.get(USER_API_BASE_URL + "/" + id);
    }

    updateUser(id, user) {
        return axios.put(USER_API_BASE_URL + "/" + id, user);
    }

    deleteUser(id) {
        return axios.delete(USER_API_BASE_URL + "/" + id);
    }
}