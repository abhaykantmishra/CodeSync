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

    // userData collection Controllers =>
    async createUserData ({userId,email,name,username,leetcodeusername,codechefusername,codeforcesusername,geeksforgeeksusername,
        githubusername,twitterusername,profileimg}){
            try {
                return await this.databases.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteUserdataCollectionId,
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
                conf.appwriteUserdataCollectionId,
                userId,
                updateData
            )
        } catch (error) {
            console.log("Appwrite :: updateUserData :: error ",error.message);
            throw error
        }
    }

    async updateWholeUserData({data}){
        try {

            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUserdataCollectionId,
                data.userId,
                data
            )
        } catch (error) {
            throw error
        }
    }

    async deleteUserData({userId}){
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUserdataCollectionId,
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
                conf.appwriteUserdataCollectionId,
                userId
            )
        } catch (error) {
            console.log("Appwrite :: getUserData :: error ",error.message);
            throw error;
        }
    }

    //  discuss collection Controllers =>
    async createNewDiscussion ({author , authoruserid, content}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteDiscussCollectionId,
                ID.unique(),
                {
                    author,authoruserid,content
                }
            )
        } catch (error) {
            console.log("Appwrite :: createNewDiscussion :: error",error.message)
            throw error;
        }
    }

    async addCommentOnDiscussion ({discussionId , content , author, authoruserid}) {
        try {
            const document = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteDiscussCollectionId,
                discussionId,
            );

            const commentToAdd = JSON.stringify(
                {$id:ID.unique(), author:author, authoruserid:authoruserid, content:content}
            );
            const updatedComments = [...document.comments , commentToAdd];

            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteDiscussCollectionId,
                discussionId,
                { comments: updatedComments}
            )
        } catch (error) {
            console.log("Appwrite :: addCommentOnDiscussion :: error",error.message)
            throw error;
        }
    }

    async addLike ({discussionId}) {
        try {
            const document = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteDiscussCollectionId,
                discussionId,
            );

            // const currentValue = document[likes] || 0; // Initialize to 0 if the field doesn't exist
            const newValue = document.likes + 1;

            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteDiscussCollectionId,
                discussionId,
                {likes:newValue}
            )
        } catch (error) {
            console.log("Appwrite :: addlike :: error",error.message)
            throw error;
        }
    }

    async removeLike({discussionId}){
        try {
            const document = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteDiscussCollectionId,
                discussionId,
            );

            const currentValue = document[likes];
            const newValue = currentValue - 1;

            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteDiscussCollectionId,
                discussionId,
                {likes:newValue}
            )
        } catch (error) {
            console.log("Appwrite :: addlike :: error",error.message)
            throw error;
        }
    }

    async getAllDiscussions () {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteDiscussCollectionId
            )
        } catch (error) {
            throw error
        }
    }

    // Roadmap collection Controllers =>
    
}

const dbService = new DbService()
export default dbService;