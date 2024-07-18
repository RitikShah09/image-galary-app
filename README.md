# Unsplash Image Gallery

This project is a React-based image gallery that fetches images from the Unsplash API and displays them in a responsive masonry layout. It supports infinite scrolling to load more images as the user scrolls down. Clicking on an image opens it in a modal with a download button.

## Table of Contents
- Features
- Installation
- Usage
- Components
- APIs Used
- Dependencies

## Features
- Fetch images from Unsplash API
- Responsive masonry layout
- Infinite scrolling
- Modal view with image download option
- Toast notifications for error handling

## Installation
Clone the repository:
bash
git clone https://github.com/RitikShah09/image-galary-app


Navigate to the project directory:
bash
cd image-galary-app


Install the dependencies:
bash
npm install


## Usage
Start the development server:
`bash
npm start
`
## Components
- Home
This is the main component that handles the following:
- Fetching images from the Unsplash API
- Managing state for images, pagination, loading, and selected image
- Handling infinite scrolling
- Rendering the masonry layout of images
- Displaying a modal with the selected image and download option


## State Variables
- page: The current page number for API requests.
- data: An array of fetched images.
- pic: The currently selected image for the modal view.
- loading: A boolean indicating whether images are being loaded.


## Functions
- GetImages(): Fetches images from the Unsplash API and updates the state.
- handleScroll(): Handles infinite scrolling by checking the scroll position and updating the page state.


## useEffect Hooks
- Fetches images whenever the page state changes.
- Adds and removes the scroll event listener.

## Loader
- A simple loader component to indicate loading state.

## APIs Used
- Unsplash API: Used to fetch images.

## Dependencies
- react: JavaScript library for building user interfaces.
- react-responsive-masonry: Responsive masonry layout for React.
- react-toastify: Toast notifications for React.
- remixicon: Icon library for React.
