Blog Application

This Blog Application enables users to create, view, and manage blogs with a clean, user-friendly interface. Users can publish posts, update their content, and explore other blogs. This app includes authentication, blog management, and integration with Cloudinary for image uploads.
Features
1. User Authentication

    Sign Up and Login: Users can register and log in using email-based authentication.
    State Management: User state is managed using Zustand and Redux Toolkit to handle authentication and role-based access control.

2. Blog Management

    Create, Update, and Delete Blogs: Users can write, update, and delete their blogs.
    View Blogs: Users can view all blogs, single blogs, or their own blogs in an organized layout.
    Image Upload: Integrated with Cloudinary for image uploads in blogs, supporting multiple formats.

3. User Profile

    Profile Information: Displays user information such as name, email, and profile photo.
    Editable Profile: Users can view and edit profile details such as bio, photo, and other personal information.

4. Responsive UI

    Home Page Components: Includes sections like Hero, Trending, Devotional, and Creator to enhance the browsing experience.
    Themed Layout: Dark mode setup for an improved reading experience.

Tech Stack

    Frontend: React, Zustand, Redux Toolkit, Axios
    Backend: Node.js (REST API)
    Image Hosting: Cloudinary
    Styling: CSS (with dark theme support)

Getting Started

    Clone the repository:

    bash

git clone https://github.com/your-username/blog-application.git
cd blog-application

Install dependencies:

bash

npm install

Start the development server:

bash

    npm start

    Set up backend and environment variables as required (e.g., Cloudinary credentials).

