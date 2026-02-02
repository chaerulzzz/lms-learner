# LMS Backend - Complete API Reference

Comprehensive API endpoint documentation for the LMS Backend Service.

## Table of Contents
1. [Authentication](#authentication-endpoints)
2. [Courses](#course-endpoints)
3. [Enrollment](#enrollment-endpoints)
4. [Progress](#progress-tracking-endpoints)
5. [Quizzes](#quiz-endpoints)
6. [Gamification](#gamification-endpoints)
7. [Dashboard](#dashboard-endpoints)
8. [User Management](#user-management-endpoints)
9. [Admin Endpoints](#admin-endpoints)

---

## Authentication Endpoints

All authentication endpoints are public and don't require tokens.

### Register User
**POST** `/api/v1/public/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "first_name": "John",
  "last_name": "Doe",
  "department": "Engineering"
}
```

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "User registered successfully",
  "data": {
    "id": 4,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "full_name": "John Doe",
    "role": "learner",
    "department": "Engineering",
    "gmfc_coins": 0,
    "current_badge_level": "none",
    "total_learning_hours": 0,
    "current_streak": 0,
    "created_at": "2024-01-28T12:00:00Z",
    "updated_at": "2024-01-28T12:00:00Z"
  }
}
```

**Status Codes:**
- `200 OK` - User registered successfully
- `400 Bad Request` - Invalid email or password format
- `409 Conflict` - Email already exists

---

### Login
**POST** `/api/v1/public/auth/login`

Authenticate and receive JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "full_name": "John Doe",
      "role": "learner",
      "gmfc_coins": 250,
      "current_badge_level": "silver",
      "total_learning_hours": 45,
      "current_streak": 7
    }
  }
}
```

**Status Codes:**
- `200 OK` - Login successful
- `400 Bad Request` - Invalid credentials
- `404 Not Found` - User not found

---

### Get Current User
**GET** `/api/v1/auth/me`

Get authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "User profile retrieved",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "full_name": "John Doe",
    "role": "learner",
    "department": "Engineering",
    "gmfc_coins": 250,
    "current_badge_level": "silver",
    "total_learning_hours": 45,
    "current_streak": 7
  }
}
```

---

### Update Profile
**PUT** `/api/v1/auth/profile`

Update user profile information.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "first_name": "Jonathan",
  "last_name": "Doe",
  "department": "Product"
}
```

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "Profile updated successfully",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "Jonathan",
    "last_name": "Doe",
    "full_name": "Jonathan Doe",
    "updated_at": "2024-01-28T12:30:00Z"
  }
}
```

---

### Change Password
**POST** `/api/v1/auth/change-password`

Change user password.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "old_password": "OldPass123!",
  "new_password": "NewPass123!"
}
```

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "Password changed successfully"
}
```

**Status Codes:**
- `200 OK` - Password changed
- `400 Bad Request` - Invalid old password
- `422 Unprocessable Entity` - Weak password

---

## Course Endpoints

### Get All Courses (Public)
**GET** `/api/v1/public/courses?page=1&page_size=10`

Retrieve paginated list of all courses.

**Query Parameters:**
- `page` (int, default: 1) - Page number
- `page_size` (int, default: 10) - Items per page

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "Courses retrieved successfully",
  "data": [
    {
      "id": 1,
      "title": "Go Programming Basics",
      "description": "Learn Go fundamentals",
      "category": "Programming",
      "duration_hours": 20,
      "difficulty": "beginner",
      "instructor_id": 2,
      "instructor_name": "Jane Smith",
      "is_mandatory": true,
      "enrollment_count": 150,
      "completion_count": 45,
      "average_rating": 4.5,
      "created_at": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "page_size": 10,
    "total": 25,
    "total_page": 3
  }
}
```

---

### Search Courses
**GET** `/api/v1/public/courses/search?q=golang&page=1`

Search courses by title or description.

**Query Parameters:**
- `q` (string, required) - Search query
- `page` (int, default: 1) - Page number
- `page_size` (int, default: 10) - Items per page

**Response:** Same as Get All Courses

---

### Get Courses by Category
**GET** `/api/v1/public/courses/category/{category}`

Get courses in a specific category.

**Path Parameters:**
- `category` (string) - Category name (e.g., "Programming", "Design")

**Query Parameters:**
- `page` (int, default: 1)
- `page_size` (int, default: 10)

**Response:** Same as Get All Courses

---

### Get Course Details
**GET** `/api/v1/public/courses/{courseId}`

Get detailed information about a course.

**Path Parameters:**
- `courseId` (int) - Course ID

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "Course details retrieved",
  "data": {
    "id": 1,
    "title": "Go Programming Basics",
    "description": "Learn Go fundamentals",
    "category": "Programming",
    "duration_hours": 20,
    "difficulty": "beginner",
    "instructor_id": 2,
    "instructor_name": "Jane Smith",
    "is_mandatory": true,
    "enrollment_count": 150,
    "completion_count": 45,
    "average_rating": 4.5,
    "lessons": [
      {
        "id": 1,
        "title": "Introduction to Go",
        "order": 1,
        "materials": [
          {
            "id": 1,
            "type": "video",
            "title": "Getting Started",
            "url": "https://example.com/video1.mp4",
            "duration_seconds": 300
          }
        ]
      }
    ]
  }
}
```

---

### Create Course (Admin Only)
**POST** `/api/v1/admin/courses`

Create a new course.

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Advanced Go Programming",
  "description": "Master advanced Go concepts",
  "category": "Programming",
  "duration_hours": 30,
  "difficulty": "advanced",
  "is_mandatory": false
}
```

**Response (201 Created):**
```json
{
  "code": 201,
  "message": "Course created successfully",
  "data": {
    "id": 6,
    "title": "Advanced Go Programming",
    "description": "Master advanced Go concepts",
    "category": "Programming",
    "duration_hours": 30,
    "difficulty": "advanced",
    "is_mandatory": false,
    "created_at": "2024-01-28T12:00:00Z"
  }
}
```

---

### Update Course (Admin Only)
**PUT** `/api/v1/admin/courses/{courseId}`

Update course details.

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Advanced Go Programming v2",
  "description": "Master advanced Go concepts - Updated"
}
```

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "Course updated successfully",
  "data": {
    "id": 6,
    "title": "Advanced Go Programming v2",
    "description": "Master advanced Go concepts - Updated",
    "updated_at": "2024-01-28T12:30:00Z"
  }
}
```

---

### Publish Course (Admin Only)
**POST** `/api/v1/admin/courses/{courseId}/publish`

Publish a course (make it visible to users).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "Course published successfully"
}
```

---

### Add Course Review
**POST** `/api/v1/courses/{courseId}/review`

Submit a review for a course.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Excellent course! Very informative and well structured."
}
```

