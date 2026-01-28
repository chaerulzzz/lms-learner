# LMS Backend Service - Professional Go Implementation

A comprehensive Learning Management System (LMS) backend built with **Go**, **Gin Framework**, **PostgreSQL**, and **GORM**. This is a production-ready LMS backend that implements clean architecture principles with complete gamification, course management, quiz system, and reporting capabilities.

## 🎯 Features

### Core Features
- ✅ **User Management** - Registration, login, profile management, role-based access
- ✅ **Course Management** - Create, publish, search, categorize, and manage courses
- ✅ **Enrollment System** - User enrollment, progress tracking, mandatory/optional courses
- ✅ **Video Progress Tracking** - Track video watch time, auto-complete lessons at 90%
- ✅ **Quiz & Assessments** - Multiple attempt tracking, automated grading, score calculation
- ✅ **Gamification System** - GMFC coins, badge progression, leaderboard rankings
- ✅ **Certificate Generation** - Issue certificates upon course completion
- ✅ **Dashboard** - Comprehensive user dashboard with statistics
- ✅ **Course Reviews** - User ratings and reviews for courses
- ✅ **Audit Logging** - System compliance and audit trail
- ✅ **Performance Reporting** - Learning analytics and reporting

### Technical Features
- Clean Architecture (Models, Repositories, Services, Handlers)
- JWT Authentication with role-based access control
- Comprehensive error handling and validation
- Database migrations with auto-migration
- Seeding with initial data
- Paginated responses
- Middleware for CORS, authentication, and error handling
- RESTful API design with API versioning (v1)

## 📁 Project Structure

```
lms-go-be/
├── cmd/
│   └── main.go                          # Application entry point
├── internal/
│   ├── config/
│   │   └── config.go                    # Configuration management
│   ├── database/
│   │   ├── database.go                  # Database initialization
│   │   └── seeder.go                    # Database seeding
│   ├── handler/
│   │   ├── auth_handler.go              # Authentication endpoints
│   │   ├── course_handler.go            # Course management endpoints
│   │   ├── enrollment_progress_quiz_handler.go  # Enrollment, progress, quiz endpoints
│   │   └── dashboard_user_handler.go    # Dashboard and user endpoints
│   ├── middleware/
│   │   └── auth.go                      # Authentication & CORS middleware
│   ├── models/
│   │   └── models.go                    # Database models
│   ├── repository/
│   │   ├── user_repository.go
│   │   ├── course_repository.go
│   │   ├── enrollment_repository.go
│   │   ├── user_progress_repository.go
│   │   ├── quiz_certificate_repository.go
│   │   ├── gamification_repository.go
│   │   └── reporting_repository.go
│   ├── service/
│   │   ├── auth_service.go
│   │   ├── course_service.go
│   │   ├── enrollment_service.go
│   │   ├── progress_gamification_service.go
│   │   └── quiz_dashboard_service.go
│   └── utils/
│       ├── response.go                  # Response utilities
│       └── jwt.go                       # JWT utilities
├── migrations/                          # Database migrations directory
├── .env.example                         # Environment variables template
├── go.mod                               # Go modules
└── README.md                            # This file
```

## 🚀 Quick Start

### Prerequisites
- Go 1.21 or higher
- PostgreSQL 12 or higher
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd lms-go-be
```

2. **Setup environment variables**
```bash
cp .env.example .env
# Edit .env with your PostgreSQL credentials
```

3. **Install dependencies**
```bash
go mod download
```

4. **Run database migrations and seeding**
```bash
go run cmd/main.go
# The application will automatically run migrations and seed initial data
```

5. **Start the server**
```bash
go run cmd/main.go
```

The server will start on `http://localhost:8080`

## 📚 API Documentation

### Authentication Endpoints

#### Register
```http
POST /api/v1/public/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Doe",
  "department": "Engineering"
}
```

#### Login
```http
POST /api/v1/public/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "code": 200,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "full_name": "John Doe",
      "role": "learner",
      "gmfc_coins": 100,
      "current_badge_level": "bronze",
      "total_learning_hours": 0,
      "current_streak": 0,
      "created_at": "2024-01-28T12:00:00Z"
    }
  }
}
```

