# Module 2: LMS (Learner Experience) - User Requirements

## Document Information
- **Document Version**: 1.0
- **Date**: January 28, 2026
- **Project Name**: Web-Based Training Platform LMS
- **Module**: Module 2 - LMS (Learner Experience)
- **Technology Stack**: ReactJS, React Query, Tailwind CSS, TypeScript
- **Color Theme**: Crimson Red (#DC143C) and White (#FFFFFF)

---

## Table of Contents
1. [Module Overview](#module-overview)
2. [User Roles](#user-roles)
3. [User Requirements](#user-requirements)
4. [Non-Functional Requirements](#non-functional-requirements)
5. [Technical Stack](#technical-stack)
6. [UI/UX Requirements](#uiux-requirements)

---

## Module Overview

### Purpose
The LMS frontend module is designed to provide an intuitive and engaging interface for learners to access training content, track progress, complete assessments, and earn certifications with built-in gamification and progress tracking capabilities.

### Target Users
- **Learner / Employee**: Primary user who takes courses, completes quizzes, tracks progress
- **HC Admin**: Monitors learner progress (covered in Reporting module)
- **Reporting Viewer**: Views reports (covered in Reporting module)

### Design Philosophy
- **Color Theme**: Red and white (#DC143C Crimson Red with #FFFFFF White)
- **UI/UX Style**: Modern, clean, inspired by Udemy (clean, card-based design, generous white space)
- **Responsiveness**: Fully responsive design for desktop, tablet, and mobile devices
- **Accessibility**: WCAG 2.1 AA compliant

---

## User Roles

### Learner/Employee
**Primary user of the LMS module**

**Responsibilities:**
- Browse and enroll in assigned courses
- Watch course videos and access materials
- Complete quizzes and assessments
- Track personal learning progress
- Earn GMFC Coins and badges
- Download certificates
- Manage notification preferences

**Access Level:**
- Full access to personal learning dashboard
- Access to assigned courses and learning paths
- View personal progress and achievements
- Cannot access other learners' data
- Cannot access reporting/admin features

---

## User Requirements

### UR-LMS-001: User Authentication and Authorization
**Priority**: High
**User Role**: Learner/Employee

**Description:**
The system must provide secure authentication and role-based access control for learners to access their personalized learning dashboard and course content.

**Functional Requirements:**
- Support for Single Sign-On (SSO) integration with corporate identity providers
- JWT token-based authentication for API requests
- Session management with automatic token refresh
- Role-based access control (Learner, HC Admin, Reporting Viewer)
- Secure logout functionality with token invalidation
- Remember me functionality for convenience
- Password reset capability (if not using SSO)
- Multi-factor authentication support (optional)

**Technical Implementation:**
- **ReactJS**:
  - Custom authentication context using React Context API and hooks
  - Protected route components with authentication checks
  - Automatic redirect to login for unauthenticated users
- **TypeScript**:
  - Type-safe authentication state and user profile interfaces
  - Enum for user roles and permissions
- **React Query**:
  - Automatic token refresh with query interceptors
  - Mutation for login/logout operations
  - Cache management for user session
- **Tailwind**:
  - Styled login/logout UI components with responsive design
  - Form validation styling

**Acceptance Criteria:**
- ✓ Users can log in using corporate credentials via SSO
- ✓ JWT tokens are automatically refreshed before expiration
- ✓ Unauthorized users are redirected to login page
- ✓ Session persists across browser tabs
- ✓ Logout clears all authentication data and invalidates tokens
- ✓ Login page is responsive on all devices
- ✓ Authentication errors are clearly communicated to users

---

### UR-LMS-002: User Dashboard
**Priority**: High
**User Role**: Learner/Employee

**Description:**
A comprehensive dashboard that displays the learner's training overview, including mandatory learning paths, ongoing courses, progress summaries, training history, GMFC Coins balance, and achievement badges.

**Functional Requirements:**
- **Mandatory Learning Paths Display:**
  - List all assigned learning paths with completion status
  - Visual indicators for mandatory vs. optional paths
  - Due dates with countdown for mandatory paths
  - Priority ordering (earliest deadline first)
- **Ongoing Courses Section:**
  - Carousel or grid layout of courses in progress
  - Progress indicators (0-100%) with color coding
  - "Continue" button to resume from last position
  - Estimated time remaining
  - Last accessed date/time
- **Progress Summary:**
  - Overall completion percentage across all courses
  - Visual representations (progress bars, pie charts)
  - Real-time updates when course activities are completed
- **Training History:**
  - Timeline or list of completed courses
  - Completion dates and final scores
  - Filter options (by date, category, score)
  - Search functionality
  - Links to certificates and course details
- **GMFC Coins Display:**
  - Prominent coin balance with animated counter
  - Recent coin transactions (earned/spent)
  - Tooltip explaining earning rules
  - Link to full transaction history
- **Badge/Level Display:**
  - Current badge level with visual representation
  - Progress to next badge level
  - Showcase of earned badges
  - Badge requirements on hover
- **Quick Stats Widget:**
  - Total courses completed
  - Total learning hours
  - Current learning streak
  - Leaderboard position (if enabled)
- **Responsive Layout:**
  - Desktop: Multi-column grid layout
  - Tablet: 2-column layout
  - Mobile: Single-column stacked layout

**Technical Implementation:**
- **ReactJS**:
  - Functional components with React hooks (useState, useEffect, useMemo)
  - Custom hooks for dashboard data management (useDashboard, useProgress)
  - Lazy loading for performance optimization
  - React.memo for preventing unnecessary re-renders of stat widgets
  - Component composition for modular dashboard sections
- **TypeScript**:
  - Strict typing for dashboard data models
  - Interface definitions for Course, LearningPath, ProgressMetrics
  - Type-safe props for all dashboard components
  - Enum for course status types
- **React Query**:
  - Parallel data fetching for dashboard sections (useQueries)
  - Automatic background refetch for real-time updates (refetchInterval: 30s)
  - Optimistic updates for instant UI feedback on actions
  - Cache invalidation strategies on course completion
  - Prefetching for anticipated navigation (course details on hover)
- **Tailwind**:
  - Grid and flexbox layouts for responsive design (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
  - Custom color scheme (bg-primary-red, text-primary-dark)
  - Card components with hover effects (hover:shadow-lg transition-shadow)
  - Responsive breakpoints (sm:, md:, lg:, xl:, 2xl:)
  - Custom animations for progress bars and coin counter (animate-pulse, transition-all)

**Acceptance Criteria:**
- ✓ Dashboard loads within 2 seconds on broadband connection
- ✓ All mandatory learning paths are displayed with accurate status
- ✓ Progress percentages update in real-time when activities are completed
- ✓ GMFC Coins counter animates smoothly when balance changes
- ✓ Responsive design works seamlessly on desktop (1920px), tablet (768px), and mobile (375px)
- ✓ Data refreshes automatically every 30 seconds without user action
- ✓ Clicking on any card navigates to the appropriate detail page
- ✓ Loading states display skeletons, not blank screens

---

### UR-LMS-003: Learning Path Management
**Priority**: High
**User Role**: Learner/Employee

**Description:**
Learners must be able to view, navigate, and track their assigned learning paths, understanding which courses are mandatory and their completion priorities.

**Functional Requirements:**
- **Learning Path Display:**
  - List all assigned learning paths (mandatory and optional)
  - Path title, description, and overview
  - Total number of courses in each path
  - Overall path completion percentage
  - Estimated total duration
- **Visual Indicators:**
  - Badges to distinguish mandatory from optional paths
  - Color-coded status indicators (not started, in progress, completed)
  - Progress bars showing path completion
- **Due Date Management:**
  - Display due dates for mandatory paths
  - Countdown timer for approaching deadlines
  - Visual alerts for overdue paths (red indicator)
  - Warning for paths due within 7 days (orange indicator)
- **Priority Ordering:**
  - Automatic sorting by deadline (earliest first)
  - Overdue paths appear at the top
  - Option to sort by name, progress, or date assigned
- **Navigation:**
  - Click path card to view detailed path page
  - Path detail shows all courses with individual progress
  - Start/Continue buttons for each course
  - Sequential course navigation (if enforced)
- **Path Completion:**
  - Certificate generation upon completing all courses in path
  - Completion notification and celebration
  - Path moves to "Completed" section

**Technical Implementation:**
- **ReactJS**:
  - LearningPathList component with sorting and filtering
  - LearningPathCard component with progress visualization
  - LearningPathDetail page with nested course list
  - Nested routing with React Router (path/:pathId/course/:courseId)
  - Context provider for learning path state management
  - Custom hooks for path progress calculation (usePathProgress)
- **TypeScript**:
  - LearningPath interface with nested Course array
  - PathProgress interface with completion metrics
  - PathStatus enum ('not_started', 'in_progress', 'completed', 'overdue')
  - PathPriority enum for sorting
- **React Query**:
  - Query for fetching learning paths (/api/learning-paths)
  - Query for individual path details (/api/learning-paths/:id)
  - Mutation for updating path progress
  - Selective query invalidation on course completion
  - Optimistic updates for immediate UI feedback
- **Tailwind**:
  - Timeline component for path visualization
  - Badge components (bg-red-500 for mandatory, bg-blue-500 for optional)
  - Color-coded progress indicators:
    - Red (overdue): bg-red-500
    - Orange (due soon): bg-orange-500
    - Green (on track): bg-green-500
  - Card layouts with hover effects

**Acceptance Criteria:**
- ✓ All assigned learning paths are visible on dashboard
- ✓ Mandatory paths are clearly distinguished with red "MANDATORY" badge
- ✓ Due dates are prominently displayed with countdown
- ✓ Paths are automatically sorted by deadline priority
- ✓ Clicking a path navigates to its detail page within 500ms
- ✓ Progress updates immediately when a course in the path is completed
- ✓ Overdue paths are visually highlighted in red
- ✓ Path completion triggers certificate generation

---

### UR-LMS-004: Course Player
**Priority**: High
**User Role**: Learner/Employee

**Description:**
An interactive video player that allows learners to consume course content, including video lessons, supplementary materials, and navigation controls, with automatic progress tracking.

**Functional Requirements:**
- **Video Playback:**
  - HTML5 video playback with adaptive bitrate streaming
  - Standard controls: play/pause, volume, mute/unmute, fullscreen
  - Playback speed adjustment (0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x)
  - Video quality selection (360p, 480p, 720p, 1080p)
  - Scrubbing with video preview thumbnails on hover
  - Current time and total duration display
  - Remaining time display
- **Auto-Save Progress:**
  - Save video position every 30 seconds automatically
  - Save on pause event
  - Save on page navigation or browser close
  - Visual confirmation toast when progress is saved
  - Resume from last saved position on return
  - Sync progress across devices
- **Supplementary Materials:**
  - Sidebar or tab for course materials
  - List of PDFs, PPTs, and other documents
  - File name, type, and size display
  - One-click download buttons
  - PDF preview modal before download
  - Batch download option (download all materials as zip)
  - Materials unlock based on progress (some locked until milestones reached)
- **Course Navigation:**
  - Collapsible sidebar with course outline
  - Module and lesson hierarchy
  - Current lesson highlighted
  - Completion checkmarks for finished lessons
  - Next/Previous lesson buttons
  - Skip to any lesson (if allowed by course settings)
- **Additional Features:**
  - Closed captions/subtitles support (multiple languages)
  - Picture-in-picture mode for multitasking
  - Keyboard shortcuts:
    - Space: Play/Pause
    - Left/Right Arrow: Seek backward/forward 5 seconds
    - Up/Down Arrow: Volume control
    - F: Fullscreen toggle
    - M: Mute toggle
    - C: Toggle captions
  - Bookmark/save position feature
  - Chapter markers on progress bar
  - Notes section for learner annotations

**Technical Implementation:**
- **ReactJS**:
  - Custom VideoPlayer component using HTML5 Video API
  - useRef for video element manipulation
  - useEffect for progress tracking and auto-save
  - Custom hooks for video state management:
    - useVideoPlayer (playing, currentTime, duration, volume)
    - useVideoProgress (auto-save logic)
  - Debouncing for progress save operations (debounce time: 3 seconds)
  - CourseOutline sidebar component with expand/collapse
  - MaterialsList component with download functionality
  - KeyboardShortcuts hook for handling key events
- **TypeScript**:
  - VideoState interface (playing, paused, buffering, ended)
  - VideoProgress interface (currentTime, duration, percentage)
  - CourseMaterial interface (id, name, type, url, size, locked)
  - CourseStructure interface (modules, lessons, chapters)
  - Enum for video quality settings
- **React Query**:
  - Query for fetching course content (/api/courses/:id)
  - Query for fetching materials (/api/courses/:id/materials)
  - Mutation for saving video progress with optimistic updates
  - Background refetch for real-time sync across devices
  - Offline queue for progress saves (mutations are queued when offline)
  - Query for fetching subtitle tracks
- **Tailwind**:
  - Custom video player UI with overlay controls
  - Sidebar layout (w-1/4 on desktop, full-width drawer on mobile)
  - Progress bar styling with chapter markers
  - Responsive video container (aspect-ratio-16/9)
  - Hover effects for controls and thumbnails
  - Material cards with download icons

**Acceptance Criteria:**
- ✓ Video plays smoothly without buffering on 5 Mbps connection
- ✓ Progress is saved every 30 seconds automatically
- ✓ Video resumes from last saved position (within 1 second accuracy)
- ✓ All playback controls function correctly across browsers
- ✓ Materials are downloadable with single click
- ✓ Keyboard shortcuts work as expected
- ✓ Picture-in-picture mode works on Chrome, Safari, Edge
- ✓ Responsive design adapts to mobile (portrait and landscape)
- ✓ Auto-save works even when navigating away quickly
- ✓ Captions/subtitles display correctly when enabled

---

### UR-LMS-005: Quiz and Assessment System
**Priority**: High
**User Role**: Learner/Employee

**Description:**
A comprehensive quiz system supporting multiple question types with automatic grading, retry attempts, and immediate feedback for learner assessment.

**Functional Requirements:**
- **Question Types:**
  1. **Multiple Choice (Single Answer)**:
     - Radio button selection
     - 2-6 options per question
     - Immediate feedback (optional)
  2. **Multiple Choice (Multiple Answers)**:
     - Checkbox selection
     - Select all that apply
     - Partial credit option
  3. **True/False**:
     - Two radio buttons
     - Clear visual distinction
  4. **Matching**:
     - Drag-and-drop interface
     - Or dropdown selection for each item
     - Visual feedback during drag
     - Match items from two columns
  5. **Short Answer**:
     - Text input field
     - Character limit specification
     - Auto-grading (keyword matching) or manual grading
     - Case sensitivity option
  6. **Fill in the Blanks**:
     - Multiple blank inputs within sentence
     - Case-sensitive/insensitive options
     - Auto-grading with exact or fuzzy matching
  7. **Essay Questions**:
     - Rich text editor (bold, italic, lists, etc.)
     - Word count display
     - File attachment option (PDFs, documents)
     - Manual grading required

- **Quiz Configuration:**
  - Configurable number of retry attempts (e.g., 3 attempts, unlimited)
  - Passing grade threshold (e.g., 70%)
  - Time limit per quiz (countdown timer)
  - Question randomization (different order per attempt)
  - Randomized question pool (select N questions from larger pool)
  - Allow review before submission
  - Show/hide correct answers after submission

- **Quiz Flow:**
  - Quiz instructions page (time limit, passing score, attempts, rules)
  - "Start Quiz" button to begin
  - Questions presented one-per-page or all-at-once (configurable)
  - Navigation between questions (if multi-page)
  - "Mark for Review" flag for uncertain questions
  - Progress indicator (Question X of Y)
  - "Submit Quiz" button with confirmation dialog
  - Auto-submit when time expires

- **Grading System:**
  - **Automatic Grading** for:
    - Multiple choice (single and multiple answers)
    - True/False
    - Matching
    - Fill in the blanks (exact match or keyword matching)
  - **Manual Grading** interface for:
    - Short answer (if not auto-graded)
    - Essay questions
    - Manual review with rubric support
    - Feedback comments field
  - **Score Display**:
    - Total score (points and percentage)
    - Pass/fail status with clear visual feedback
    - Correct/incorrect breakdown
    - Detailed answer review with explanations
    - Question-level performance

- **Retry Logic:**
  - Display remaining attempts (e.g., "Attempt 2 of 3")
  - Cooldown period between attempts (optional, e.g., 1 hour)
  - Different question set on retry (from question pool)
  - Best score tracking (record highest score)
  - Attempt history accessible from profile

- **Feedback and Review:**
  - Immediate feedback after submission (for objective questions)
  - Show correct answers with explanations
  - Review incorrect answers
  - Performance analysis (topics where learner struggled)
  - Recommendations for review materials

**Technical Implementation:**
- **ReactJS**:
  - Quiz component with state management (current question, answers, timer)
  - Component for each question type:
    - MultipleChoiceQuestion (radio/checkbox)
    - TrueFalseQuestion
    - MatchingQuestion (with react-beautiful-dnd or react-dnd)
    - ShortAnswerQuestion
    - FillInBlanksQuestion
    - EssayQuestion (with Draft.js or Quill.js rich text editor)
  - QuizTimer component with countdown
  - QuizNavigation component (question list, mark for review)
  - QuizReview component showing all questions before submit
  - QuizResults component with detailed feedback
  - Form state management using controlled components
  - Quiz context provider for shared state across components
  - Custom hooks:
    - useQuiz (quiz state, navigation, submission)
    - useTimer (countdown logic with auto-submit)
    - useQuizAnswers (answer state management)
- **TypeScript**:
  - Question type discriminated union:
    ```typescript
    type Question =
      | MultipleChoiceQuestion
      | TrueFalseQuestion
      | MatchingQuestion
      | ShortAnswerQuestion
      | FillInBlanksQuestion
      | EssayQuestion;
    ```
  - QuizAttempt interface (attemptNumber, score, answers, timestamp)
  - QuizResult interface (score, passed, feedback, attemptNumber)
  - Type-safe validation schemas for each question type
  - Generic types for quiz responses
- **React Query**:
  - Query for fetching quiz questions (/api/quizzes/:id)
  - Mutation for submitting quiz answers
  - Mutation for auto-save quiz progress (debounced every 30 seconds)
  - Optimistic updates for immediate feedback
  - Query invalidation on quiz completion (update course progress)
  - Retry configuration for network failures
- **Tailwind**:
  - Form styling with consistent design system
  - Radio buttons and checkboxes with custom styling
  - Drag-and-drop zones with visual feedback (border-dashed, bg-blue-50)
  - Timer display with animated countdown (text-red-500 when < 5 min)
  - Results page with color-coded feedback:
    - Green for correct answers (bg-green-50)
    - Red for incorrect (bg-red-50)
    - Green banner for pass (bg-green-500)
    - Red banner for fail (bg-red-500)
  - Progress indicator for multi-page quizzes
  - Mobile-responsive form layouts

**Acceptance Criteria:**
- ✓ All question types render correctly and accept valid input
- ✓ Quiz timer counts down accurately and auto-submits at 0:00
- ✓ Answers are auto-saved every 30 seconds to prevent data loss
- ✓ Immediate grading for objective questions upon submission (< 2 seconds)
- ✓ Score and pass/fail status displayed clearly with visual indicators
- ✓ Retry option available if attempts remain and cooldown period has passed
- ✓ Detailed review shows correct/incorrect answers with explanations
- ✓ Quiz submission completes within 2 seconds
- ✓ Randomized questions on retry attempts (no duplicate sets)
- ✓ Drag-and-drop works smoothly on touch devices (mobile/tablet)
- ✓ Rich text editor works for essay questions with formatting preserved
- ✓ File attachments upload successfully (<10MB limit)

---

### UR-LMS-006: Certificate Generator
**Priority**: Medium
**User Role**: Learner/Employee

**Description:**
Automatic generation of professional certificates upon successful course/learning path completion, with download and sharing capabilities.

**Functional Requirements:**
- **Certificate Generation:**
  - Automatic generation upon meeting completion criteria:
    - All course modules completed (100%)
    - Post-course quiz passed (≥ passing grade)
    - All mandatory activities completed
  - Instant generation (< 3 seconds)
  - Unique certificate ID for each certificate
  - Tamper-proof digital signature (hash verification)

- **Certificate Template:**
  - Professional design matching brand (red and white theme)
  - **Required Fields**:
    - User's full name (from profile)
    - Course/Learning Path title
    - Completion date (formatted: Month DD, YYYY)
    - Unique certificate number/ID (e.g., CERT-2026-001234)
  - **Optional Fields**:
    - Course duration (e.g., "10 hours")
    - Final quiz score/grade (e.g., "95%" or "A")
    - Instructor signature (digital image)
    - Organization logo
    - Accreditation information (if applicable)
    - QR code for verification

- **Certificate Display:**
  - View certificate in-app (modal or dedicated page)
  - Full-screen preview mode
  - High-resolution rendering
  - Print-friendly layout

- **Download Options:**
  - Download as PDF (high quality, 300 DPI)
  - "Download Certificate" button triggers generation
  - Option to email certificate to self or manager
  - Automatic filename: "Certificate_[CourseName]_[Date].pdf"

- **Certificate Library:**
  - "My Certificates" section in user profile
  - Grid or list view of all earned certificates
  - Thumbnail previews
  - Filter by date, course, or category
  - Search functionality
  - Sort by date earned (newest first)
  - Re-download capability for any certificate
  - Bulk download option (download all as zip)

- **Sharing:**
  - Share on social media:
    - LinkedIn (with pre-filled post)
    - Twitter (with hashtags)
    - Facebook
  - Email to contacts
  - Copy certificate link for sharing
  - Generate shareable verification link

- **Verification System:**
  - Public verification page (/verify/[certificateId])
  - Anyone can verify certificate authenticity
  - Displays: Certificate ID, learner name, course, date, validity
  - QR code on certificate for quick verification
  - Tamper detection (invalid if certificate data modified)

**Technical Implementation:**
- **ReactJS**:
  - Certificate component for display and preview
  - CertificateTemplate component with dynamic data injection
  - CertificateModal for full-screen preview
  - CertificateLibrary component (grid/list view with filtering)
  - ShareButtons component (social media integration)
  - DownloadButton with loading states
  - VerificationPage component for public verification
- **TypeScript**:
  - Certificate interface:
    ```typescript
    interface Certificate {
      id: string;
      certificateNumber: string;
      userId: string;
      userName: string;
      courseId: string;
      courseTitle: string;
      completionDate: Date;
      issuedDate: Date;
      score?: number;
      duration?: number;
      instructorSignature?: string;
      organizationLogo?: string;
      verificationHash: string;
    }
    ```
  - Validation for certificate data completeness
  - Type-safe PDF generation parameters
- **React Query**:
  - Query for fetching user certificates (/api/certificates)
  - Mutation for triggering certificate generation
  - Query for individual certificate (/api/certificates/:id)
  - Cache management for certificate images
  - Mutation for email delivery
- **PDF Generation**:
  - **Client-side option**:
    - jsPDF library for PDF generation
    - html2canvas for rendering HTML to image first
  - **Server-side option** (recommended for quality):
    - API endpoint returns PDF blob
    - Puppeteer or similar for PDF rendering
  - Template-based design with dynamic data injection
  - Embed fonts for consistent rendering
  - Generate QR code with qrcode.react or qr-code library
- **Tailwind**:
  - Certificate template styling (print-friendly CSS)
  - Print media queries (@media print)
  - Modal design for certificate preview (fixed, inset-0, z-50)
  - Grid layout for certificate library (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
  - Responsive certificate viewer
  - Share buttons with social media brand colors

**Acceptance Criteria:**
- ✓ Certificate generates automatically upon course completion with passing grade
- ✓ Certificate includes all required fields with accurate data
- ✓ PDF downloads are high-quality and print-ready (300 DPI, A4 size)
- ✓ Certificate ID is unique and follows format (e.g., CERT-2026-001234)
- ✓ Certificates are accessible from user profile "My Certificates" section
- ✓ Share functionality works for LinkedIn (opens share dialog) and Twitter
- ✓ Certificate template matches brand design (Crimson Red #DC143C and White)
- ✓ PDF generation completes within 3 seconds
- ✓ Re-download of existing certificates loads instantly from cache
- ✓ Verification page correctly validates certificate authenticity
- ✓ QR code on certificate scans and redirects to verification page
- ✓ Email delivery sends certificate within 1 minute

---

### UR-LMS-007: Progress Tracking
**Priority**: High
**User Role**: Learner/Employee

**Description:**
Comprehensive tracking system allowing learners to monitor their learning progress, quiz performance, completed courses, and overall achievements.

**Functional Requirements:**
- **Course-Level Tracking:**
  - Overall completion percentage per course (0-100%)
  - Module/lesson completion status (completed, in progress, not started)
  - Time spent per course (tracked in minutes/hours)
  - Last accessed date/time
  - Videos watched vs. total videos
  - Materials downloaded count
  - Quizzes completed vs. total quizzes
  - Current position in course (lesson name)
  - Estimated time to completion

- **Quiz Performance Tracking:**
  - **Per Quiz**:
    - Score achieved (points and percentage)
    - Pass/fail status
    - Time taken to complete
    - Number of attempts used
    - Best score across all attempts
    - Date of each attempt
  - **Question-Level Performance**:
    - Correct/incorrect per question
    - Topics/skills assessed per question
    - Common mistakes
  - **Historical Performance**:
    - All quiz attempts history (chronological)
    - Performance trends over time (improving/declining)
    - Score improvements between attempts
    - Identification of difficult topics (consistently missed questions)
    - Average quiz score across all courses

- **Aggregate Tracking:**
  - Total courses enrolled
  - Total courses completed
  - Courses in progress (count)
  - Overall completion rate (completed/enrolled %)
  - Average time per course
  - Total learning hours (all-time)
  - Learning streaks:
    - Current streak (consecutive days with activity)
    - Longest streak
    - Weekly activity count
  - GMFC Coins earned (total and by source)
  - Badges unlocked (total count)

- **Leaderboard** (Optional):
  - **Ranking Categories**:
    - Overall points (GMFC Coins)
    - Monthly top performers
    - Course-specific rankings
    - Department/team rankings
  - **Display**:
    - Top 10/20/50 users
    - User's current rank (e.g., "#47 of 500")
    - Points/score next to each user
    - Movement indicators (↑↓ arrows showing rank change)
    - Percentage difference from next rank
  - **Privacy Settings**:
    - Opt-in/opt-out of leaderboard
    - Display name vs. real name option
    - Anonymous ranking option (show as "User #123")
    - Private profile (hide from searches)

- **Analytics Dashboard:**
  - **Visual Charts and Graphs**:
    - Line chart: Progress trend over time (last 30/60/90 days)
    - Bar chart: Quiz scores across all courses
    - Pie chart: Completion distribution (completed, in progress, not started)
    - Gauge chart: Overall progress toward completion goal
    - Heatmap: Learning activity calendar (GitHub-style)
  - **Performance Comparison**:
    - Compare personal stats with peer averages
    - Department average comparison
    - Top performers comparison
  - **Strengths and Weaknesses Analysis**:
    - Identify strong topics (consistently high scores)
    - Identify weak topics (consistently low scores)
    - Suggested areas for improvement
  - **Recommended Courses**:
    - Based on performance in related courses
    - Based on role/department
    - Based on incomplete learning paths

- **Progress Notifications:**
  - Milestone achievements (25%, 50%, 75%, 100% completion)
  - Personal records (fastest course completion, highest score)
  - Streak achievements (7 days, 30 days, 100 days)
  - Ranking improvements

**Technical Implementation:**
- **ReactJS**:
  - ProgressDashboard component with multiple sections
  - ProgressTracker component per course with visual indicators
  - QuizPerformance component with history table
  - Leaderboard component with ranking table
  - AnalyticsCharts component with multiple chart types
  - StreakCounter component with animated numbers
  - ActivityHeatmap component (similar to GitHub contribution graph)
  - Custom hooks:
    - useProgress (course and overall progress data)
    - useQuizHistory (quiz attempts and scores)
    - useLeaderboard (ranking data with real-time updates)
    - useAnalytics (aggregated statistics and trends)
  - Real-time updates using WebSocket or polling (for leaderboard)
  - Animated counters for stats (CountUp.js or custom)
  - Smooth transitions for chart data changes
- **TypeScript**:
  - Progress interface:
    ```typescript
    interface CourseProgress {
      courseId: string;
      completionPercentage: number;
      lessonsCompleted: number;
      totalLessons: number;
      timeSpent: number; // minutes
      lastAccessed: Date;
      status: 'not_started' | 'in_progress' | 'completed';
    }
    ```
  - QuizAttempt interface
  - LeaderboardEntry interface
  - AnalyticsData interface
  - Type-safe data aggregation functions
  - Enum for tracking event types
- **React Query**:
  - Queries for fetching progress data:
    - /api/progress (overall)
    - /api/progress/course/:id (per course)
    - /api/quiz-history (all attempts)
    - /api/leaderboard (rankings)
    - /api/analytics (aggregated data)
  - Background refetch for real-time leaderboard updates (refetchInterval: 5 minutes)
  - Stale time configuration for optimized caching
  - Parallel queries for dashboard sections (useQueries)
  - Optimistic updates for immediate feedback
  - Infinite query for paginated quiz history
- **Charting Library**:
  - Recharts (recommended) or Chart.js for data visualization
  - **Chart Types**:
    - LineChart for progress trends (with gradient fill)
    - BarChart for quiz scores (with color coding)
    - PieChart for completion distribution
    - RadialBarChart/Gauge for overall progress
    - Heatmap for activity calendar (custom or library)
  - Responsive charts (adapt to container size)
  - Interactive tooltips on hover
  - Animated transitions between data updates
- **Tailwind**:
  - Dashboard grid layout (grid-cols-1 lg:grid-cols-3 gap-6)
  - Chart containers with consistent styling (bg-white rounded-lg shadow p-6)
  - Progress bars with color coding:
    - Red (0-30%): bg-red-500
    - Orange (31-70%): bg-orange-500
    - Yellow (71-99%): bg-yellow-500
    - Green (100%): bg-green-500
  - Leaderboard table with alternating row colors (even:bg-gray-50)
  - Stats cards with icons and visual hierarchy
  - Responsive breakpoints for mobile optimization
  - Animated elements (transition-all duration-300)

**Acceptance Criteria:**
- ✓ Progress updates immediately after course/quiz completion (< 1 second)
- ✓ All tracking metrics display accurate real-time data
- ✓ Analytics dashboard loads within 2 seconds
- ✓ Charts are interactive (hover tooltips, clickable legends)
- ✓ Charts are responsive and display correctly on mobile
- ✓ Leaderboard updates every 5 minutes automatically
- ✓ Privacy settings are respected (opt-out users not shown on leaderboard)
- ✓ Historical data is retained and accessible (no data loss)
- ✓ Streak counter increments correctly for consecutive learning days
- ✓ Activity heatmap accurately reflects daily learning activity
- ✓ Quiz history shows all attempts with filtering options
- ✓ Performance comparison with peers displays accurate averages

---

### UR-LMS-008: Notification System
**Priority**: Medium
**User Role**: Learner/Employee

**Description:**
A comprehensive notification system to keep learners informed about course deadlines, new content, achievements, and reminders for incomplete courses.

**Functional Requirements:**
- **Notification Types:**
  1. **Course Reminders**:
     - Incomplete courses (triggered after 7 days of inactivity)
     - Courses started but not completed
     - Mandatory courses approaching deadline (7 days, 3 days, 1 day before)
     - Courses with low progress (< 30% after 14 days)
     - Abandoned courses (no activity in 30 days)

  2. **New Content Notifications**:
     - New course availability
     - New courses assigned to user
     - Recommended courses based on role/interests
     - Updated course content (if re-taking required)
     - New learning paths assigned

  3. **Achievement Notifications**:
     - Course completion
     - Badge unlocked
     - New level achieved
     - Leaderboard position change (moved up in rankings)
     - Streak achievements (7 days, 30 days, 100 days)
     - GMFC Coins milestones (100, 500, 1000 coins)
     - Personal records (fastest completion, highest score)

  4. **Assessment Notifications**:
     - Pending quizzes reminders (incomplete required quizzes)
     - Graded assessments available (results ready)
     - Retry opportunities (failed quiz, attempts remaining)
     - Quiz deadline reminders (1 day before)

  5. **Certificate Notifications**:
     - Certificate ready for download
     - Certificate expiration warnings (if applicable)
     - Certificate issued notification

  6. **System Notifications**:
     - Scheduled maintenance announcements
     - Platform updates
     - Policy changes

- **Notification Channels:**
  - **In-App Notifications**:
    - Bell icon in navbar with unread badge counter
    - Dropdown panel showing recent notifications
    - Notification list page with full history
  - **Push Notifications** (Browser):
    - Desktop browser notifications
    - Require user permission
    - Works even when tab not active
  - **Email Notifications**:
    - Transactional emails for important events
    - Digest emails (daily or weekly summary)
    - Configurable per notification type

- **Notification Management:**
  - **Notification Settings Page**:
    - Toggle on/off for each notification category
    - Separate controls for in-app, push, and email
    - Frequency settings:
      - Instant (real-time)
      - Daily digest (one email per day)
      - Weekly digest (one email per week)
    - Quiet hours configuration (e.g., 10 PM - 8 AM)
    - Do Not Disturb mode (disable all notifications temporarily)

  - **Notification History**:
    - Chronological log of all notifications
    - Filter by type (course, achievement, assessment, etc.)
    - Search functionality
    - Mark as read/unread
    - Delete individual notifications
    - Clear all read notifications
    - Pagination or infinite scroll

  - **Notification Actions**:
    - Click notification to navigate to relevant content
    - "Mark all as read" button
    - "Clear all" button (delete all notifications)
    - Quick actions in dropdown (e.g., "Continue Course" button)

**Technical Implementation:**
- **ReactJS**:
  - NotificationBell component in navbar:
    - Bell icon with badge counter
    - Animated badge for new notifications
    - Click to open dropdown
  - NotificationDropdown component:
    - Recent notifications (last 10)
    - Grouped by type
    - Timestamp with relative time ("2 hours ago")
    - Quick actions (navigate, dismiss)
    - "View All" link to full page
  - NotificationList page:
    - Full notification history
    - Infinite scroll or pagination
    - Filtering and search
  - NotificationSettings component:
    - Form with toggle switches
    - Frequency dropdowns
    - Quiet hours time pickers
    - DND mode toggle
  - Toast notifications (react-toastify or sonner):
    - Pop-up alerts for important real-time events
    - Auto-dismiss after 5 seconds
    - Action buttons in toast
  - Custom hooks:
    - useNotifications (fetch and manage notifications)
    - useNotificationSettings (manage preferences)
    - useWebPush (handle push notification permissions)
- **TypeScript**:
  - Notification interface:
    ```typescript
    interface Notification {
      id: string;
      type: NotificationType;
      title: string;
      message: string;
      timestamp: Date;
      read: boolean;
      actionUrl?: string;
      actionLabel?: string;
      metadata?: Record<string, any>;
    }

    enum NotificationType {
      COURSE_REMINDER = 'course_reminder',
      NEW_COURSE = 'new_course',
      ACHIEVEMENT = 'achievement',
      QUIZ_REMINDER = 'quiz_reminder',
      CERTIFICATE = 'certificate',
      SYSTEM = 'system',
    }
    ```
  - NotificationSettings interface
  - Type-safe notification filtering functions
- **React Query**:
  - Query for fetching notifications (/api/notifications):
    - Paginated or infinite query
    - Filter parameters (type, read status, date range)
  - Query for unread count (/api/notifications/unread-count)
  - Mutation for marking as read
  - Mutation for updating notification preferences
  - WebSocket or polling for real-time notifications:
    - Option 1: WebSocket connection for instant delivery
    - Option 2: Polling with refetchInterval (30 seconds)
  - Optimistic updates for mark as read (instant UI feedback)
  - Query invalidation on new notifications
- **Web Push API**:
  - Request notification permission on first visit or in settings
  - Subscribe to push notifications (service worker)
  - Handle push events in service worker
  - Display system notifications with Notification API
- **Tailwind**:
  - NotificationBell styling:
    - Relative positioning for badge (absolute -top-1 -right-1)
    - Animated badge (animate-pulse for new notifications)
    - Hover effect (hover:bg-gray-100)
  - Dropdown menu styling:
    - Absolute positioning (absolute right-0 top-full mt-2)
    - Shadow and border (shadow-lg border border-gray-200)
    - Max height with scroll (max-h-96 overflow-y-auto)
  - Notification item styling:
    - Unread indicator (bg-blue-50 border-l-4 border-blue-500)
    - Read state (bg-white)
    - Hover effect (hover:bg-gray-50)
  - Toast notification styling:
    - Position (fixed top-4 right-4)
    - Animation (slide in from right)
    - Type-based colors (success: green, error: red, info: blue)
- **Additional Libraries**:
  - react-toastify or sonner for toast notifications
  - date-fns for relative time formatting ("2 hours ago", "yesterday")
  - Optional: Firebase Cloud Messaging (FCM) for cross-device push

**Acceptance Criteria:**
- ✓ Notifications appear in real-time within 5 seconds of event trigger
- ✓ Bell icon badge shows accurate unread count
- ✓ Clicking a notification navigates to relevant content (course, quiz, etc.)
- ✓ Notification preferences are saved and applied correctly
- ✓ Email notifications are sent according to user preferences (instant or digest)
- ✓ Toast notifications appear for important alerts (achievement, deadline)
- ✓ Notification history is searchable and filterable
- ✓ Quiet hours setting suppresses non-critical notifications
- ✓ Do Not Disturb mode disables all notifications except critical system alerts
- ✓ Mark all as read updates all notifications instantly
- ✓ Push notifications work on desktop (Chrome, Firefox, Safari)
- ✓ Notification dropdown shows last 10 notifications, sorted by most recent
- ✓ Relative time updates dynamically ("2 minutes ago" → "3 minutes ago")

---

### UR-LMS-009: GMFC Coins and Gamification
**Priority**: Medium
**User Role**: Learner/Employee

**Description:**
A gamification system using GMFC Coins to reward learners for completing courses, achieving high quiz scores, maintaining streaks, and other learning achievements.

**Functional Requirements:**
- **Coin Earning Rules:**
  1. **Course Completion Rewards**:
     - Base reward per course (configurable, e.g., 50 coins)
     - Bonus for early completion (before deadline)
     - Bonus for mandatory courses (e.g., 1.5x multiplier)

  2. **Quiz Score Bonuses**:
     - Above threshold score (e.g., 80%+): 10 coins
     - Perfect score (100%): 25 coins
     - First attempt pass: 15 coins bonus
     - No retry needed: 10 coins bonus

  3. **Streak Bonuses**:
     - 7-day streak: 50 coins
     - 30-day streak: 200 coins
     - 100-day streak: 1000 coins
     - Daily login bonus: 5 coins (first activity of the day)

  4. **Special Achievement Bonuses**:
     - Complete learning path: 100 coins
     - Fastest course completion (personal record): 25 coins
     - All courses in category completed: 75 coins
     - Top 10 on leaderboard: 200 coins (monthly)

  5. **Participation Rewards**:
     - Provide course feedback/review: 10 coins
     - Help other learners (if forum/Q&A feature): 5 coins per helpful answer
     - Refer a colleague to complete training: 50 coins

- **Coin Display:**
  - **Navbar Widget**:
    - Coin icon (gold coin image or icon)
    - Current balance prominently displayed
    - Animated counter on balance change (count-up animation)
    - Click to open coin details modal
  - **Dashboard Widget**:
    - Larger coin balance display
    - Recent coin transactions (last 5)
    - "View Full History" link
  - **Tooltip on Hover**:
    - Brief explanation of coin system
    - Quick earning tips
  - **Coin History Page**:
    - Complete transaction history
    - Date, amount, source/reason
    - Running balance
    - Filter by transaction type
    - Search functionality
    - Export to CSV

- **Coin Usage** (Future Growth):
  - **Redemption Options** (to be implemented):
    - Redeem for premium course access
    - Unlock bonus content or materials
    - Purchase virtual badges/avatars
    - Convert to gift cards or prizes
    - Entry to monthly prize drawings
    - Donate to charity (company matches)
  - **Marketplace** (future):
    - Virtual store for coin redemption
    - Exclusive learning resources
    - Physical rewards (company swag, etc.)

- **Badge System:**
  - **Badge Levels**:
    - Bronze (0-499 coins)
    - Silver (500-999 coins)
    - Gold (1,000-2,499 coins)
    - Platinum (2,500-4,999 coins)
    - Diamond (5,000+ coins)
  - **Badge Display**:
    - Visual representation (badge icon with color)
    - Current badge level prominently shown
    - Badge hierarchy visible (progression path)
    - Progress bar to next badge level
    - Coins needed for next level
    - Estimated time to next level (based on activity)
  - **Badge Requirements**:
    - Clearly defined criteria for each level
    - Displayed on hover or in help section
    - Requirements include:
      - Total coins earned
      - Courses completed
      - Quiz average score (optional)
  - **Badge Showcase**:
    - All earned badges displayed in profile
    - Unlocked vs. locked badges
    - Special achievement badges (separate from level badges)
    - Share badges on social media

- **Achievement System:**
  - **Achievement Types**:
    - Course-based (complete X courses)
    - Performance-based (average score > 90%)
    - Speed-based (complete course in < X hours)
    - Consistency-based (maintain X-day streak)
    - Social-based (top 10 on leaderboard)
    - Milestone-based (1,000 learning hours)
  - **Achievement Display**:
    - Achievement gallery in profile
    - Progress toward each achievement
    - Locked achievements with requirements visible
    - Achievement icons/badges
  - **Achievement Unlocks**:
    - Celebratory modal with confetti animation
    - Coin reward for achievement
    - Share achievement on social media
    - Achievement notification

- **Leaderboard Integration:**
  - Rankings based on total GMFC Coins
  - Coin earnings drive leaderboard position
  - Monthly leaderboard resets (optional)
  - Coin bonuses for top performers

**Technical Implementation:**
- **ReactJS**:
  - CoinWidget component in navbar:
    - Coin icon and balance
    - Click to open details modal
    - Animated counter (CountUp.js)
  - CoinBalance component on dashboard:
    - Large balance display
    - Recent transactions
    - Coin earnings chart
  - CoinHistory component:
    - Transaction history table
    - Filtering and search
    - Pagination
  - BadgeGallery component:
    - Grid of badge levels
    - Current badge highlighted
    - Progress to next level
    - Badge detail modal
  - AchievementGallery component:
    - Grid of achievements
    - Locked/unlocked states
    - Progress bars
  - AchievementUnlockModal:
    - Celebratory design
    - Confetti animation (react-confetti)
    - Share buttons
  - Custom hooks:
    - useCoins (balance, transactions, earning logic)
    - useBadges (current level, progress, requirements)
    - useAchievements (unlocked, locked, progress)
- **TypeScript**:
  - CoinTransaction interface:
    ```typescript
    interface CoinTransaction {
      id: string;
      amount: number;
      type: 'earned' | 'spent';
      source: CoinSource;
      description: string;
      timestamp: Date;
      balance: number; // running balance after transaction
    }

    enum CoinSource {
      COURSE_COMPLETION = 'course_completion',
      QUIZ_SCORE = 'quiz_score',
      STREAK = 'streak',
      ACHIEVEMENT = 'achievement',
      // ... etc
    }
    ```
  - Badge interface
  - Achievement interface
  - Type-safe coin calculation functions
- **React Query**:
  - Query for coin balance (/api/coins/balance)
  - Query for transaction history (/api/coins/transactions)
  - Query for badges (/api/badges)
  - Query for achievements (/api/achievements)
  - Mutation for awarding coins (backend-triggered, but optimistic update on frontend)
  - Real-time balance updates (refetchInterval or WebSocket)
  - Optimistic updates for immediate feedback
- **Animation Libraries**:
  - framer-motion for smooth animations:
    - Badge unlock animations
    - Coin counter animations
    - Progress bar fills
  - react-confetti for celebration effects:
    - Achievement unlocks
    - Badge level ups
    - Milestone celebrations
  - CountUp.js for animated number counter
- **Tailwind**:
  - Coin widget styling:
    - Gold coin icon color (text-yellow-500)
    - Badge with count (rounded-full bg-green-500)
  - Transaction history styling:
    - Table with alternating rows
    - Green for earned (text-green-600)
    - Red for spent (text-red-600)
  - Badge gallery styling:
    - Grid layout (grid-cols-2 md:grid-cols-5)
    - Badge cards with gradient backgrounds
    - Current badge with pulse animation
    - Locked badges with opacity (opacity-50 grayscale)
  - Achievement modal styling:
    - Centered modal with backdrop
    - Celebratory colors (bg-gradient-to-r from-yellow-400 to-orange-500)
    - Confetti overlay

**Acceptance Criteria:**
- ✓ Coins are awarded immediately upon qualifying action (< 1 second)
- ✓ Coin balance updates in real-time across all views (navbar, dashboard, history)
- ✓ Transaction history shows all coin earnings with detailed descriptions
- ✓ Badge progress updates accurately when coins are earned
- ✓ Achievement unlocks trigger celebratory modal with confetti animation
- ✓ Tooltip provides clear explanation of earning rules
- ✓ Coin counter animates smoothly (count-up effect)
- ✓ Badge gallery shows progression path clearly
- ✓ Achievements display progress percentage
- ✓ Leaderboard rankings update based on coin totals
- ✓ Coin history is exportable to CSV
- ✓ Badge unlock triggers notification
- ✓ Special achievement bonuses are awarded correctly (e.g., first attempt pass)

---

### UR-LMS-010: Responsive Design and Accessibility
**Priority**: High
**User Role**: All Users

**Description:**
The LMS must be fully responsive across all devices and accessible to users with disabilities, complying with WCAG 2.1 AA standards.

**Functional Requirements:**
- **Responsive Design:**
  - **Desktop (1024px and above)**:
    - Multi-column layouts (3-4 columns)
    - Sidebar navigation always visible
    - Full-featured video player with all controls
    - Large card-based designs
    - Hover effects and transitions

  - **Tablet (768px - 1023px)**:
    - 2-column layouts
    - Collapsible sidebar (drawer)
    - Optimized video player
    - Medium-sized cards
    - Touch-friendly tap targets (min 44x44px)

  - **Mobile (320px - 767px)**:
    - Single-column stacked layout
    - Hamburger menu for navigation
    - Mobile-optimized video player
    - Compact cards
    - Bottom navigation bar (optional)
    - Touch gestures support

  - **Adaptive Features**:
    - Images: Serve appropriate sizes (srcset)
    - Videos: Adaptive bitrate streaming
    - Tables: Horizontal scroll on mobile
    - Modals: Full-screen on mobile
    - Forms: Single-column on mobile
    - Charts: Responsive to container width

- **Accessibility (WCAG 2.1 AA Compliance):**
  - **Keyboard Navigation**:
    - All interactive elements accessible via keyboard
    - Logical tab order
    - Visible focus indicators
    - Skip navigation links
    - Keyboard shortcuts documented
    - No keyboard traps

  - **Screen Reader Support**:
    - Semantic HTML5 elements (header, nav, main, article, aside, footer)
    - ARIA labels for icon-only buttons
    - ARIA roles where appropriate (dialog, alert, tab, tabpanel)
    - ARIA live regions for dynamic content updates
    - Meaningful link text (avoid "click here")
    - Alt text for all images (decorative images: alt="")
    - Form labels properly associated with inputs

  - **Visual Accessibility**:
    - **Color Contrast**:
      - Text: Minimum 4.5:1 (7:1 for AAA)
      - Large text (18pt+): Minimum 3:1
      - UI components: Minimum 3:1
    - Don't rely on color alone for information
    - Underline links in body text
    - Clear focus indicators (min 2px border)

  - **Content Accessibility**:
    - Clear, concise headings hierarchy (h1 → h2 → h3)
    - Descriptive page titles
    - Language declared (lang="en")
    - Text resizable up to 200% without breaking layout
    - Line height at least 1.5x font size
    - Paragraph spacing at least 2x font size

  - **Form Accessibility**:
    - Labels for all input fields
    - Required fields clearly marked
    - Error messages associated with fields (aria-describedby)
    - Inline validation with clear feedback
    - Error summary at top of form

  - **Media Accessibility**:
    - Closed captions for videos
    - Transcripts available
    - Audio descriptions (optional)
    - Auto-play disabled by default
    - Media player controls keyboard accessible

  - **Dynamic Content**:
    - ARIA live regions for notifications
    - Loading states announced to screen readers
    - Focus management for modals (trap focus, restore on close)
    - Route changes announced

- **Performance Optimization:**
  - Page load time < 3 seconds (3G connection)
  - Time to Interactive < 5 seconds
  - Lazy loading for images and videos
  - Code splitting for faster initial load
  - Optimized bundle size (< 300KB gzipped)

**Technical Implementation:**
- **ReactJS**:
  - Semantic HTML5 elements throughout
  - ARIA attributes in JSX:
    ```jsx
    <button aria-label="Close dialog" onClick={handleClose}>
      <XIcon aria-hidden="true" />
    </button>
    ```
  - Focus management:
    - useRef for focus trapping in modals
    - Focus restoration on modal close
    - Auto-focus on first input in forms
  - Keyboard event handlers:
    ```jsx
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    ```
  - SkipLink component for keyboard users
  - Custom hooks:
    - useFocusTrap (for modals)
    - useKeyboard (for keyboard shortcuts)
    - useAnnouncer (for screen reader announcements)
- **TypeScript**:
  - Type checking for accessibility props
  - ARIA attribute types from React
  - Accessible component prop interfaces
- **Tailwind**:
  - Responsive utility classes:
    ```css
    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
    text-sm md:text-base lg:text-lg
    p-4 md:p-6 lg:p-8
    ```
  - Focus states:
    ```css
    focus:outline-none focus:ring-2 focus:ring-primary-red focus:ring-offset-2
    ```
  - Screen reader only utility:
    ```css
    sr-only (visually hidden but available to screen readers)
    ```
  - Dark mode support (optional):
    ```css
    dark:bg-gray-800 dark:text-white
    ```
  - Custom breakpoints if needed:
    ```js
    // tailwind.config.js
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
    ```
- **Accessibility Tools**:
  - react-aria (Adobe's accessible React components)
  - @reach/ui components (accessible primitives)
  - eslint-plugin-jsx-a11y (linting for accessibility)
  - axe-core for automated testing
- **Testing**:
  - Automated: axe-core, Lighthouse accessibility audit
  - Manual: Keyboard navigation testing
  - Screen reader testing: NVDA (Windows), JAWS, VoiceOver (Mac/iOS)
  - Color contrast checker tools

**Acceptance Criteria:**
- ✓ All pages are navigable using keyboard only (Tab, Shift+Tab, Enter, Space, Esc)
- ✓ All interactive elements have visible focus indicators (2px border minimum)
- ✓ Screen readers can access all content and functionality
- ✓ All images have appropriate alt text
- ✓ Color contrast meets WCAG 2.1 AA standards (4.5:1 for text, 3:1 for UI)
- ✓ Form validation errors are announced to screen readers
- ✓ Videos have closed captions available
- ✓ Site passes automated accessibility audit (Lighthouse score > 90)
- ✓ Responsive design works on:
  - Desktop (1920x1080, 1366x768)
  - Tablet (iPad: 768x1024, iPad Pro: 1024x1366)
  - Mobile (iPhone: 375x667, Android: 360x640)
- ✓ Touch targets are at least 44x44px on mobile
- ✓ Text is readable when zoomed to 200%
- ✓ No content is lost on small screens (320px width)
- ✓ Hamburger menu works smoothly on mobile
- ✓ Video player controls are touch-friendly on mobile

---

## Non-Functional Requirements

### Performance
| Metric | Requirement |
|--------|-------------|
| Dashboard load time | < 2 seconds on broadband |
| Page load time | < 3 seconds overall |
| Video buffering | Minimal with adaptive streaming |
| Autosave operation | < 1 second |
| Quiz submission | < 2 seconds |
| Search results | < 1 second |
| Time to Interactive (TTI) | < 5 seconds |
| First Contentful Paint (FCP) | < 1.5 seconds |

### Usability
- Intuitive UI following Tailwind design system and Udemy inspiration
- Accessible (WCAG 2.1 AA compliant)
- Minimal learning curve for new users
- Consistent UI patterns throughout application
- Helpful tooltips and contextual guidance
- Clear error messages with actionable suggestions
- Responsive feedback for all user actions

### Reliability
- Auto-save must work offline (queue requests with React Query)
- Quiz submissions are retried on network failure
- 99.9% uptime SLA
- Regular maintenance windows (announced in advance)
- Backup and disaster recovery plan
- Graceful degradation when backend services unavailable

### Security
- API calls authenticated via JWT tokens
- HTTPS encryption for all data transmission
- Secure authentication (OAuth 2.0, SSO support)
- Role-based access control (RBAC)
- User data isolation (one learner cannot see another's progress)
- GDPR compliance for user data
- XSS and CSRF protection
- Input validation and sanitization
- Secure token storage (httpOnly cookies or secure localStorage)

### Scalability
- Support for 10,000+ concurrent users
- Cloud-based infrastructure with auto-scaling
- Load balancing across multiple servers
- Database optimization (indexing, query optimization)
- CDN for video content delivery
- Horizontal scaling capability
- Efficient caching strategies

### Compatibility
| Category | Support |
|----------|---------|
| **Browsers** | Chrome (latest 2 versions), Firefox (latest 2 versions), Safari (latest 2 versions), Edge (latest 2 versions) |
| **Devices** | Desktop, Tablet, Mobile (iOS and Android) |
| **Screen Sizes** | 320px (mobile) to 3840px (4K desktop) |
| **Operating Systems** | Windows 10+, macOS 10.14+, iOS 14+, Android 9+ |
| **Network Conditions** | Optimized for 3G and above |

### Maintainability
- TypeScript for type safety and reduced bugs
- Component-based architecture with reusable Tailwind classes
- Clean code structure and documentation
- Code comments for complex logic
- Git version control with meaningful commit messages
- Automated testing (unit, integration, E2E)
- CI/CD pipeline for automated deployment
- Code review process

---

## Technical Stack

### Core Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **React JS** | 18.x | UI library for building component-based interfaces |
| **TypeScript** | 5.x | Type safety and improved developer experience |
| **React Query** | 5.x | Data fetching, caching, synchronization |
| **Tailwind CSS** | 3.x | Utility-first CSS framework |

### How Technologies Apply

#### React JS
- **Functional components with hooks** for state and lifecycle management
- **Context API** for global state (authentication, theme, user preferences)
- **Component-based architecture** for reusability and maintainability
- **React Router** for client-side routing and navigation
- **Custom hooks** for shared logic across components
- **Code splitting** with React.lazy and Suspense for performance
- **Error boundaries** for graceful error handling

#### Tailwind CSS
- **Utility-first styling** for rapid UI development
- **Custom design system** defined in `tailwind.config.js`:
  - Brand colors (Crimson Red #DC143C, White #FFFFFF)
  - Custom spacing and sizing
  - Responsive breakpoints
  - Custom animations
- **Responsive design** implementation with mobile-first approach
- **Component classes** with @apply for complex components
- **Dark mode support** (optional future enhancement)
- **JIT (Just-In-Time) mode** for optimized builds

#### React Query
- **Data fetching, caching, and synchronization** for:
  - Course progress
  - Quiz results
  - Notifications
  - Dashboard data
  - Leaderboard rankings
- **Optimistic updates** for instant UI feedback
- **Automatic retry** on network failures
- **Background refetch** for real-time data
- **Offline support** with request queuing
- **Cache invalidation** strategies for data consistency
- **Parallel queries** for optimized performance
- **Infinite queries** for paginated data
- **Mutations** for data modifications

#### TypeScript
- **Strict typing** for:
  - API responses
  - Component props
  - State management
  - Function parameters and return types
- **Reduces runtime errors** with compile-time type checking
- **Improved developer experience** with IDE autocomplete and intellisense
- **Better code maintainability** and refactoring
- **Self-documenting code** with type definitions
- **Interfaces and types** for data models
- **Enums** for constant values
- **Generics** for reusable type-safe functions

### Additional Libraries

#### Video & Media
- **HTML5 Video API** - Core video playback
- **hls.js** - Adaptive bitrate streaming (HLS)
- **plyr** or **video.js** - Enhanced video player (optional)

#### PDF & Documents
- **jsPDF** - Client-side PDF generation
- **react-pdf** - PDF viewing in browser
- **docx** - Document handling

#### Charts & Visualizations
- **Recharts** - Composable charting library
- **Chart.js** with **react-chartjs-2** - Alternative charting
- **framer-motion** - Animations

#### Forms & Validation
- **React Hook Form** - Performant form management
- **Zod** or **Yup** - Schema validation

#### UI Components
- **Headless UI** - Unstyled accessible components
- **Radix UI** - Low-level UI primitives
- **react-toastify** or **sonner** - Toast notifications

#### Utilities
- **date-fns** - Date formatting and manipulation
- **lodash** - Utility functions (debounce, throttle, etc.)
- **clsx** - Conditional className composition
- **axios** - HTTP client (alternative to fetch)

#### Testing
- **Vitest** - Fast unit testing
- **@testing-library/react** - Component testing
- **@testing-library/user-event** - User interaction simulation
- **MSW (Mock Service Worker)** - API mocking
- **Playwright** or **Cypress** - E2E testing

---

## UI/UX Requirements

### Color Theme

#### Primary Colors
- **Primary Red**: `#DC143C` (Crimson Red)
- **White**: `#FFFFFF`
- **Dark Red**: `#A01010` (for hover states, emphasis)

#### Secondary Colors
- **Light Gray**: `#F5F5F5` (backgrounds)
- **Medium Gray**: `#E0E0E0` (borders, dividers)
- **Dark Gray**: `#333333` (text)

#### Status Colors
- **Success Green**: `#28A745`
- **Warning Orange**: `#FFA500`
- **Error Red**: `#DC3545`
- **Info Blue**: `#17A2B8`

#### Progress Indicators
- **Red (0-30%)**: `#DC3545`
- **Orange (31-70%)**: `#FFA500`
- **Yellow (71-99%)**: `#FFC107`
- **Green (100%)**: `#28A745`

### Typography
- **Primary Font**: Sans-serif (Roboto, Open Sans, or Inter)
- **Headings**: Bold, hierarchical sizing (H1: 2.5rem, H2: 2rem, H3: 1.5rem)
- **Body Text**: Regular weight, readable size (16px base, 1.5 line-height)
- **Button Text**: Medium weight, uppercase for primary actions
- **Code/Monospace**: Fira Code or Courier New (if needed)

### Layout Principles

#### Udemy-inspired Design
- Clean, card-based design
- Generous white space (padding and margins)
- Grid-based course layouts
- Sidebar navigation for course player
- Sticky headers for constant access to navigation
- Floating action buttons for primary actions
- Hero sections for landing pages
- Clear visual hierarchy

#### Spacing System (Tailwind)
- Extra Small: `0.25rem` (1 unit)
- Small: `0.5rem` (2 units)
- Medium: `1rem` (4 units)
- Large: `1.5rem` (6 units)
- Extra Large: `2rem` (8 units)

### Key UI Components

#### Navigation Bar
- Logo/brand (top left)
- Main navigation links (Dashboard, My Courses, Certificates, etc.)
- Search bar (prominent, centered)
- Notifications icon with badge counter
- GMFC Coins display (mini widget with icon)
- User profile dropdown (avatar, name, settings, logout)
- Sticky on scroll
- Responsive: Hamburger menu on mobile

#### Dashboard Cards
- Course cards with:
  - Thumbnail images (16:9 aspect ratio)
  - Course title and short description
  - Progress indicators integrated into cards
  - Quick action buttons (Continue, View Details, Start)
  - Hover effects with shadow elevation
- Consistent card dimensions and spacing
- Grid layout (1 column mobile, 2 tablet, 3-4 desktop)

#### Course Player Layout
- **Video player as main content** (70-80% width on desktop)
- **Course curriculum sidebar** (20-30% width, collapsible)
  - Modules and lessons list
  - Current lesson highlighted
  - Completion checkmarks
- **Tab navigation** below video:
  - Overview (course description, objectives)
  - Notes (learner annotations)
  - Resources (downloadable materials)
  - Q&A (discussion, if applicable)
- **Progress bar at top** of page (fixed position)
- **Prominent "Next Lesson" button** after video ends

#### Forms and Inputs
- Rounded input fields (border-radius: 0.5rem)
- Subtle borders (1px solid #E0E0E0)
- Red focus states (`focus:border-primary-red focus:ring-2`)
- Clear error messages with icons (below input)
- Inline validation (as user types)
- Submit buttons:
  - Loading states (spinner + "Submitting...")
  - Disabled states (opacity-50, cursor-not-allowed)
  - Success states (green checkmark)
- Placeholder text in medium gray

#### Buttons
- **Primary**: Red background, white text, rounded, shadow on hover
- **Secondary**: White background, red border and text, rounded
- **Tertiary**: No border, text only, red text, underline on hover
- **Icon buttons**: Circular, subtle background, hover effect
- **Sizes**: Small, Medium (default), Large

#### Modals
- Centered on screen with backdrop (rgba(0,0,0,0.5))
- White background, rounded corners, shadow
- Close button (X) in top-right corner
- Slide-in animation (fade + scale)
- Focus trap (keyboard navigation contained)
- Full-screen on mobile

#### Progress Bars
- Rounded ends (border-radius: 9999px)
- Color-coded by percentage (red → orange → yellow → green)
- Smooth animation on progress change (transition-all duration-300)
- Percentage label (inside or next to bar)

#### Badges
- Rounded rectangles (border-radius: 0.25rem)
- Small text (12px)
- Color-coded by type (mandatory: red, optional: blue, completed: green)
- Icon + text combination (optional)

---

This document provides comprehensive user requirements for the LMS (Learner Experience) module, ready for development team implementation.
