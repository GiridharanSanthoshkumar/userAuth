after cloning the repo
in the terminal, go to backend directory using cd command
install dependencies "npm install"
and then create .env file in the backend folder and
add the following;

DBURL="your mongodbcommunity server uri running in the localhost"
SESSIONSECRET="any secret key you can provide for session data encryption"

to enter the dburl in .env file , start your mongodb community server in the localhost and put the 
link in the DBURL.


then in the another terminal window, go to the frontend folder using the cd command
using the "npm install", install the dependencies 

then start the backend server using "node index.js" in backend folder terminal

start the compile and view the frontend "npm start" in the frontend folder terminal

the application is available in "http://localhost:3000"





