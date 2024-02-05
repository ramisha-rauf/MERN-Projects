// const express = require("express");
// const bodyParser = require("body-parser");
// const router = express.Router();

// router.use(bodyParser.json());
// router.post('/foodData',(req,res)=>{
//     try {
//         console.log(global.food_items)
//         res.send([global.food_items])
//     } catch (error) {
//         console.error(error.message);
//         res.send("Server Error")
//     }
// })

// module.exports = router;

// const express = require("express");
// const router = express.Router();

// router.post('/foodData', async (req, res) => {
//     try {
//         // Assuming global.food_items is a promise (e.g., a database query)
//         const foodItems = await global.food_items; // Await the result

//         console.log(foodItems);

//         res.send([foodItems]); // Send the response after the data is available
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Server Error"); // Set proper status code for server error
//     }
// });

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const { fetchFoodItems } = require('../db');

// router.post('/foodData', async (req, res) => {
//     try {
//         const foodItems = await fetchFoodItems();
//         console.log(foodItems);
//         res.send(foodItems);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Server Error");
//     }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const { fetchFoodItems, fetchFoodCategory } = require('../db');

router.post('/foodData', async (req, res) => {
    try {
        const foodItems = await fetchFoodItems();
        const foodCategory = await fetchFoodCategory();
        console.log('Food Items:', foodItems);
        console.log('Food Category:', foodCategory);
        res.send({ foodItems, foodCategory });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;


