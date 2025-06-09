export const conf={
    appwriteURL:String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionsProducts:String(import.meta.env.VITE_APPWRITE_COLLECTION_PRODUCTS),
    appwriteCollectionsOrders:String(import.meta.env.VITE_APPWRITE_COLLECTION_ORDERS),
    appwriteCollectionsLocations:String(import.meta.env.VITE_APPWRITE_COLLECTION_LOCATIONS),
    appwriteCollectionsInventory:String(import.meta.env.VITE_APPWRITE_COLLECTION_INVENTORY)
}