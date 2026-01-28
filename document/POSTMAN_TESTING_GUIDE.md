# Postman Collection - LMS Backend Testing Guide

Professional Postman collection for comprehensive testing of the LMS Backend API.

## 📋 Overview

This collection provides complete testing coverage for all LMS Backend endpoints including:
- Authentication & authorization
- Course management
- Enrollments & progress tracking
- Quiz & assessment system
- Gamification (coins, badges, leaderboard)
- Dashboard & reporting
- Admin operations

## 🚀 Quick Start

### 1. Import Collection & Environment

1. **Open Postman**
2. **Click** "Import" in the top-left
3. **Select** `LMS-Backend-Collection.postman_collection.json`
4. **Click** "Import"
5. **Repeat for environment:** `LMS-Backend-Environment.postman_environment.json`

### 2. Configure Environment

1. Click the **Environment** dropdown (top-right)
2. Select **"LMS Backend - Development Environment"**
3. Update base_url if needed (default: `http://localhost:8080`)
4. Set admin credentials if different

### 3. Start Testing

- Navigate to any request in the collection
- Click **Send**
- View the response and automated tests results

---

## 📂 Collection Structure

### 1. **Authentication** (5 endpoints)
Test user registration, login, and profile management.

**Key Endpoints:**
- `POST /api/v1/public/auth/register` - Register new user
- `POST /api/v1/public/auth/login` - Login and get JWT token
- `GET /api/v1/auth/me` - Get current user profile
- `PUT /api/v1/auth/profile` - Update profile
- `POST /api/v1/auth/change-password` - Change password

**Testing Flow:**
1. Register a new user
2. Login with credentials
3. Token is automatically saved to environment
4. Use token for subsequent authenticated requests

---

### 2. **Courses** (8 endpoints)
Complete course management including creation, search, and reviews.

**Key Endpoints:**
- `GET /api/v1/public/courses` - List all courses (paginated)
- `GET /api/v1/public/courses/search` - Search courses
- `GET /api/v1/public/courses/category/{category}` - Filter by category
- `GET /api/v1/public/courses/{id}` - Get course details with lessons
- `POST /api/v1/admin/courses` - Create new course (admin)
- `PUT /api/v1/admin/courses/{id}` - Update course (admin)
- `POST /api/v1/admin/courses/{id}/publish` - Publish course (admin)
- `POST /api/v1/courses/{id}/review` - Add course review

**Testing Tips:**
- Use public endpoints to browse available courses
- Course ID is automatically saved for use in other endpoints
- Admin endpoints require admin token

---

### 3. **Enrollments** (5 endpoints)
Manage course enrollments and enrollment statuses.

**Key Endpoints:**
- `POST /api/v1/courses/enroll` - Enroll in a course
- `GET /api/v1/courses/my-enrollments` - Get all enrollments
- `GET /api/v1/courses/in-progress` - Get in-progress courses
- `GET /api/v1/courses/completed` - Get completed courses
- `GET /api/v1/courses/mandatory` - Get mandatory courses

**Key Features:**
- Automatic coin rewards on enrollment
- Enrollment ID is saved for reference
- Status tracking: enrolled, in_progress, completed

---

### 4. **Progress Tracking** (3 endpoints)
Track video watch progress and course completion.

**Key Endpoints:**
- `POST /api/v1/progress/track` - Track video progress
- `GET /api/v1/progress/course/{id}` - Get overall course progress
- `GET /api/v1/progress/lesson/{id}` - Get lesson progress

**Important Details:**
- Video auto-completes at 90% watched
- Completion percentage calculated automatically
- Watched duration in seconds

---

### 5. **Quizzes & Assessments** (3 endpoints)
Quiz system with attempt management and automated grading.

**Key Endpoints:**
- `POST /api/v1/quiz/start` - Start a quiz attempt
- `POST /api/v1/quiz/submit/{attemptId}` - Submit quiz answers
- `GET /api/v1/quiz/{quizId}/attempts` - Get all attempts history

**Testing Workflow:**
1. Start quiz (attempt ID is saved)
2. Answer questions (match question IDs)
3. Submit answers
4. View score, percentage, and pass/fail status
5. Coins awarded automatically if passed

---

### 6. **Gamification** (4 endpoints)
Coins, badges, and leaderboard features.

