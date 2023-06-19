# Short Havens

Short Havens is a soft clone of AirBnB's website. Who doesn't need a vacation, or want to book a haven away from home? With that inspiration in mind, Short Havens serves users to be able to see available spots, create, update, and delete spots, and also leave reviews!

Visit the live site here -----> [Short Havens](https://short-havens.onrender.com)

## Technologies Used

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

## Wiki Links

- [Redux Store Shape](https://github.com/adamchristoph18/Short-havens/wiki/Redux-Store-Shape)
- [DB Schema](https://github.com/adamchristoph18/Short-havens/wiki/Short-Havens-DataBase-Schema)

## Home Page

![Homepage](https://github.com/adamchristoph18/Short-havens/assets/110206190/42984675-fbc1-4e6d-a105-1b2ae24d0776)

![Screen Shot 2023-06-12 at 10 54 13 AM](https://github.com/adamchristoph18/Short-havens/assets/110206190/460f4fd7-a152-499e-8f3a-7d69dec7f555)

## Individual Spot Page

![SpotShowPage](https://github.com/adamchristoph18/Short-havens/assets/110206190/1e38270f-2657-4f25-bdae-29a5e74dcd0f)

## User's Manage Spots Page

![ManageSpotsPage](https://github.com/adamchristoph18/Short-havens/assets/110206190/e4bbf3dc-466b-46b5-a549-f3f516fb0bf2)

## User's Manage Reviews Page & Update Review Modal

![ManageReviews-UpdateReview](https://github.com/adamchristoph18/Short-havens/assets/110206190/4f6184b3-e823-4727-8a8f-3cbd34c5fbe9)

## User's Manage Bookings Page

![ManageBookingsPage](https://github.com/adamchristoph18/Short-havens/assets/110206190/52334547-2cf3-4eed-8bf8-3a2bb1027669)

## Create New Spot Form

![CreateNewSpotForm](https://github.com/adamchristoph18/Short-havens/assets/110206190/acdc2205-f48e-463b-be38-8ce4f00e659d)


## Getting Started

1. Clone this repository
     https://github.com/adamchristoph18/Short-havens

2. Install denpendencies into the Backed and the Frontend by making a terminal for each one and then run the following:
     - npm install

3. Create a .env file using the .envexample provided

4. Set up your database with information from your .env and then run the following to create your database, migrate, and seed:
     - npx dotenv sequelize db:create
     - npx dotenv sequelize db:migrate
     - npx dotenv sequelize db:seed:all

5. Start the app for both backend and frontend using:
     - npm start
  
6. Now you can either use the demo account or create your own account!
   

## Future Features

- AWS S3 for image file uploads
- Google Maps API (Logged-in users will be able to locate a spot's general location on the spot details page)
