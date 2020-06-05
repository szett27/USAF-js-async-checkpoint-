//Async CheckPoint Two
//First copy the checkpoint instrucions
/*Project instructions

Create a command line application that processes a file list of pokemon names (each name seperated by a new line) and logs each Pokemon's types (for some there are many) according to the pokeapi.co API.
This is an assessment of both your understanding of the course material so far and your ability to independently problem solve and use the internet/other resources to implement anything you don't understand.
Example file input (input.txt)

charizard
pikachu
Example console output:

Charizard: flying, fire
Pikachu: electric
*/

//Inputs - a list of Pokemon their types fecthed from the pokeapi.co API, example file input is (input.txt)
//Pokemon types are listed here https://pokeapi.co/docs/v2#types
//From this list we need to get the type and then Pokemon that it is assigned to

//Outputs - a text file(output.txt) with the list of Pokeman and their types, seperated by a new line
//Looking at the example it will be an object with the Pokemon as the key an array of the types as the values(s)

//constraints - relies on API working reliably

//edge cases - not sure on this will check more later


//Start of Code

//we need to require fs so we can read, and write files
var fs = require('fs')
const fetch = require('node-fetch');
//Create the Pokemon object to store all the values


//first I will get all the Pokemon from the API
//Store all types in the object
let pokemonTypes =[];
//According to the api to get a Pokemon it's https://pokeapi.co/api/v2/pokemon/{id or name} or to get all looks like
//pokemon?limit=100&offset=200.

//use fetch to get the pokemon, it doesn't look like this returns their actual types, I used filter to only fill
//the pokemonTypes with their names as the object keys

//.map isn't working so I'll try a for loop
fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(input => {pokemonTypes = JSON.parse(input)})
    .then(data => { //confirmed all pokemon types are being returned in
    //JSON using .then(data => { console.log(data)}) - no longer needed
    //turn JSON into an array maybe?
    pokemonTypes = data.parse();
      console.log(pokemonTypes.filter(function(item){ //<-spent way too much time here, trying to figure out why
        //.filter is not a function
            return item.type == "name";

      })) //.forEach(item => item["name"]);
    });

//if this type codes executes then we would go into the second fetch below
//I would loop through each obj or key stored in the array and then add the types
//You would probably need to create new object each time and then add the key from the array and the values
//from the fetch method

//then that new object would be pushed onto the array

  //second fetch is now needed to get the pokemon types, but wrapped in a loop that goes through all the pokemon names
/*  pokemonTypes.forEach(obj=>{
    let tempObj = {obj};

  fetch('https://pokeapi.co/api/v2/pokemon/' + obj)
      .then(response => response.json())
      .then(data => {
        tempObj[obj] = data["type"]
        pokemonTypes.push(tempObj)
      }
        )
      });
*/



//not sure if we need this
//fs.writeFile('output.txt', w, "");

//append the file with each Pokemon and their types seperated by a new line
pokemonTypes.forEach(obj=>{fs.appendFile('output.txt', obj + "\n")})
