import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.kadir.aora",
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_DATABASE_ID,
  userCollectionId: process.env.EXPO_PUBLIC_USERCOLLECTION_ID,
  videoCollectionId: process.env.EXPO_PUBLIC_VIDEOCOLLECTION_ID,
  storageId: process.env.EXPO_PUBLIC_STORAGE_ID,
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Sign Up
export const signUp = async (username, email, password) => {
  try {
    if (!username || !email || !password) throw Error;

    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

// Sign In
export const signIn = async (email, password) => {
  try {
    if (!email || !password) throw Error;

    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};
