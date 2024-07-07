CopaAmericaAI
CopaAmericaAI is an AI-driven project designed for predicting football match outcomes and providing betting recommendations for the Copa América 2024 tournament. This project leverages advanced AI models to analyze match statistics and offer insights into potential outcomes and betting tips for football enthusiasts.

Features
Match Predictions: Analyze detailed football match statistics to forecast outcomes for Copa América 2024.
Betting Recommendations: Provide detailed betting suggestions including potential winners, final scores, and total goals.
Image Analysis: Analyze football-related images for additional insights and descriptions.
Getting Started
Prerequisites
Node.js (v18.16.0 or higher recommended)
node-fetch for making HTTP requests
multer for handling file uploads
Setup
Clone the Repository:

bash
Copiar código
git clone https://github.com/yourusername/CopaAmericaAI.git
cd CopaAmericaAI
Install Dependencies:

bash
Copiar código
npm install
Start the Server:

bash
Copiar código
npm start
The server will start and listen on http://localhost:3000.

API Endpoints
POST /predict
This endpoint analyzes match statistics and provides predictions and betting recommendations.

Request Body:

json
Copiar código
{
"team1": "Uruguay",
"team2": "Brasil",
"score": "0-0",
"minute": 64,
"possession": {
"team1": "50%",
"team2": "50%"
},
"shots": {
"team1": 15,
"team2": 5
},
"shots_on_target": {
"team1": 3,
"team2": 2
},
"corners": {
"team1": 5,
"team2": 3
},
"fouls": {
"team1": 31,
"team2": 28
},
"yellow_cards": {
"team1": 3,
"team2": 7
},
"red_cards": {
"team1": 0,
"team2": 0
},
"substitutions": {
"team1": 3,
"team2": 3
},
"players": {
"team1": {
"top_scorer": "Darwin Núñez",
"key_player": "Federico Valverde"
},
"team2": {
"top_scorer": "Endrick",
"key_player": "Raphinha"
}
},
"match_context": {
"game_location": "Allegiant Stadium",
"weather": "Clear",
"importance": "High",
"stage": "Group Stage"
},
"user_context": {
"message": "Remember that it's COPA AMERICA 2024 and that after the second half direct penalties will be used as it is elimination rounds, quarter-finals."
}
}
Response:

json
Copiar código
{
"prediction": "Your detailed prediction for the match.",
"betting_suggestions": {
"winner": "Team you think will win the match",
"final_score": "Final score you predict",
"total_goals": "Total number of goals you think will be scored",
"other_suggestions": "Any other relevant betting tips"
}
}
POST /predict-image
This endpoint analyzes football-related images for additional insights and descriptions.

Request:

Upload an image file with the field name image.

Response:

json
Copiar código
{
"prediction": "Detailed description of the image."
}
Example Usage with Postman
To use the /predict endpoint in Postman, follow these steps:

Set the HTTP Method to POST
Enter the URL: http://localhost:3000/predict
In the Body tab, select raw and JSON format
Paste the JSON request body from above
Example Request Body:

json
Copiar código
{
"team1": "Uruguay",
"team2": "Brasil",
"score": "0-0",
"minute": 64,
"possession": {
"team1": "50%",
"team2": "50%"
},
"shots": {
"team1": 15,
"team2": 5
},
"shots_on_target": {
"team1": 3,
"team2": 2
},
"corners": {
"team1": 5,
"team2": 3
},
"fouls": {
"team1": 31,
"team2": 28
},
"yellow_cards": {
"team1": 3,
"team2": 7
},
"red_cards": {
"team1": 0,
"team2": 0
},
"substitutions": {
"team1": 3,
"team2": 3
},
"players": {
"team1": {
"top_scorer": "Darwin Núñez",
"key_player": "Federico Valverde"
},
"team2": {
"top_scorer": "Endrick",
"key_player": "Raphinha"
}
},
"match_context": {
"game_location": "Allegiant Stadium",
"weather": "Clear",
"importance": "High",
"stage": "Group Stage"
},
"user_context": {
"message": "Remember that it's COPA AMERICA 2024 and that after the second half direct penalties will be used as it is elimination rounds, quarter-finals."
}
}
Notes
Ensure the local model API endpoint at http://127.0.0.1:11434/api/generate is available and properly configured.
Adjust the fetch request configurations in server.js based on the capabilities and requirements of your AI model.
