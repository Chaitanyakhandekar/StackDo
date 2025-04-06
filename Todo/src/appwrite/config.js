// src/appwrite/appwriteConfig.js
import { Client, Account, Databases } from "appwrite";

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('67efd413003a478100a0');

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
