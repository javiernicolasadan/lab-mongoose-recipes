const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const createRecipe = async () => {
      const newRecipe = await Recipe.create({title: "tortilla", ingredients: ["huevos", "patatas"], cuisine: "whatever", dishType: "main_course", duration: 30, image: "", creator: "javier", created: "today" })
      const {title} = newRecipe
      console.log(title)
    }
    return createRecipe()
  })
  .then(()=>{
    const insertRecipes = async () => {
      const allData = await Recipe.insertMany(data)
      allData.forEach((eachRecipe) => {
        console.log(eachRecipe.title)
      })
    }
    return insertRecipes()
  })
  .then (() => {
    const changeRigatoni = async () => {
      const changeDuration = await Recipe.findOneAndUpdate( {title: "Rigatoni alla Genovese"}, {duration:100}, {new:true})
      console.log(`The duration of ${changeDuration.title} have been changed to ${changeDuration.duration}`)
    }
    return changeRigatoni()
  })
  .then(() => {
    const deleteCarrot = async () => {
      const removeCarrot = await Recipe.deleteOne({title:"Carrot Cake"})
      console.log("Carrot Cake have been removed!")
    }
    return deleteCarrot()
  })
  .then(() => {
    mongoose.disconnect(MONGODB_URI)
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
