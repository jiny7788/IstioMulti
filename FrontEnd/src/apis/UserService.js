import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api";

class UserService {
    getUsers() {
        return axios.get(USER_API_BASE_URL + "/user");
    }

    createUser(user) {
        return axios.post(USER_API_BASE_URL + "/user", user);
    }

    getOneUser(id) {
        return axios.get(USER_API_BASE_URL + "/user/" + id);
    }

    updateUser(id, user) {
        return axios.put(USER_API_BASE_URL + "/user/" + id, user);
    }

    deleteUser(id) {
        return axios.delete(USER_API_BASE_URL + "/user/" + id);
    }

    login(user) {
        return axios.post(USER_API_BASE_URL + "/login", user);
    }
}

export default new UserService();