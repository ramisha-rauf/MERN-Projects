// const mongoose = require('mongoose')

// // const options = {
// //   // Other options...
// //   useNewUrlParser: true, // Note: This is no longer required but doesn't harm
// //   useUnifiedTopology: true,
// //   // ...
// // };

// const mongoDB = async () => {
//     try {
//       await mongoose.connect('mongodb+srv://Ramisha:SPwIykM1oD8Cqijg@atlascluster.2ejgp2j.mongodb.net/FoodSwift');
      
//       console.log('Database connected');
      
//       // Access the collection after the database connection is established
//       const db = mongoose.connection.db;
//       const fetched_data = await db.collection("food_items");
//       fetched_data.find({}).toArray(function(err,data){
//         if(err) console.log(err);
//         else{
//           global.food_items = data;
//         }
//       });
  
//     //  console.log('Fetched data:', fetched_data);
//     } catch (error) {
//       console.error('Error connecting to MongoDB:', error);
//     }
//   };

// // const mongoDB  = async () => {
// //     await mongoose.connect('mongodb+srv://Ramisha:SPwIykM1oD8Cqijg@atlascluster.2ejgp2j.mongodb.net/FoodSwift');
// //     console.log('database connected')
// //     const fetched_data = await mongoose.connection.db.collection("food_items");
// //     fetched_data.find({}).toArray(function(err,data){
// //         if(err) console.log(err);
// //         else console.log(data);
// //     })
// // }
// // mongoDB().catch(err => console.log(err));

// module.exports = mongoDB;

// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         await mongoose.connect('mongodb+srv://Ramisha:SPwIykM1oD8Cqijg@atlascluster.2ejgp2j.mongodb.net/FoodSwift');
//         console.log('Database connected');
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//     }
// };

// const fetchFoodItems = async () => {
//     try {
//         const db = mongoose.connection.db;
//         const fetched_data = await db.collection("food_items").find({}).toArray(async function(err,data){
//           const foodCategory = await mongoose.connection.db.collection("foodCategory");
//           foodCategory.find({}).toArray(function(err,catData){
//             if(err) console.log(err);
//             else{
//               global.foodCategory = catData;
//             }
//           })
//         });
//         return fetched_data;
//     } catch (error) {
//         console.error('Error fetching data from MongoDB:', error);
//         throw error;
//     }
// };

// module.exports = { connectDB, fetchFoodItems };

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://Ramisha:SPwIykM1oD8Cqijg@atlascluster.2ejgp2j.mongodb.net/FoodSwift');
        console.log('Database connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

const fetchFoodItems = async () => {
    try {
        const db = mongoose.connection.db;
        const fetched_data = await db.collection("food_items").find({}).toArray();
        return fetched_data;
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        throw error;
    }
};

const fetchFoodCategory = async () => {
    try {
        const db = mongoose.connection.db;
        const fetched_data = await db.collection("food_category").find({}).toArray();
        return fetched_data;
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        throw error;
    }
};

module.exports = { connectDB, fetchFoodItems, fetchFoodCategory };
