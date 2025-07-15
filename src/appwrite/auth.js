import {Account,Client,ID} from "appwrite";
import { conf } from "../conf/conf";
import { Functions } from "appwrite";

export class AuthService{
    client=new Client();
    account;
    functions;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);
         this.functions = new Functions(this.client);
    }
    
    async executeFunction(functionId, payload = {}) {
  try {
    const response = await this.functions.createExecution(functionId, JSON.stringify(payload));
    return JSON.parse(response.responsePayload);
  } catch (error) {
    console.log("Appwrite AuthService :: executeFunction :: error", error);
    throw error;
  }
}

    async createAccount({ email, password, username }) {
  try {
    const userAccount = await this.account.create(ID.unique(), email, password, username);
    console.log("Account created:", userAccount);
    return userAccount;
  } catch (error) {
    console.log("Appwrite AuthService :: createAccount :: error", error);
    throw error;
  }
}

 async login({ email, password }) {
  try {
    const session = await this.account.createEmailPasswordSession(email, password);
    console.log("Login successful:", session);
    return session;
  } catch (error) {
    console.log("Appwrite AuthService :: loginUser :: error", error);
    throw error;
  }
}

    async getCurrentUser() {
  try {
    const user = await this.account.get();
    console.log("Current user:", user);
    return user;
  } catch (error) {
    console.log("Appwrite AuthService :: getCurrentUser :: error", error);
    return null; // Important to return null if not logged in
  }
}
    
    // async logout() {
    //     try {
    //         await this.account.deleteSessions();
            
    //     } catch (error) {
    //       console.log("Appwrite service:: logout::error",error);
    //     }
        
    // }

    async logout() {
    try {
        await this.account.deleteSessions(); // Deletes all active sessions
        // Or if you only want to delete the current session:
        // await this.account.deleteSession('current');
        return true; // Indicate success
    } catch (error) {
        console.log("Appwrite AuthService :: logout :: error", error);
        throw error; // Re-throw to be caught by the component
    }
}
}
const service= new AuthService();
export default service;