**Response (201 Created):**
```json
{
  "code": 201,
  "message": "Review submitted successfully",
  "data": {
    "id": 15,
    "course_id": 1,
    "user_id": 1,
    "rating": 5,
    "comment": "Excellent course!",
    "created_at": "2024-01-28T12:00:00Z"
  }
}
```

---

## Enrollment Endpoints

### Enroll in Course
**POST** `/api/v1/courses/enroll`

Enroll the current user in a course.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "course_id": 1
}
```

**Response (201 Created):**
```json
{
  "code": 201,
  "message": "Enrollment successful",
  "data": {
    "id": 25,
    "user_id": 1,
    "course_id": 1,
    "status": "enrolled",
    "completion_percentage": 0,
    "enrolled_at": "2024-01-28T12:00:00Z",
    "completed_at": null
  }
}
```

**Status Codes:**
- `201 Created` - Successfully enrolled
- `400 Bad Request` - Already enrolled or course not found
- `409 Conflict` - User already enrolled in this course

---

### Get My Enrollments
**GET** `/api/v1/courses/my-enrollments?page=1`

Get all courses the current user is enrolled in.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (int, default: 1)
- `page_size` (int, default: 10)

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "Enrollments retrieved",
  "data": [
    {
      "id": 1,
      "title": "Go Programming Basics",
      "description": "Learn Go fundamentals",
      "category": "Programming",
      "duration_hours": 20,
      "difficulty": "beginner",
      "enrollment": {
        "id": 25,
        "status": "in_progress",
        "completion_percentage": 45,
        "enrolled_at": "2024-01-28T12:00:00Z"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "page_size": 10,
    "total": 5,
    "total_page": 1
  }
}
```

---

### Get In-Progress Courses
**GET** `/api/v1/courses/in-progress?page=1`

Get courses currently in progress.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** Same format as Get My Enrollments

---

### Get Completed Courses
**GET** `/api/v1/courses/completed?page=1`

