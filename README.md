# Feedback Management System

A full-stack web application for managing customer feedback with an admin panel.

## Features

- User-facing feedback submission form
- Public feedback viewing page
- Admin panel for feedback management
- Real-time updates
- MongoDB integration
- Responsive design

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB
- Real-time updates with auto-refresh

## Project Structure

```
Feedback/
├── public/
│   ├── index.html      # Home page
│   ├── feedback.html   # Feedback submission form
│   ├── view.html      # Public feedback view
│   └── admin.html     # Admin panel
├── server.js          # Backend server
└── README.md         # Documentation
```

## Setup Instructions

1. Install Dependencies:
```bash
npm install
```

2. Start MongoDB:
- Make sure MongoDB is installed on your system
- Start MongoDB service
- Default connection URL: mongodb://127.0.0.1:27017/feedback

3. Start the Server:
```bash
node server.js
```

4. Access the Application:
- Home page: http://localhost:4000
- Admin Panel: http://localhost:4000/admin.html

## Admin Panel Access

The admin panel is accessible at `/admin.html`. In a production environment, you should:
1. Add authentication to protect the admin panel
2. Use environment variables for configuration
3. Implement proper security measures

### Admin Panel Features

1. View all feedback submissions
2. Approve/Reject feedback
3. Add responses to feedback
4. Mark feedback as resolved/unresolved
5. Real-time updates (30-second refresh)

## Security Considerations

For production deployment, consider implementing:
1. User authentication for admin panel
2. Environment variables for sensitive data
3. Rate limiting
4. Input validation
5. HTTPS encryption

## Future Improvements

1. Add user authentication
2. Email notifications
3. Dashboard analytics
4. Export functionality
5. Advanced filtering and search

## Contact


[vamshi krishna]
[vamshicherry624@gmail.com]
[github:https://github.com/vamshi335235/feedback-sysytem.git ]

npm run pm2:status  # Check server status
npm run pm2:stop   # Stop server
npm run pm2:restart # Restart server 
