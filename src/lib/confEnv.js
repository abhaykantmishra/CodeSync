const conf = {
    appwriteurl: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
    appwriteProjectId : String(process.env.NEXT_PUBLIC_APPWRITE_PROJECTID),
    appwriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASEID),
    appwriteUserdataCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_USERDATA_COLLECTIONID),
    appwriteDiscussCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_DISCUSS_COLLECTIONID),
    appwriteRoadmapCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_ROADMAP_COLLECTIONID),
    backendapi:String(process.env.NEXT_PUBLIC_BACKENDAPI),
}


export default conf;