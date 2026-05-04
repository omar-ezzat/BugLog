import { MongoClient } from "mongodb";

const url = process.env.MONGODB_URI
if(!url){
    throw new Error("Please define MONGODB_URI in environment")
}

let client 
let clientPromise 

if(!global._mongoClientPromise){
    client = new MongoClient(url)
    global._mongoClientPromise = client.connect()
}

clientPromise = global._mongoClientPromise

export default clientPromise