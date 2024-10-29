import config from '../config/config.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // Call another method to log in the user automatically after account creation
                return this.login({ email, password }); 
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createSession(email, password);
        } catch (error) {
            alert(`Appwrite service :: login :: error: ${error.message}`);
            throw error; // Re-throw if you want to handle it in the calling code
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            alert(`Appwrite service :: getCurrentUser :: error: ${error.message}`);
            return null;
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            alert(`Appwrite service :: logout :: error: ${error.message}`);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;
