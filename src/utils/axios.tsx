import Axios from "axios";

export const githubAxios = Axios.create({
    baseURL: 'https://api.github.com/'
})
