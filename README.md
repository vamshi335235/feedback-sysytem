# Feedback Management System

A full-stack feedback management application that allows users to submit feedback and administrators to manage responses through an intuitive interface.

## How to Run

1. Install MongoDB and start the MongoDB service
2. Open terminal in the project folder and run:
   ```bash
   npm install
   npm run dev
   ```
3. Open in browser:
   - Website: http://localhost:4000
   - Admin Panel: http://localhost:4000/admin.html

## Project Structure

```
feedback-system/
├── config/
│   └── database.js     # MongoDB configuration and connection
├── models/
│   └── feedback.js     # Feedback data model and schema
├── routes/
│   └── feedback.js     # API route handlers
├── public/             # Frontend static files
│   ├── index.html      # Landing page
│   ├── feedback.html   # Feedback submission form
│   ├── view.html      # Public feedback view
│   └── admin.html     # Admin dashboard
└── server.js          # Main application entry point
```

## Code Organization

### Backend Structure
- **Models**: Database schemas and models using Mongoose
- **Routes**: Express route handlers for API endpoints
- **Config**: Configuration files for database and other services
- **Server**: Main Express application setup and middleware

### API Endpoints

1. **GET /api/feedback**
   - Get all feedback entries
   - Sorted by creation date
   - Returns: List of feedback items

2. **POST /api/feedback**
   - Submit new feedback
   - Required fields: name, email, message
   - Returns: Created feedback object

3. **GET /api/feedback/search**
   - Search feedback by email
   - Query parameter: email
   - Returns: Matching feedback items

4. **PATCH /api/feedback/:id**
   - Update feedback status/response
   - Can update: approved, resolved, response
   - Returns: Updated feedback object

### Implementation Details

#### Database Model
```javascript
{
  name: String,      // Required
  email: String,     // Required
  message: String,   // Required
  createdAt: Date,   // Auto-generated
  approved: Boolean, // Default: null
  resolved: Boolean, // Default: false
  response: String   // Default: empty string
}
```

#### Security Features
- Input validation and sanitization
- CORS enabled
- Error handling
- Protected admin routes
- Limited field updates

#### Error Handling
- Proper HTTP status codes
- Detailed error messages
- Request validation
- Database error handling
- Server error logging

## Features

### User Features
- Clean and responsive feedback form
- Public feedback viewing
- Real-time updates
- Mobile-friendly design
- Simple navigation

### Admin Features
- Comprehensive dashboard
- Feedback management
- Response system
- Status tracking
- Auto-refresh functionality
- Search capabilities

## Technical Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Responsive Design

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- RESTful API architecture

## Future Enhancements

- User authentication system
- Email notifications
- Analytics dashboard
- Export functionality
- Enhanced search capabilities

## Developer

- **Name:** Vamshi Krishna
- **Email:** vamshicherry624@gmail.com

## License

ISC License 
