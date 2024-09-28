import conf from "@/lib/confEnv.js";
import { Client,Databases,ID,Storage } from "appwrite";

export class DbService {
    client = new Client();
    databases;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.appwriteProjectId);
        
        this.databases = new Databases(this.client);

    }

    async createUserData ({userId,email,name,username,leetcodeusername,codechefusername,codeforcesusername,geeksforgeeksusername,
        githubusername,twitterusername,profileimg}){
            try {
                return await this.databases.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    userId,
                    {
                        userId,
                        email,
                        profileimg,
                        username,
                        name,
                        leetcodeusername,
                        codechefusername,
                        codeforcesusername,
                        geeksforgeeksusername,
                        githubusername,
                        twitterusername
                    }
                )
            } catch (error) {
                console.log("Appwrite :: createUserData :: error",error.message)
                throw error;
            }
    }

    async updateUserData ({userId},{data,fieldname}){
        try {
            // console.log(userId,data,fieldname)
            const updateData = {};
            updateData[fieldname] = data;
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                userId,
                updateData
            )
        } catch (error) {
            console.log("Appwrite :: updateUserData :: error ",error.message);
            throw error
        }
    }

    async deleteUserData({userId}){
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                userId
            )
            
        } catch (error) {
            console.log("Appwrite :: deleteUserData :: error ",error.message);
            throw error
        }
    }

    async getUserData({userId}){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                userId
            )
        } catch (error) {
            console.log("Appwrite :: getUserData :: error ",error.message);
            throw error;
        }
    }

}

const dbService = new DbService()
export default dbService;