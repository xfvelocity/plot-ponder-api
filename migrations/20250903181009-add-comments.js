const { v4: uuidv4 } = require("uuid");

module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    const cursor = db.collection("reviews").find({});

    while (await cursor.hasNext()) {
      const doc = await cursor.next();

      await db
        .collection("reviews")
        .updateOne({ _id: doc._id }, { $set: { uuid: uuidv4() } });
    }
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    await db.collection("reviews").updateMany({}, { $unset: { uuid: "" } });
  },
};
