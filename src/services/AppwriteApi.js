import { Client, Databases } from 'appwrite';
import { conf } from "../conf/conf";

// Initialize Appwrite client
const client = new Client()
    .setEndpoint(conf.appwriteURL) // Replace with your Appwrite endpoint
    .setProject(conf.appwriteProjectId); // Replace with your Appwrite project ID

const databases = new Databases(client);

// Fetch inventory
export const getInventory = async () => {
    try {
        const response = await databases.listDocuments(
            conf.appwriteDatabaseId,   // Database ID
            conf. appwriteCollectionsProducts  // Collection ID
        );
        return response.documents;
    } catch (error) {
        console.error("Error fetching inventory:", error);
        throw error;
    }
};

// Add product to inventory
export const addInventory = async (data) => {
    try {
        const response = await databases.createDocument(
            conf.appwriteDatabaseId,   // Database ID
            conf.appwriteCollectionsProducts, // Collection ID
            'unique()',        // Use unique() for auto-generation of ID
            data               // Product data
        );
        return response;
    } catch (error) {
        console.error("Error adding inventory:", error);
        throw error;
    }
};

// Update product in inventory
export const updateInventory = async (data) => {
    try {
        const response = await databases.updateDocument(
            conf.appwriteDatabaseId,       // Database ID
            conf.appwriteCollectionsProducts,     // Collection ID
            data.$id,              // Document ID to update
            data                   // Updated product data
        );
        return response;
    } catch (error) {
        console.error("Error updating inventory:", error);
        throw error;
    }
};

// Delete product from inventory
export const deleteInventory = async (id) => {
    try {
        const response = await databases.deleteDocument(
            conf.appwriteDatabaseId,   // Database ID
            conf.appwriteCollectionsProducts, // Collection ID
            id                 // Document ID to delete
        );
        return response;
    } catch (error) {
        console.error("Error deleting inventory:", error);
        throw error;
    }
};
