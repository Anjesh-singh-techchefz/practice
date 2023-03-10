//insert methods
db.collection.insertOne();
db.collection.insertMany();
db.collection.create(...obj);
db.collection.updateOne();
db.collection.updateMany();
db.collection.find({ name: 'Anjesh' });
db.collection.findOne({ name: 'Anjesh' });
db.collection.findById();
db.collection.findAndModify();
db.collection.findOneAndUpdate();
db.collection.findOneAndReplace();
db.collection.findOneAndDelete();
db.collection.bulkWrite();
db.collection.deleteOne();
db.collection.deleteMany();
db.collection.remove();
db.collection.replaceOne();

db.collection().find({ 'size.uom': 'in' }); //Match on a Nested Field
await doc.save();

db.collection().updateOne(
  { item: 'paper' },
  {
    $set: { 'size.uom': 'cm', status: 'P' }
  }
);
