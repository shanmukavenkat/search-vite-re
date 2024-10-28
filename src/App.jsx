
import './App.css'
import Autocomplete from './components/autocomplete'

function App() {
  const staticData = [
    "apple",
    "banana",
    "mango",
    "orange",
    "grapes",
    "kiwi",
    "pineapple",
    "strawberry",
    "blueberry",
    "watermelon",
    "pomegranate",
    "cherry",
    "pear",
    "peach",
    "plum",
    "apricot",
    "avocado",
    "blackberry",
    "raspberry",
    "cantaloupe",

  ];

  const fetchSuggestions = async (query) => {
    
    const response = await fetch( `https://dummyjson.com/recipes/search?q=${query}`);
  
    if (!response.ok) {
      throw new Error("Failed to fetch suggestions");
    }
    const result = await response.json();
    return result.recipes;
  
  }
  return (
   <div>
    <h1>snvskomal</h1>
    <Autocomplete
     placeholder={"Enter Receipe"}
     //staticData={staticData}
    
    fetchSuggestions={fetchSuggestions}
    dataKey={"name"}
    customLoading ={<>Loading Recipes...</>}
    onSelect = {(res)=>console.log("Selected")}

    onChange = {(res)=>console.log("Changed")}
    onBlur = {(res)=>console.log("Blurred")}
    onFocus = {(res)=>console.log("Focused")}
    customStyles = {{}}
    />
   </div>
  )
}

export default App
