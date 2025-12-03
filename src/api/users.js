import axios from "axios"
import api from "./axios"
import conf from "@/lib/confEnv"


const baseUrl = conf.backendapi


async function registerUser({name, email, password}){
    if(!name || !email || !password){
        throw new Error("Unsufficient fields!")
    }
    try {
        const res = await axios.post(`${baseUrl}/api/users/register`, {name, email, password})
        // want to save access token to localstorge
        return res
    } catch (error) {
        throw error
    }
}

async function loginUser({email, password}){
    if(!email || !password){
        throw new Error("Invalid email or password!")
    }
    try {
        const res = await axios.post(`${baseUrl}/api/users/login`, {email, password})
        // want to save access token to localstorge
        return res
    } catch (error) {
        throw error
    }
}

async function getUserDetail({id}){
    if(!id){
        throw new Error("Id is required!")
    }

    try {
        const res = await api.get(`/api/users/profile/${id}`)
        return res
    } catch (error) {
        throw error
    }
}

export  const usersApi = {
    registerUser,
    loginUser,
    getUserDetail,
}