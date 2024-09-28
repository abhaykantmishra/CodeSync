const conf = {
    appwriteurl: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
    appwriteProjectId : String(process.env.NEXT_PUBLIC_APPWRITE_PROJECTID),
    appwriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASEID),
    appwriteCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTIONID),
    backendapi:String(process.env.NEXT_PUBLIC_BACKENDAPI),
}


export default conf;