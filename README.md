**ArtCritics**

*Overview*
The ArtCritics is a Node.js application that allows users to upload and view artwork, including images and descriptions. Users can also comment on the artworks. The application uses MongoDB for data storage and EJS for rendering views.

*Features*
Upload artwork with images and descriptions.
View a gallery of artworks.
Add and view comments on artworks.
Responsive design for desktop and mobile.
Getting Started
Prerequisites
Node.js (v14 or higher)
MongoDB

*API Endpoints*
GET /api/artwork: Fetch all artworks.
POST /api/artwork/upload: Upload a new artwork.
POST /api/artwork/
/comments: Add a comment to an artwork.

*File Structure*
server.js: Entry point for the application.
models/Artwork.js: Mongoose model for artwork.
models/Artists.js: Mongoose model for artists.
routes/multer.js: Routes for handling file uploads.
routes/artworks.js: Routes for managing artworks.
routes/artists.js: Routes for managing artists.
routes/comments.js: Routes for managing comments.
views/index.ejs: EJS template for the main gallery view.
public/styles/styles.css: CSS styles for the application.
uploads/: Directory for storing uploaded images.
