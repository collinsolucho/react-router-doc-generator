import { client, ObjectId } from "../.server/mongo";

let db = client.db("portfolio");
let messages = db.collection("messages"); // messages

export async function AddMessages(phone, email, message) {
  return messages.insertOne({
    phone,
    message,
    email,
  });
}
