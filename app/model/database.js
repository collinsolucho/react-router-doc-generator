import { client, ObjectId } from "../.server/mongo";

let db = client.db("fileDownloader");
let results = db.collection("schoolResults"); // results

//add results
export async function AddResults(details) {
  return results.insertOne({
    ...details,
    addedAt: new Date(),
  });
}

// get all results and also return each object id as a string for easy use later
// have two documents per page for pagination
export async function getResults(page = 1, pageSize = 2) {
  // Calculate how many documents to skip
  // Page 1: (1-1) * 2 = 0 skip
  // Page 2: (2-1) * 2 = 2 skip
  const skip = (page - 1) * pageSize;

  const totalDocuments = await results.countDocuments();
  const totalPages = Math.ceil(totalDocuments / pageSize);
  //math.ceil(x) method rounds a number up to the nearest integer
  let documents = await results
    .find()
    .sort({ addedAt: -1 })
    .skip(skip)
    .limit(pageSize)
    .toArray();

  const formattedDocs = documents.map((doc) => ({
    ...doc,
    _id: doc._id.toString(),
  }));

  return {
    documents: formattedDocs,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

//get individual results by using the id given for easy downloading
export async function getResultById(resultId) {
  return results.findOne({ _id: ObjectId.createFromHexString(resultId) });
}
