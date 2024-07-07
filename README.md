# Instatus - Activity Log Page

A general solution for tracking and managing activity logs in various applications. It allows admins to monitor and analyze user actions within their teams. This document outlines the features, tech stack, and implementation details.

## Features

- Track and log various events and actions users perform in the application.
- View and analyze activity logs with pagination, search, and filtering options.
- Backend endpoints for creating and retrieving events.
- Additional bonus features include filtering rows and exporting to CSV.

## Tech Stack

### Backend

- Language: TypeScript
- ORM: Prisma
- Framework: Node.js (Express.js)
- Database: Postgres

### Frontend

- Framework: Raact.js
- Styling: TailwindCSS
- Data Fetching: SWR

## Implementation

### Backend Endpoints

- **POST api/events**: Endpoint for creating new events.
- **GET api/events**: Endpoint for retrieving events.

### Frontend Functionality

The frontend interface allows users to interact with the activity logs.

- **Listing**: Display a list of activity logs with pagination.
- **Details**: Show detailed information about a specific event.
- **Load More**: Load additional logs when requested.
- **Search**: Search for specific events based on keywords.
- **Filter Rows**: Filter logs based on actor ID, target ID, action ID, and/or name.
- **Export to CSV**: Option to export logs to a CSV file.

### Design

About the design, please refer to the [Figma Activity Log Design](https://www.figma.com/file/rygmKpkjsqVW4sB503TOOl/Activity-Log?node-id=0%3A1) file.


[Live Link](https://activity-log-page.vercel.app)


---