### Course Endpoints

#### Get All Courses
```http
GET /api/v1/public/courses?page=1
```

#### Search Courses
```http
GET /api/v1/public/courses/search?q=golang
```

#### Get Course by Category
```http
GET /api/v1/public/courses/category/Programming
```

#### Enroll in Course (Protected)
```http
POST /api/v1/courses/enroll
Authorization: Bearer <token>
Content-Type: application/json

{
  "course_id": 1
}
```

### Dashboard Endpoints (Protected)

#### Get User Dashboard
```http
GET /api/v1/dashboard
Authorization: Bearer <token>
```

Returns:
- Mandatory courses
- In-progress courses
- Completed courses count
- Certificates
- GMFC coins balance
- Current badge level
- Leaderboard rank

### Progress Endpoints (Protected)

#### Track Video Progress
```http
POST /api/v1/progress/track
Authorization: Bearer <token>
Content-Type: application/json

{
  "course_id": 1,
  "lesson_id": 5,
  "watched_duration": 150,
  "total_duration": 600
}
```

#### Get Course Progress
```http
GET /api/v1/progress/course/1
Authorization: Bearer <token>
```

### Quiz Endpoints (Protected)

#### Start Quiz Attempt
```http
POST /api/v1/quiz/start
Authorization: Bearer <token>
Content-Type: application/json

{
  "quiz_id": 1
}
```

#### Submit Quiz
```http
POST /api/v1/quiz/submit/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "quiz_id": 1,
  "answers": {
    "1": "2",  // question_id: answer
    "2": "true"
  },
  "time_spent": 1200
}
```

### Gamification Endpoints (Protected)

#### Get User Coins
```http
GET /api/v1/user/coins
Authorization: Bearer <token>
```

#### Get Coin Transactions
```http
GET /api/v1/user/coins/transactions
Authorization: Bearer <token>
```

#### Get User Badges
```http
GET /api/v1/user/badges
Authorization: Bearer <token>
```

#### Get Leaderboard
```http
GET /api/v1/user/leaderboard?order_by=coins&limit=100
Authorization: Bearer <token>
```

## 🏗️ Architecture

### Clean Architecture Implementation

The project follows clean architecture principles with clear separation of concerns:

```
┌─────────────────────────────────────────────────┐
│           HTTP Handlers Layer                    │
├─────────────────────────────────────────────────┤
│      Business Logic (Service Layer)              │
├─────────────────────────────────────────────────┤
│     Data Access (Repository Layer)               │
├─────────────────────────────────────────────────┤
│      Database (PostgreSQL)                       │
└─────────────────────────────────────────────────┘
```

### Layer Responsibilities

**Handlers**: HTTP request/response handling, input validation
**Services**: Business logic, workflows, calculations
**Repositories**: Database queries, CRUD operations
**Models**: Data structures and relationships

## 📊 Database Schema

### Core Entities
- **Users** - Learners, instructors, admins, HR personnel
- **Courses** - Training courses with metadata
- **Lessons** - Individual lessons within courses
- **Enrollments** - User course enrollment tracking
- **UserProgress** - Lesson-by-lesson progress
- **Quizzes** - Course assessments
- **Certificates** - Issued upon completion
- **CoinTransactions** - Gamification tracking
- **Badges** - Achievement badges with criteria
- **SystemAuditLog** - Compliance logging
- **CourseReviews** - User ratings and reviews

## 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based access control (RBAC)
- Available roles: learner, instructor, admin, hr_personnel
- Token expiration: 24 hours (configurable)

## 🚦 Middleware

- **AuthMiddleware** - JWT validation and extraction
- **RoleMiddleware** - Role-based access control
- **CORSMiddleware** - Cross-origin resource sharing
- **ErrorHandlerMiddleware** - Panic recovery
- **RequestIDMiddleware** - Request tracking

## 📝 Database Seeding

Initial data is automatically seeded on first run:
- 1 admin user
- 1 instructor
- 1 HR personnel
- 3 learner accounts
- 5 courses
- Lessons and quizzes
- Initial badges

