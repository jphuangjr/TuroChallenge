# TuroChallenge
Turo Thumbstack Database Challlenge coded in JavaScript

Source: https://www.thumbtack.com/challenges/simple-database

###Dependencies
Node.js

### Running the Code 

Please enter the commands into `input.txt` and then run `node challenge.js` from the root folder.  

### Thought Process

I decided to code the program using JavaScript as I am unfamiliar with Python or the other High-Level languagues (although I am eager to learn). The way I set up my code was by creating a pseudo-classical javascript object. I gave this object a library and cacheLib which are both hash tables and a history to keep a list of the transaction history. All of the methods involved were put directly on the database's prototype object. 

In order to read the commands, the script uses the fs module to read from the input.txt. The commands are read line by line and are parsed to the correct commands and inputs. 
