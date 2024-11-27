<a id="readme-top"></a>
<!-- ABOUT THE PROJECT -->
## About The Project

A full-stack real estate finder application that allows users to search for properties, view detailed listings, and engage in real-time chat with property owners or agents.

### New Admin Dashboard
Newly incorported an admin dashboard that admins with the admin username and password can access. 
- **Post Moderation**: Posts interface where any innapropriate or invalid posts can be flagged or deleted permanently
- **User Moderation**: The ability to ban users for violating certain guidelines/rules
- **Inquiry Messages**: Users from the client website can submit inquiries and messages for the admins to view on the admin panel

### Key Features:
- **User Authentication**: Secure user authentication and authorization using JSON Web Tokens (JWT) for account management and session persistence.
- **Real-Time Chat**: Real-time messaging functionality implemented with Socket.io, allowing users to communicate instantly within property posts.
- **Property Search and Routing**: Property search with filtering capabilities and navigation through property listings.
- **Interactive Map**: Integration of the Leaflet library to display properties on an interactive map, providing geographic context to users.
- **Optimized UI**: Utilized React Suspense to optimize UI component loading, improving performance and ensuring a smooth user experience.
- **Real-Time Notifications**: Managed live chat notifications using Zustand for a responsive and engaging interface.
  
### Built With
- **Frontend**: React.js, React Router, Leaflet, React Suspense, Zustand
- **Backend**: Node.js, Express.js
- **Web Sockets**: Socket.io
- **Authentication**: JSON Web Tokens (JWT)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