**Seeded Credentials:**
```
Admin: admin@lms.com / admin@123
Instructor: instructor@lms.com / instructor@123
Learner: learner1@lms.com / learner@123
```

## 🔧 Configuration

Edit `.env` file for configuration:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=lms_db

# Server
SERVER_PORT=8080
SERVER_ENV=development

# JWT
JWT_SECRET_KEY=your-secret-key-change-in-production
JWT_EXPIRES_IN=24

# Logger
LOG_LEVEL=info
```

## 📈 Performance Considerations

- Database connection pooling (min: 5, max: 25)
- Indexed frequently queried fields
- Pagination on list endpoints
- Efficient query design with preloading

## 🧪 Testing the API

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:8080/api/v1/public/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "first_name": "John",
    "last_name": "Doe"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8080/api/v1/public/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Get Dashboard:**
```bash
curl -X GET http://localhost:8080/api/v1/dashboard \
  -H "Authorization: Bearer <your-token>"
```

## 🎓 Code Examples

### Register a User
```go
user, err := authService.Register(
  "user@example.com",
  "password123",
  "John",
  "Doe",
  "Engineering",
)
```

### Enroll User in Course
```go
enrollment, err := enrollmentService.EnrollUser(userID, courseID)
```

### Track Progress
```go
progress, err := progressService.TrackProgress(
  userID,
  courseID,
  lessonID,
  watchedSeconds,
  totalSeconds,
)
```

### Award Coins
```go
err := gamificationService.AwardCoins(
  userID,
  100,
  "Quiz Passed",
  "quiz",
  &quizID,
)
```

## 📦 Dependencies

Key dependencies:
- `github.com/gin-gonic/gin` - Web framework
- `gorm.io/gorm` - ORM
- `gorm.io/driver/postgres` - PostgreSQL driver
- `github.com/golang-jwt/jwt/v5` - JWT handling
- `golang.org/x/crypto` - Password hashing
- `github.com/google/uuid` - UUID generation
- `go.uber.org/zap` - Structured logging
- `github.com/joho/godotenv` - Environment loading

## 🚀 Deployment

### Build for Production
```bash
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o lms-backend cmd/main.go
```

### Docker Deployment
```dockerfile
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux go build -o main cmd/main.go

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/main .
COPY .env .
EXPOSE 8080
CMD ["./main"]
```

## 📝 API Response Format

### Success Response
```json
{
  "code": 200,
  "message": "Operation successful",
  "data": { /* ... */ }
}
```

### Paginated Response
```json
{
  "code": 200,
  "message": "Data retrieved successfully",
  "data": [ /* ... */ ],
  "pagination": {
    "page": 1,
    "page_size": 10,
    "total": 100,
    "total_page": 10
  }
}
```

### Error Response
```json
{
  "code": 400,
  "message": "Bad Request",
  "error": "Invalid email format"
}
```

## 🔒 Security Best Practices

- ✅ Passwords hashed with bcrypt
- ✅ JWT for stateless authentication
- ✅ Role-based access control
- ✅ Input validation and sanitization
- ✅ Error messages don't leak sensitive information
- ✅ CORS configured for security
- ✅ Audit logging for compliance

## 🐛 Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Check DB_HOST, DB_PORT, DB_USER, DB_PASSWORD in .env
- Verify database exists

### Port Already in Use
- Change `SERVER_PORT` in .env
- Or kill process using port 8080

### JWT Token Invalid
- Ensure JWT_SECRET_KEY is set consistently
- Check token hasn't expired
- Verify Authorization header format: `Bearer <token>`

## 📚 Further Development

Areas for enhancement:
- Email notifications system
- Video streaming optimization
- Advanced analytics dashboard
- Mobile app support
- Content recommendation engine
- Social learning features
- Advanced permission system
- API rate limiting

## 📄 License

This project is licensed under the MIT License.

## 👨‍💼 Support

For issues, questions, or contributions, please reach out or create an issue in the repository.

---

**Built with ❤️ using Go, Gin, and PostgreSQL**
