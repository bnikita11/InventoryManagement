import {Account,Client,ID} from "appwrite";
import { conf } from "../conf/conf";

export class AuthService{
    client=new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);
    }

     async createAccount ({email,password,username}){
        try{
            const userAccount=await this.account.create(ID.unique(),email,password,username);
            // if (userAccount)
            //     {
            //         // 
            //         return this.login({email,password});
            // }
            // else{
                return userAccount;
            // }
            // console.log("Account created",userAccount)
        }
        catch(error){
            console.log("Appwrite AuthService :: createAccount :: error", error);
            throw error;

        }
    }

  async login({email,password}){
        
        try{
            const session=await this.account.createEmailPasswordSession(email,password);
            return session;

        }
        catch(error){
            console.log("Appwrite AuthService :: login :: error", error);
            return false;
        }

    }

    async getCurrentUser(){
        try {
            return await this.account.get();
            
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser:: error",error)
            
        }
        return null;

    }
    
    async logout() {
        try {
           

            await this.account.deleteSessions();
            
        } catch (error) {
          console.log("Appwrite service:: logout::error",error);
        }
        
    }



}
const service= new AuthService();
export default service;