Get completed courses.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** Same format as Get My Enrollments

---

### Get Mandatory Courses
**GET** `/api/v1/courses/mandatory?page=1`

Get mandatory courses for the user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** Same format as Get My Enrollments

---

## Progress Tracking Endpoints

### Track Video Progress
**POST** `/api/v1/progress/track`

Track user's video watch progress.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "course_id": 1,
  "lesson_id": 5,
  "watched_duration": 150,
  "total_duration": 600
}
```

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "Progress tracked successfully",
  "data": {
    "id": 10,
    "user_id": 1,
    "course_id": 1,
    "lesson_id": 5,
    "watched_percentage": 25,
    "watched_duration": 150,
    "total_duration": 600,
    "is_completed": false,
    "updated_at": "2024-01-28T12:00:00Z"
  }
}
```

**Note:** Lesson auto-completes when watched_percentage reaches 90%.

---

### Get Course Progress
**GET** `/api/v1/progress/course/{courseId}`

Get overall progress for a course.

**Headers:**
```
Authorization: Bearer <token>
```

**Path Parameters:**
- `courseId` (int) - Course ID

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "Course progress retrieved",
  "data": {
    "course_id": 1,
    "course_title": "Go Programming Basics",
    "total_lessons": 8,
    "completed_lessons": 3,
    "overall_percentage": 37.5,
    "lessons": [
      {
        "id": 1,
        "title": "Introduction to Go",
        "order": 1,
        "is_completed": true,
        "watched_percentage": 100
      },
      {
        "id": 2,
        "title": "Variables and Constants",
        "order": 2,
        "is_completed": true,
        "watched_percentage": 100
      },
      {
        "id": 3,
        "title": "Functions",
        "order": 3,
        "is_completed": false,
        "watched_percentage": 25
      }
    ]
  }
}
```

---

### Get Lesson Progress
**GET** `/api/v1/progress/lesson/{lessonId}`

Get detailed progress for a specific lesson.

**Headers:**
```
Authorization: Bearer <token>
```

**Path Parameters:**
- `lessonId` (int) - Lesson ID

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "Lesson progress retrieved",
  "data": {
    "lesson_id": 5,
    "lesson_title": "Error Handling",
    "watched_percentage": 60,
    "watched_duration": 360,
    "total_duration": 600,
    "is_completed": false,
    "materials": [
      {
        "id": 1,
        "type": "video",
        "title": "Error Handling Basics",
        "url": "https://example.com/video.mp4",
        "duration": 300
      }
    ]
  }
}
```

---

## Quiz Endpoints

### Start Quiz Attempt
**POST** `/api/v1/quiz/start`

Begin a quiz attempt.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "quiz_id": 3
}
```

**Response (201 Created):**
```json
{
  "code": 201,
  "message": "Quiz attempt started",
  "data": {
    "attempt_id": 42,
    "quiz_id": 3,
    "questions": [
      {
        "id": 15,
        "question": "What is Go's main feature?",
        "type": "multiple_choice",
        "options": [
          {
            "id": 1,
            "option": "Simple syntax"
          },
          {
            "id": 2,
            "option": "Built-in concurrency"
          },
          {
            "id": 3,
            "option": "All of the above"
          }
        ]
      }
    ],
    "started_at": "2024-01-28T12:00:00Z",
    "time_limit_seconds": 1800
  }
}
```

**Status Codes:**
- `201 Created` - Attempt started successfully
- `400 Bad Request` - Quiz not found or attempt limit exceeded
- `409 Conflict` - Already attempted maximum times

---

### Submit Quiz Attempt
**POST** `/api/v1/quiz/submit/{attemptId}`

Submit completed quiz with answers.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "quiz_id": 3,
  "answers": {
    "15": "3",
    "16": "true",
    "17": "Option B"
  },
  "time_spent": 450
}
```

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "Quiz submitted successfully",
  "data": {
    "attempt_id": 42,
    "quiz_id": 3,
    "score": 85,
    "total_marks": 100,
    "percentage": 85,
    "passed": true,
    "coins_awarded": 50,
    "submitted_at": "2024-01-28T12:30:00Z",
    "answers": [
      {
        "question_id": 15,
        "question": "What is Go's main feature?",
        "user_answer": "All of the above",
        "correct_answer": "All of the above",
        "is_correct": true
      }
    ]
  }
}
```

---

### Get Quiz Attempts
**GET** `/api/v1/quiz/{quizId}/attempts`

Get all attempts for a quiz by current user.

**Headers:**
```
Authorization: Bearer <token>
```

**Path Parameters:**
- `quizId` (int) - Quiz ID

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "Quiz attempts retrieved",
  "data": [
    {
      "attempt_id": 42,
      "quiz_id": 3,
      "attempt_number": 1,
      "score": 85,
      "percentage": 85,
      "passed": true,
      "submitted_at": "2024-01-28T12:30:00Z"
    },
    {
      "attempt_id": 43,
      "quiz_id": 3,
      "attempt_number": 2,
      "score": 90,
      "percentage": 90,
      "passed": true,
      "submitted_at": "2024-01-28T14:00:00Z"
    }
  ]
}
```

