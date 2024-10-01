import conf from "@/lib/confEnv.js";
import dbService from "./db_service.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userId = ID.unique();
            const newUser = await this.account.create(userId, email, password, name);
            const creaeDb = await dbService.createUserData({userId:userId,email:email,name:name})
            .then((res) => {
                // console.log(res)
            })
            .catch((err) => {
                console.log(err);
            })
            if (newUser) {
                // call for login
                this.loginUser({ email, password});
                return newUser;
            }
            else {
                return newUser;
            }
        } catch (error) {
            throw error
        }
    }

    async loginUser({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            // console.log("Appwrite error :: getCurrentUser :: error", error);
            throw error
        }
    }

    async logoutUser() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            // console.log("Appwrite error :: logoutUser :: error", error);
            throw error
        }
    }

    async OAuthGoogle (){
        try {
            const usr =  this.account.createOAuth2Session(
                "google",
                "http://localhost:5173/home",
                "http://localhost:5173/discuss"
            )
            usr.then((res) => {
                console.log(res)
                return res;
            })
            .catch((err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}

const authService = new AuthService();

export default authService