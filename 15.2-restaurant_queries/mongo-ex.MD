1. Crud:

1.1 – Write a MongoDb query to display all the documents in
the restaurant collection:

- db.restaurants.find().pretty();

  1.2 - Write a MongoDb query to display all restaurants that
  have a specific cuisine:

- db.restaurants.find({"cuisine" : {$exists: true}}).pretty();
- db.restaurants.find({"cuisine" : "asian"}).pretty();

  1.3 - Write a MongoDb query that displays only kosher
  restaurants:

- db.restaurants.find({"kosher" :true }).pretty();

  1.4 - Write a MongoDb query that displays only a specific cities
  restaurants:

- db.restaurants.find({$or:[{"address.city":"Holon"}, {"address.city":"Tel Aviv"}]}).pretty();
- db.restaurants.find({"address.city":{$in:["Holon", "Tel Aviv"]}}).pretty();

  1.5 - Write a MongoDb query to display a specific restaurants
  address:

- db.restaurants.find({$and:[{"address.city":"Tel Aviv"}, {"address.street": "Balfur 15"}]}).pretty();

  1.6 - Write a MongoDb query to display a specific restaurants
  coordinates:

- db.restaurants.find({"address.coordinates":[-77.46574, 40.6774]}).pretty();
- db.restaurants.find({"\_id" : ObjectId("61e54343575479ff7e4b79a6")}).address.coordinates.pretty();

  1.7. - Write a MongoDb query that should display all restaurants in ascending order by restaurant name:

- db.restaurants.find().sort({"name":1});

  1.8 - Write a MongoDb query that should display all restaurants in ascending order by city names:

- db.restaurants.find().sort({"address.city":1}).pretty();

  1.9 - Update a specific restaurant's name:

- db.restaurants.updateOne({"\_id" : ObjectId("61e54343575479ff7e4b79a6")},{$set:{"name": "coconut"}});

  1.10 - Update a specific restaurant by adding a new review:

- db.restaurants.updateOne({"\_id" : ObjectId("61e54343575479ff7e4b79a6")},{$push:{"reviews": {date:new Date(), score: 100}}});

  1.11 - Update all restaurants to be kosher:

- db.restaurants.updateMany({kosher: false}, {$set:{kosher: true}});

  1.12 - Delete a specific restaurant:

- db.restaurants.deleteOne({"\_id" : ObjectId("61e54343575479ff7e4b79a6")});

  1.13 - Delete all restaurants

2. forEach Queries:

2.1 - Write a MongoDb query to print all restaurant names:

- db.restaurants.find().forEach((restaurant)=> print (restaurant.name));

  2.2 - Write a MongoDb query to print all restaurant cities:

- db.restaurants.find().forEach((restaurant)=> print (restaurant.address.city));

  2.3 - Write a MongoDb query to print all restaurant coordinates:

- db.restaurants.find().forEach((restaurant)=> print (restaurant.address.coordinates));

3. Advanced Queries:

3.1 - Query for restaurant names that start with a specific alphabet:

- db.restaurants.find({"name": /^a/}).pretty();

  3.2 - Query how many documents you have from the restaurant collection:

- db.restaurants.find().count();

  3.3 - Write a MongoDb query to get restaurants that include reviews from a specific date:

- db.restaurants.find({"reviews.date":ISODate("2016-01-01T00:00:00Z")}).pretty();
- db.restaurants.find({"reviews.date": {$in:[ISODate("2020-01-01T00:00:00Z")]}}).pretty();

