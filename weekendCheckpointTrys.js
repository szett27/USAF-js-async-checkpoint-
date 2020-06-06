//This is what I attempted over the weekend
//Mainly trying to do something with the passed back object and read the API documentation

//we need to require both fetch for the web requests and fs for the file i/o
const fs = require('fs')
const fetch = require('node-fetch')

//my first step is trying to create an input file of all the Pokemon names
//after reading some documentation to get a name it should be data.names

//I also learned that 151 is just the first generation of Pokemon, but
//if it works here than it should work for any number of Pokemon


//loop through the first generation of Pokemon and get there names
//according to quora there are currently 720 pokemon
for(let i = 1; i <= 720; i++){

//I confirmed I can get the names with console.log(name.name) - I know, bad names - @2100
//Then I will see if I can write 1 name to a file - success moving on to all names - @2115
//Printed all but with no spaces or lines
//Success with names on single lines at @2117

fetch('https://pokeapi.co/api/v2/pokemon/' + i)
    .then(response => response.json())
    .then(name => {fs.appendFileSync('input.txt', name.name + "\n")})


}


//Input File has been created!

//Next Step is to then read each line from the input file and pass that to fetch
//Looking at the api there is a .types that either has 1 or 2 types
//we'll also need a new outputfile called output with the types attached.

//got this code from https://stackabuse.com/reading-a-file-line-by-line-in-node-js/ to read each line
//learned since 2015 JS has a native readline need the code below

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

//this took a while trying to get the right object before finally using the .type["name"] - @2222
lineReader.on('line', function (line) {
  fetch('https://pokeapi.co/api/v2/pokemon/' + line)
      .then(response => response.json())
      .then(current => {
            if(current.types.length === 2){
            fs.appendFileSync('output.txt', line + ': ' + current.types[0].type["name"] + " , " + current.types[1].type["name"] + "\n");
      } else{
            fs.appendFileSync('output.txt', line + ': ' + current.types[0].type["name"] + "\n");
      }
    });
});