**Key Endpoints:**
- `GET /api/v1/user/coins` - Get coin balance
- `GET /api/v1/user/coins/transactions` - View coin history
- `GET /api/v1/user/badges` - Get earned badges
- `GET /api/v1/user/leaderboard` - View rankings

**Coin System:**
- Earn coins: course completion, quiz passing
- View detailed transactions with reason and source
- Different coin values for different activities

**Leaderboard:**
- Sort by: coins, learning_hours, streak
- Shows rank, coins, badges, learning hours
- Real-time competitive rankings

---

### 7. **Dashboard** (1 endpoint)
Comprehensive user dashboard with all statistics.

**Key Endpoint:**
- `GET /api/v1/dashboard` - Get complete dashboard

**Dashboard Includes:**
- Mandatory courses (not yet started)
- In-progress courses with completion %
- Completed courses count
- Certificates earned
- Total coins & coin balance
- Current badge level
- Leaderboard rank
- Earned badges

---

### 8. **User Management** (2 endpoints)
User profiles and statistics.

**Key Endpoints:**
- `GET /api/v1/user/profile/{userId}` - Get user public profile
- `GET /api/v1/user/stats` - Get user statistics

**Available Statistics:**
- Courses enrolled, completed, in-progress
- Total learning hours
- Average quiz score
- Coins earned/spent
- Badges earned
- Current streak
- Learning streaks

---

### 9. **Admin Operations** (3 endpoints)
Admin-only endpoints for system management.

**Key Endpoints:**
- `GET /api/v1/admin/users` - List all users (with filtering)
- `GET /api/v1/admin/users?search=...` - Search users
- `GET /api/v1/admin/audit-logs` - System audit logs

**Admin Features:**
- Filter users by role
- Search users by email or name
- View audit trail for compliance
- Filter logs by action

---

### 10. **Test Workflow** (10 endpoints)
Complete end-to-end workflow for comprehensive testing.

**Automated Workflow:**
1. Register new test user (unique email generated)
2. Login and get token
3. Browse available courses
4. Enroll in a course
5. Track video progress
6. Start a quiz
7. Submit quiz answers
8. View updated dashboard
9. Check coins & badges
10. View leaderboard position

**Best for:**
- Full system validation
- New deployment testing
- Feature verification
- Performance testing

---

## 🔑 Authentication & Variables

### Environment Variables

| Variable | Purpose | Auto-Set | Notes |
|----------|---------|----------|-------|
| `base_url` | API base URL | No | Change if not localhost:8080 |
| `auth_token` | JWT token | Yes (on login) | Learner authentication |
| `admin_token` | Admin JWT token | No | Set manually before admin tests |
| `user_id` | Current user ID | Yes (on login) | Used for user-specific endpoints |
| `course_id` | Course ID | Yes | Saved from course retrieval |
| `enrollment_id` | Enrollment ID | Yes | Saved after enrollment |
| `attempt_id` | Quiz attempt ID | Yes | Saved when starting quiz |
| `test_email` | Test user email | Generated | Dynamic with timestamp |

### Getting Admin Token

1. **Login as admin:**
   - Email: `admin@lms.com`
   - Password: `admin@123`

2. **Copy returned token**

3. **Set environment variable:**
   ```
   admin_token = <copied_token>
   ```

Or set manually in environment settings.

---

## ✅ Automated Tests

Many requests include automated tests that:
- Verify HTTP status codes
- Validate response structure
- Check required fields
- Validate data types
- Save tokens and IDs automatically

### Test Results

After each request, check:
1. **Status Code** - Should be 2xx for success
2. **Response Body** - Verify structure matches documentation
3. **Tests Tab** - Green checkmarks indicate passing tests
4. **Console** - View detailed test output and saved variables

---

## 🧪 Common Testing Scenarios

### Scenario 1: New User Onboarding

1. Run "1. Register Test User"
2. Run "2. Login and Get Token"
3. Run "3. Browse Available Courses"
4. Run "4. Enroll in Course"
5. View response to confirm enrollment

### Scenario 2: Learning Progress

1. Start with authenticated user (token in environment)
2. Run "5. Track Video Progress" (watch 75% of lesson)
3. Run "Get Course Progress" to see updated completion
4. Track again with 95% (should auto-complete)

### Scenario 3: Quiz Assessment

