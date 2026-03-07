import { client, ObjectId } from "../.server/mongo";

let db = client.db("fileDownloader");
let results = db.collection("schoolResults"); // results

//add results
export async function AddResults(data) {
  return results.insertOne({
    ...data,
    addedAt: new Date(),
  });
}

// get all results and also return each object id as a string for easy use later
export async function getResults() {
  let documents = await results.find().sort({ addedAt: -1 }).toArray();
  return documents.map((document) => ({
    ...document,
    _id: document._id.toString(),
  }));
}

//get individual results by using the id given for easy downloading
export async function getResultById(resultId) {
  return results.findOne({ _id: ObjectId.createFromHexString(resultId) });
}