---

## Gamification Endpoints

### Get User Coins
**GET** `/api/v1/user/coins`

Get user's current coin balance.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "Coins retrieved",
  "data": {
    "user_id": 1,
    "total_coins": 450,
    "coins_earned": 500,
    "coins_spent": 50
  }
}
```

---

### Get Coin Transactions
**GET** `/api/v1/user/coins/transactions?page=1`

Get coin transaction history.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (int, default: 1)
- `page_size` (int, default: 10)

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "Transactions retrieved",
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "amount": 100,
      "type": "earn",
      "reason": "Course Completed",
      "source_type": "course",
      "source_id": 1,
      "created_at": "2024-01-28T12:00:00Z"
    },
    {
      "id": 2,
      "user_id": 1,
      "amount": 50,
      "type": "spend",
      "reason": "Certificate Download",
      "source_type": "certificate",
      "source_id": 5,
      "created_at": "2024-01-28T12:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "page_size": 10,
    "total": 25,
    "total_page": 3
  }
}
```

---

### Get User Badges
**GET** `/api/v1/user/badges`

Get all badges earned by user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "Badges retrieved",
  "data": [
    {
      "id": 1,
      "badge_id": 2,
      "badge_name": "Course Master",
      "badge_description": "Complete 5 courses",
      "level": "silver",
      "icon_url": "https://example.com/silver.png",
      "earned_at": "2024-01-28T12:00:00Z"
    },
    {
      "id": 2,
      "badge_id": 5,
      "badge_name": "Consistent Learner",
      "badge_description": "7-day learning streak",
      "level": "gold",
      "icon_url": "https://example.com/gold.png",
      "earned_at": "2024-01-28T10:00:00Z"
    }
  ]
}
```

---

### Get Leaderboard
**GET** `/api/v1/user/leaderboard?order_by=coins&limit=100`

Get leaderboard rankings.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `order_by` (string, default: "coins") - "coins", "learning_hours", or "streak"
- `limit` (int, default: 100) - Number of top users to return

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "Leaderboard retrieved",
  "data": [
    {
      "rank": 1,
      "user_id": 5,
      "full_name": "Alice Johnson",
      "department": "Engineering",
      "gmfc_coins": 850,
      "total_learning_hours": 120,
      "current_badge_level": "gold",
      "current_streak": 15
    },
    {
      "rank": 2,
      "user_id": 1,
      "full_name": "John Doe",
      "department": "Engineering",
      "gmfc_coins": 450,
      "total_learning_hours": 45,
      "current_badge_level": "silver",
      "current_streak": 7
    }
  ]
}
```

---

## Dashboard Endpoints

### Get User Dashboard
**GET** `/api/v1/dashboard`

Get comprehensive user dashboard with all statistics.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "Dashboard retrieved",
  "data": {
    "user_id": 1,
    "user_name": "John Doe",
    "total_coins": 450,
    "current_badge_level": "silver",
    "total_learning_hours": 45,
    "current_streak": 7,
    "leaderboard_rank": 2,
    "mandatory_courses": [
      {
        "id": 1,
        "title": "Go Programming Basics",
        "category": "Programming",
        "enrollment": {
          "status": "in_progress",
          "completion_percentage": 45
        }
      }
    ],
    "in_progress_courses": [
      {
        "id": 2,
        "title": "Web Development with Go",
        "category": "Web",
        "enrollment": {
          "status": "in_progress",
          "completion_percentage": 60
        }
      }
    ],
    "completed_courses": 3,
    "certificates": 3,
    "earned_badges": 5
  }
}
```

---

## User Management Endpoints

### Get User Profile
**GET** `/api/v1/user/profile/{userId}`

Get user's public profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Path Parameters:**
- `userId` (int) - User ID

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "User profile retrieved",
  "data": {
    "id": 1,
    "full_name": "John Doe",
    "department": "Engineering",
    "role": "learner",
    "total_learning_hours": 45,
    "gmfc_coins": 450,
    "current_badge_level": "silver",
    "courses_completed": 3,
    "certificates": 3
  }
}
```