1. Run "6. Start Quiz Attempt"
2. Note the attempt ID (saved automatically)
3. Run "7. Submit Quiz Attempt"
4. View score, percentage, and coins awarded
5. Run "Get Quiz Attempts" to see full history

### Scenario 4: Gamification

1. Ensure user has completed quizzes/courses
2. Run "Get User Coins" - view balance and breakdown
3. Run "Get Coin Transactions" - see earning history
4. Run "Get User Badges" - view earned badges
5. Run "Get Leaderboard" - see user's rank

### Scenario 5: Admin Management

1. Set admin_token in environment
2. Run "Get All Users (Admin)" - see all users
3. Run "Search Users (Admin)" - search by name/email
4. Run "Get System Audit Logs (Admin)" - view audit trail
5. Filter by action type

---

## 🐛 Troubleshooting

### Issue: 401 Unauthorized

**Cause:** Missing or invalid token

**Solution:**
1. Login again (run auth/login)
2. Check `auth_token` variable is set
3. Verify token hasn't expired
4. Check Authorization header in request

### Issue: 404 Not Found

**Cause:** Invalid resource ID

**Solution:**
1. First get list of resources (GET courses, users, etc.)
2. Copy valid ID from response
3. Update the URL parameter
4. Retry request

### Issue: 400 Bad Request

**Cause:** Invalid request data

**Solution:**
1. Check request body JSON format
2. Verify all required fields present
3. Validate data types (string vs number)
4. Check for typos in field names
5. View error message in response

### Issue: 403 Forbidden

**Cause:** Insufficient permissions

**Solution:**
1. Check current user role (GET /api/v1/auth/me)
2. Ensure using correct token for operation
3. Use admin_token for admin operations
4. Verify user has required role

### Issue: Connection Refused

**Cause:** Backend not running

**Solution:**
1. Verify backend is running: `go run cmd/main.go`
2. Check base_url is correct
3. Ensure PostgreSQL is running
4. Check for startup errors in terminal

---

## 💡 Best Practices

### Before Testing

1. ✅ Start the LMS backend server
2. ✅ Ensure PostgreSQL is running
3. ✅ Import both collection and environment
4. ✅ Select correct environment
5. ✅ Verify base_url is correct

### During Testing

1. ✅ Run requests in logical order
2. ✅ Use automatic test workflow for complete testing
3. ✅ Check test results in "Tests" tab
4. ✅ View response body in "Body" tab
5. ✅ Use environment variables for consistency

### Common Workflow

1. **Test Authentication First**
   - Ensures token system works
   - Validates user credentials

2. **Test Courses**
   - Verify courses exist
   - Test search/filter functionality

3. **Test Enrollments**
   - Enroll user in course
   - Verify enrollment status

4. **Test Progress**
   - Track video progress
   - Verify auto-completion

5. **Test Quizzes**
   - Start attempt
   - Submit answers
   - Verify grading

6. **Test Gamification**
   - Check coin balance
   - Verify badges
   - View leaderboard

7. **Test Dashboard**
   - Verify all metrics
   - Check aggregated data

---

## 📊 Performance Testing

### Load Testing with Runner

1. Click "Runner" button (top-left)
2. Select collection
3. Set iterations: 100
4. Click "Run"
5. Monitor response times and success rate

### Network Performance

- Enable Postman Interceptor
- Check request/response sizes
- Monitor for slow endpoints
- Profile database queries

---

## 📝 Notes

- **Token Expiration:** 24 hours (configurable)
- **Pagination:** Default 10 items per page
- **Timeout:** 5 seconds per request
- **Rate Limiting:** Not implemented (add in production)
- **CORS:** Enabled for development

---

## 🔄 Continuous Integration

### Export Results

1. Run complete workflow
2. Click "..." menu
3. Select "Export Results"
4. Save as JSON report

### CI/CD Integration

```bash
# Run collection with Newman (CLI)
npm install -g newman

newman run \
  LMS-Backend-Collection.postman_collection.json \
  -e LMS-Backend-Environment.postman_environment.json \
  --reporters cli,json \
  --reporter-json-export results.json
```

---

## 📞 Support

For issues or questions:
1. Check error message in response body
2. Review API documentation (API_REFERENCE.md)
3. Check Postman console for detailed logs
4. Verify environment variables are set
5. Test with manual curl command

---

**Last Updated:** January 28, 2026  
**Collection Version:** 1.0  
**API Version:** v1  
**Status:** Production Ready
