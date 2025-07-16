import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  let client;
  try {
    client = new MongoClient(uri);
    await client.connect();
    const db = client.db("sample_mflix"); // replace with your actual db name
    const nodes = await db.collection("nodes").find().toArray();
    res.status(200).json(nodes);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: error.message, stack: error.stack });
  } finally {
    if (client) await client.close();
  }
} 