---

### Get User Statistics
**GET** `/api/v1/user/stats`

Get authenticated user's statistics.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "User statistics retrieved",
  "data": {
    "total_courses_enrolled": 8,
    "total_courses_completed": 3,
    "total_learning_hours": 45,
    "average_quiz_score": 87.5,
    "total_coins_earned": 500,
    "total_coins_spent": 50,
    "current_coin_balance": 450,
    "badges_earned": 5,
    "certificates_earned": 3,
    "current_streak": 7,
    "longest_streak": 15
  }
}
```

---

## Admin Endpoints

### Get All Users (Admin Only)
**GET** `/api/v1/admin/users?page=1&role=learner`

Get all users with optional filtering.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `page` (int, default: 1)
- `page_size` (int, default: 10)
- `role` (string, optional) - Filter by role
- `search` (string, optional) - Search by email or name

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "Users retrieved",
  "data": [
    {
      "id": 3,
      "email": "learner1@lms.com",
      "first_name": "Learner",
      "last_name": "One",
      "full_name": "Learner One",
      "role": "learner",
      "department": "Sales",
      "gmfc_coins": 300,
      "total_learning_hours": 25,
      "courses_enrolled": 4,
      "created_at": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "page_size": 10,
    "total": 150,
    "total_page": 15
  }
}
```

---

### Get System Audit Logs (Admin Only)
**GET** `/api/v1/admin/audit-logs?page=1&action=login`

Get system audit logs for compliance.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `page` (int, default: 1)
- `action` (string, optional) - Filter by action type

**Response (200 OK):**
```json
{
  "code": 200,
  "message": "Audit logs retrieved",
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "user_email": "user@example.com",
      "action": "login",
      "resource": "auth",
      "description": "User logged in",
      "ip_address": "192.168.1.1",
      "status": "success",
      "created_at": "2024-01-28T12:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "page_size": 10,
    "total": 5000,
    "total_page": 500
  }
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "code": 400,
  "message": "Bad Request",
  "error": "Detailed error message"
}
```

### Common Error Codes

| Code | Message | Cause |
|------|---------|-------|
| 400 | Bad Request | Invalid input or malformed request |
| 401 | Unauthorized | Missing or invalid JWT token |
| 403 | Forbidden | Insufficient permissions for action |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Resource already exists or conflicting state |
| 422 | Unprocessable Entity | Validation error |
| 500 | Internal Server Error | Server error |

---

## Authentication

All protected endpoints require JWT token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Token expiration: 24 hours (configurable)

---

## Pagination

List endpoints support pagination with the following parameters:

- `page` - Page number (default: 1)
- `page_size` - Items per page (default: 10)

Pagination response includes:
```json
{
  "pagination": {
    "page": 1,
    "page_size": 10,
    "total": 100,
    "total_page": 10
  }
}
```

---

## Rate Limiting

Currently not implemented. Consider adding for production use.

---

## Versioning

All API endpoints use v1 versioning:
- Public endpoints: `/api/v1/public/*`
- Protected endpoints: `/api/v1/*`
- Admin endpoints: `/api/v1/admin/*`

---

## Testing the API

### Using cURL

**Register and Login:**
```bash
# Register
curl -X POST http://localhost:8080/api/v1/public/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "TestPass123!",
    "first_name": "Test",
    "last_name": "User"
  }'

# Login
curl -X POST http://localhost:8080/api/v1/public/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "TestPass123!"
  }'
```

**Using Token (Replace with actual token):**
```bash
curl -X GET http://localhost:8080/api/v1/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Best Practices

1. **Always include Authorization header** for protected endpoints
2. **Handle errors gracefully** with proper error codes
3. **Use pagination** for large result sets
4. **Validate input** before submission
5. **Store tokens securely** in client applications
6. **Implement token refresh** logic in your client
7. **Use HTTPS** in production

---

**Last Updated:** January 28, 2024
**API Version:** v1
**Status:** Active & Production Ready
