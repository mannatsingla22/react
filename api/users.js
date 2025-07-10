import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  try {
    await client.connect();
    const db = client.db("sample_mflix"); // use your actual db name
    const users = await db.collection("users").find().toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error("API error:", error); // helpful for debugging
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
}