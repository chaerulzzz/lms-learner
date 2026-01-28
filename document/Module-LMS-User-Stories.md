# Module 2: LMS (Learner Experience) - User Stories

## Document Information
- **Document Version**: 1.0
- **Date**: January 28, 2026
- **Project Name**: Web-Based Training Platform LMS
- **Module**: Module 2 - LMS (Learner Experience)
- **Technology Stack**: ReactJS, React Query, Tailwind CSS, TypeScript

---

## Table of Contents
1. [Epic 1: User Authentication and Onboarding](#epic-1-user-authentication-and-onboarding)
2. [Epic 2: Dashboard and Learning Path Management](#epic-2-dashboard-and-learning-path-management)
3. [Epic 3: Course Player and Content Consumption](#epic-3-course-player-and-content-consumption)
4. [Epic 4: Quiz and Assessment](#epic-4-quiz-and-assessment)
5. [Epic 5: Certificate Generation and Management](#epic-5-certificate-generation-and-management)
6. [Epic 6: Progress Tracking and Analytics](#epic-6-progress-tracking-and-analytics)
7. [Epic 7: Notifications and Engagement](#epic-7-notifications-and-engagement)
8. [Epic 8: GMFC Coins and Gamification](#epic-8-gmfc-coins-and-gamification)

---

## Epic 1: User Authentication and Onboarding

### Story 1.1: Secure Login
**As a** learner
**I want to** log in securely using my corporate credentials
**So that** I can access my personalized learning dashboard

**Acceptance Criteria:**
- Given I am on the login page
- When I enter my valid corporate credentials
- Then I am redirected to my personalized dashboard
- And my session is maintained across browser tabs
- And I receive a JWT token for API authentication

**Technical Tasks:**
- [ ] Create Login component with form validation (React + TypeScript)
- [ ] Implement authentication context provider (React Context API)
- [ ] Set up JWT token storage and management (localStorage/sessionStorage)
- [ ] Configure React Query mutations for login/logout
- [ ] Style login page with Tailwind (red and white theme)
- [ ] Add loading and error states
- [ ] Implement token refresh mechanism

**Story Points**: 5

---

### Story 1.2: First-Time User Onboarding
**As a** first-time user
**I want to** see a welcome screen and guided tour
**So that** I understand how to navigate and use the LMS

**Acceptance Criteria:**
- Given I am logging in for the first time
- When I complete the login process
- Then I see a welcome screen with platform overview
- And I am guided through key features with an interactive tour
- And I can skip the tour if I prefer
- And I can access the tour again from settings

**Technical Tasks:**
- [ ] Create onboarding modal component (React)
- [ ] Implement multi-step tour using react-joyride or similar
- [ ] Set up user preference flag for onboarding completion
- [ ] Style onboarding screens with Tailwind
- [ ] Add skip and navigation controls
- [ ] Save onboarding completion status via API (React Query mutation)

**Story Points**: 3

---

## Epic 2: Dashboard and Learning Path Management

### Story 2.1: View Dashboard Overview
**As a** learner
**I want to** see an overview of my learning progress on the dashboard
**So that** I can quickly understand my training status and next steps

**Acceptance Criteria:**
- Given I am logged in
- When I navigate to the dashboard
- Then I see mandatory learning paths with status indicators
- And I see ongoing courses with progress percentages
- And I see my total GMFC Coins balance
- And I see my current badges and level
- And I see quick stats (completed courses, learning hours, current streak)
- And the dashboard loads within 2 seconds

**Technical Tasks:**
- [ ] Create Dashboard component with grid layout (React + Tailwind)
- [ ] Implement custom hooks for dashboard data (useDashboardData)
- [ ] Set up React Query for parallel data fetching
- [ ] Create sub-components: LearningPathCard, OngoingCourseCard, StatsWidget
- [ ] Add loading skeletons for better UX
- [ ] Implement responsive design with Tailwind breakpoints
- [ ] Add auto-refresh every 30 seconds (React Query refetchInterval)
- [ ] Style progress bars with color coding (red, orange, yellow, green)

**Story Points**: 8

---

### Story 2.2: Navigate Learning Paths
**As a** learner
**I want to** click on a learning path to view its details and courses
**So that** I can start or continue my assigned training

**Acceptance Criteria:**
- Given I am on the dashboard
- When I click on a learning path card
- Then I navigate to the learning path detail page
- And I see the path description, total courses, and my progress
- And I see a list of all courses in the path
- And I can see which courses are mandatory and their due dates
- And I can start or continue any course in the path

**Technical Tasks:**
- [ ] Create LearningPathDetail component with React Router
- [ ] Set up dynamic routing (/learning-path/:pathId)
- [ ] Implement useLearningPathDetail hook with React Query
- [ ] Create CourseList component with course cards
- [ ] Add visual indicators for mandatory courses (badges)
- [ ] Style with Tailwind grid and card layouts
- [ ] Add breadcrumb navigation
- [ ] Implement "Start Course" and "Continue" buttons with routing

**Story Points**: 5

---

### Story 2.3: Priority Sorting of Learning Paths
**As a** learner
**I want to** see my learning paths sorted by deadline priority
**So that** I can focus on the most urgent training first

**Acceptance Criteria:**
- Given I have multiple learning paths assigned
- When I view the dashboard
- Then learning paths are sorted by earliest deadline first
- And overdue paths are highlighted in red
- And paths approaching deadline (within 7 days) are highlighted in orange
- And completed paths are shown at the bottom or in a separate section

**Technical Tasks:**
- [ ] Implement sorting logic in useDashboardData hook (TypeScript)
- [ ] Add date comparison and priority calculation
- [ ] Create color-coded badges for deadline status
- [ ] Style overdue and approaching paths distinctly with Tailwind
- [ ] Add filtering options (All, Mandatory, Optional, Overdue)
- [ ] Test sorting with various deadline scenarios

**Story Points**: 3

---

## Epic 3: Course Player and Content Consumption

### Story 3.1: Watch Course Video
**As a** learner
**I want to** watch course videos with standard playback controls
**So that** I can learn at my own pace

**Acceptance Criteria:**
- Given I am on a course page
- When I click the play button
- Then the video plays smoothly without buffering
- And I can use play/pause, volume, mute, and fullscreen controls
- And I can adjust playback speed (0.5x to 2x)
- And I can select video quality (360p, 480p, 720p, 1080p)
- And I can see the current time and total duration
- And I can use keyboard shortcuts (space for play/pause, arrow keys for seek)

**Technical Tasks:**
- [ ] Create VideoPlayer component using HTML5 Video API (React)
- [ ] Implement custom video controls overlay
- [ ] Add playback speed and quality selection dropdowns
- [ ] Style player with Tailwind (16:9 aspect ratio container)
- [ ] Implement keyboard shortcuts with event listeners
- [ ] Add loading spinner for buffering
- [ ] Ensure responsive design for all screen sizes
- [ ] Test across different browsers (Chrome, Firefox, Safari, Edge)

**Story Points**: 8

---

### Story 3.2: Auto-Save Video Progress
**As a** learner
**I want to** have my video progress automatically saved
**So that** I can resume from where I left off

**Acceptance Criteria:**
- Given I am watching a course video
- When I watch for at least 30 seconds
- Then my progress is automatically saved
- And progress is saved when I pause the video
- And progress is saved when I navigate away from the page
- And progress is saved when I close the browser
- And when I return, the video resumes from the saved position
- And I see a visual confirmation when progress is saved

**Technical Tasks:**
- [ ] Implement useVideoProgress hook with auto-save logic (React)
- [ ] Set up interval for auto-save every 30 seconds (useEffect)
- [ ] Create React Query mutation for saving progress
- [ ] Add event listeners for pause, beforeunload events
- [ ] Implement debouncing to prevent excessive API calls
- [ ] Add toast notification for progress saved confirmation
- [ ] Store progress with timestamp and course/video ID (TypeScript interfaces)
- [ ] Implement resume functionality on video load

**Story Points**: 5

---

### Story 3.3: Access Course Materials
**As a** learner
**I want to** download PDF and PPT materials related to the course
**So that** I can reference them while studying

**Acceptance Criteria:**
- Given I am viewing a course
- When I navigate to the materials section
- Then I see a list of all available materials (PDFs, PPTs)
- And I see file names, types, and sizes
- And I can preview PDFs before downloading
- And I can download individual files with one click
- And I can download all materials at once (batch download)
- And locked materials show when they will become available

**Technical Tasks:**
- [ ] Create CourseMaterials component (React)
- [ ] Implement useMaterials hook with React Query
- [ ] Add file type icons and size display
- [ ] Create PDF preview modal component
- [ ] Implement single file download with API call
- [ ] Implement batch download (zip archive or multiple downloads)
- [ ] Add locked state for materials with availability conditions
- [ ] Style with Tailwind (list view with file icons)

**Story Points**: 5

---

### Story 3.4: Navigate Course Structure
**As a** learner
**I want to** see the course outline and navigate between lessons
**So that** I can easily move through the course content

**Acceptance Criteria:**
- Given I am in the course player
- When I view the sidebar
- Then I see a collapsible course outline with all modules and lessons
- And the current lesson is highlighted
- And I can click on any lesson to navigate to it
- And I see completion checkmarks for finished lessons
- And I can use Next/Previous buttons to move between lessons
- And chapter markers are shown on the progress bar

**Technical Tasks:**
- [ ] Create CourseOutline sidebar component (React)
- [ ] Implement collapsible sections with expand/collapse functionality
- [ ] Add active lesson highlighting with CSS
- [ ] Create Next/Previous navigation buttons
- [ ] Integrate completion status indicators
- [ ] Add chapter markers to progress bar
- [ ] Implement responsive behavior (sidebar to drawer on mobile)
- [ ] Style with Tailwind (sidebar 20-30% width on desktop)

**Story Points**: 5

---

## Epic 4: Quiz and Assessment

### Story 4.1: Take Multiple Choice Quiz
**As a** learner
**I want to** answer multiple choice questions
**So that** I can demonstrate my understanding of the course

**Acceptance Criteria:**
- Given I have completed a course
- When I start the quiz
- Then I see multiple choice questions with radio buttons (single answer) or checkboxes (multiple answers)
- And I can select my answer(s)
- And I can navigate between questions if the quiz allows it
- And I can review my answers before submitting
- And my answers are auto-saved every 30 seconds
- And I see a countdown timer if the quiz is timed

**Technical Tasks:**
- [ ] Create Quiz component with question navigation (React)
- [ ] Implement MultipleChoiceQuestion component (React + TypeScript)
- [ ] Add controlled inputs with state management (useState)
- [ ] Create auto-save functionality with debounced mutation (React Query)
- [ ] Implement timer component with countdown (useEffect)
- [ ] Add quiz review screen before final submission
- [ ] Style questions and options with Tailwind
- [ ] Create loading and error states

**Story Points**: 8

---

### Story 4.2: Submit Quiz and View Results
**As a** learner
**I want to** submit my quiz and immediately see my results
**So that** I know my score and whether I passed

**Acceptance Criteria:**
- Given I have completed all quiz questions
- When I click the "Submit Quiz" button
- Then I see a confirmation dialog
- And after confirming, the quiz is submitted
- And I immediately see my score and percentage
- And I see pass/fail status with visual feedback (green for pass, red for fail)
- And I see a breakdown of correct/incorrect answers
- And I can review each question with explanations
- And I see how many attempts I have remaining
- And submission completes within 2 seconds

**Technical Tasks:**
- [ ] Create quiz submission mutation (React Query)
- [ ] Implement confirmation dialog component
- [ ] Create QuizResults component with score display (React + TypeScript)
- [ ] Add visual feedback with color-coded results (Tailwind)
- [ ] Implement question review with correct/incorrect indicators
- [ ] Show explanations for each question
- [ ] Display remaining attempts count
- [ ] Add retry button if attempts remain
- [ ] Create loading state during submission

**Story Points**: 5

---

### Story 4.3: Retry Failed Quiz
**As a** learner
**I want to** retry a quiz if I failed and have attempts remaining
**So that** I can improve my score and pass the course

**Acceptance Criteria:**
- Given I failed a quiz
- And I have retry attempts remaining
- When I click the "Retry Quiz" button
- Then I see a cooldown message if applicable
- And after cooldown, I can start a new attempt
- And I see different questions (randomized from question pool)
- And my previous attempts are saved in history
- And the attempt counter increments (e.g., "Attempt 2 of 3")

**Technical Tasks:**
- [ ] Implement retry logic in Quiz component
- [ ] Add cooldown timer if configured
- [ ] Fetch randomized questions on retry (React Query)
- [ ] Track attempt number in state and UI
- [ ] Save attempt history with scores
- [ ] Display attempt history in user profile
- [ ] Add retry button with conditional rendering
- [ ] Style retry UI with Tailwind

**Story Points**: 3

---

### Story 4.4: Answer Different Question Types
**As a** learner
**I want to** answer various question types (matching, true/false, short answer, fill in the blanks, essay)
**So that** my knowledge can be assessed comprehensively

**Acceptance Criteria:**
- Given I am taking a quiz
- When I encounter different question types
- Then I can answer matching questions with drag-and-drop
- And I can answer true/false questions with radio buttons
- And I can answer short answer questions with text input
- And I can answer fill-in-the-blank questions with multiple text inputs
- And I can answer essay questions with a rich text editor
- And I can attach files to essay questions if allowed
- And all question types validate correctly

**Technical Tasks:**
- [ ] Create MatchingQuestion component with drag-and-drop (react-beautiful-dnd)
- [ ] Create TrueFalseQuestion component (React)
- [ ] Create ShortAnswerQuestion component with character limit
- [ ] Create FillInTheBlanksQuestion component with multiple inputs
- [ ] Create EssayQuestion component with rich text editor (Draft.js or Quill)
- [ ] Implement file upload for essay questions
- [ ] Add TypeScript interfaces for each question type
- [ ] Style each question type consistently with Tailwind
- [ ] Add validation for each question type

**Story Points**: 13

---

## Epic 5: Certificate Generation and Management

### Story 5.1: Generate Certificate on Course Completion
**As a** learner
**I want to** automatically receive a certificate when I complete a course
**So that** I have proof of my achievement

**Acceptance Criteria:**
- Given I have completed all course modules
- And I have passed the post-course quiz with the minimum required score
- When the system processes my completion
- Then a certificate is automatically generated with my name, course title, completion date, and unique ID
- And I receive a notification that my certificate is ready
- And the certificate appears in my certificate library

**Technical Tasks:**
- [ ] Implement automatic certificate generation trigger (backend API call)
- [ ] Create Certificate component for display (React)
- [ ] Design certificate template with red and white theme (Tailwind/CSS)
- [ ] Generate unique certificate ID
- [ ] Set up React Query mutation for certificate generation
- [ ] Add certificate to user's library
- [ ] Send notification on certificate ready
- [ ] Create certificate preview modal

**Story Points**: 8

---

### Story 5.2: Download Certificate as PDF
**As a** learner
**I want to** download my certificate as a high-quality PDF
**So that** I can print it or save it for my records

**Acceptance Criteria:**
- Given I have earned a certificate
- When I click the "Download Certificate" button
- Then a PDF is generated and downloaded to my device
- And the PDF is high-quality and print-ready (300 DPI)
- And the PDF includes all certificate fields (name, course, date, ID)
- And the download completes within 3 seconds

**Technical Tasks:**
- [ ] Integrate PDF generation library (jsPDF or API endpoint)
- [ ] Create PDF template matching certificate design
- [ ] Implement download button with onClick handler
- [ ] Add loading state during PDF generation
- [ ] Ensure PDF quality and print readiness
- [ ] Test PDF download across browsers
- [ ] Add error handling for failed downloads
- [ ] Style download button with Tailwind

**Story Points**: 5

---

### Story 5.3: View Certificate Library
**As a** learner
**I want to** view all my earned certificates in one place
**So that** I can easily access and manage them

**Acceptance Criteria:**
- Given I have earned multiple certificates
- When I navigate to "My Certificates" section
- Then I see a grid/list of all my certificates
- And each certificate shows thumbnail, course name, and completion date
- And I can click on a certificate to preview it
- And I can download any certificate again
- And I can search and filter certificates by course name or date
- And I can share certificates on social media

**Technical Tasks:**
- [ ] Create CertificateLibrary component (React)
- [ ] Implement useCertificates hook with React Query
- [ ] Create certificate grid layout with Tailwind
- [ ] Add search and filter functionality
- [ ] Implement certificate preview modal
- [ ] Add re-download button for each certificate
- [ ] Integrate social media share buttons (LinkedIn, Twitter)
- [ ] Add empty state for no certificates

**Story Points**: 5

---

## Epic 6: Progress Tracking and Analytics

### Story 6.1: View Course Progress
**As a** learner
**I want to** see my progress for each course
**So that** I know how much I have completed

**Acceptance Criteria:**
- Given I am enrolled in courses
- When I view my dashboard or course page
- Then I see a progress bar showing completion percentage (0-100%)
- And the progress bar is color-coded (red 0-30%, orange 31-70%, yellow 71-99%, green 100%)
- And I see detailed progress breakdown (videos watched, materials downloaded, quizzes completed)
- And I see time spent on the course
- And I see last accessed date/time
- And progress updates immediately when I complete an activity

**Technical Tasks:**
- [ ] Create ProgressBar component with color coding (React + Tailwind)
- [ ] Implement useProgress hook with React Query
- [ ] Calculate progress percentage based on completed activities
- [ ] Add progress breakdown component
- [ ] Display time spent and last accessed info
- [ ] Set up real-time progress updates (optimistic updates or polling)
- [ ] Style progress indicators with Tailwind
- [ ] Add TypeScript interfaces for progress data

**Story Points**: 5

---

### Story 6.2: View Quiz Performance History
**As a** learner
**I want to** see my quiz performance history
**So that** I can track my improvement over time

**Acceptance Criteria:**
- Given I have taken multiple quizzes
- When I navigate to my quiz history
- Then I see a table of all quiz attempts with date, quiz name, score, and pass/fail status
- And I can filter by course or date range
- And I can see detailed results for each attempt
- And I can see trends showing score improvements
- And I can identify topics where I struggled

**Technical Tasks:**
- [ ] Create QuizHistory component with table (React + Tailwind)
- [ ] Implement useQuizHistory hook with React Query
- [ ] Add sorting and filtering functionality
- [ ] Create detailed quiz attempt view
- [ ] Implement trend analysis with charts (Recharts)
- [ ] Identify weak topics based on question performance
- [ ] Style table with responsive design
- [ ] Add export functionality (CSV)

**Story Points**: 8

---

### Story 6.3: View Leaderboard
**As a** learner
**I want to** see how I rank compared to other learners
**So that** I can be motivated to improve

**Acceptance Criteria:**
- Given the leaderboard feature is enabled
- When I navigate to the leaderboard page
- Then I see a ranking of top learners based on GMFC Coins
- And I see my current rank highlighted
- And I see movement indicators (up/down arrows)
- And I can view different leaderboard categories (overall, monthly, course-specific, department)
- And I can opt-out of leaderboard display in privacy settings
- And the leaderboard updates every 5 minutes

**Technical Tasks:**
- [ ] Create Leaderboard component (React)
- [ ] Implement useLeaderboard hook with React Query
- [ ] Add category tabs for different rankings
- [ ] Highlight current user's position
- [ ] Add movement indicators with icons
- [ ] Implement privacy settings toggle
- [ ] Set up automatic refresh (refetchInterval)
- [ ] Style leaderboard with Tailwind (table or cards)
- [ ] Add loading skeletons

**Story Points**: 5

---

### Story 6.4: View Learning Analytics Dashboard
**As a** learner
**I want to** see visual analytics of my learning performance
**So that** I can understand my strengths and areas for improvement

**Acceptance Criteria:**
- Given I have learning activity data
- When I navigate to the analytics dashboard
- Then I see charts showing progress trends over time
- And I see bar charts for quiz scores
- And I see pie charts for course completion distribution
- And I see comparison with peer averages
- And I see recommendations for courses based on my performance
- And charts are interactive and responsive

**Technical Tasks:**
- [ ] Create AnalyticsDashboard component (React)
- [ ] Integrate charting library (Recharts or Chart.js)
- [ ] Implement useAnalytics hook with React Query
- [ ] Create LineChart for progress trends
- [ ] Create BarChart for quiz scores
- [ ] Create PieChart for completion distribution
- [ ] Add peer comparison data
- [ ] Implement course recommendations logic
- [ ] Style dashboard with Tailwind grid
- [ ] Ensure charts are responsive

**Story Points**: 13

---

## Epic 7: Notifications and Engagement

### Story 7.1: Receive Incomplete Course Reminders
**As a** learner
**I want to** receive reminders about incomplete courses
**So that** I stay on track with my training

**Acceptance Criteria:**
- Given I have started a course but not completed it
- And I have been inactive for 7 days (or configured period)
- When the reminder is triggered
- Then I receive an in-app notification with the message "You haven't finished [course name]. Continue now?"
- And I can click the notification to navigate to the course
- And I receive an email reminder if email notifications are enabled
- And reminders are more frequent for mandatory courses approaching deadline

**Technical Tasks:**
- [ ] Implement notification trigger logic (backend cron job or frontend polling)
- [ ] Create notification display in bell icon dropdown
- [ ] Add click handler to navigate to course
- [ ] Integrate email notification (API call)
- [ ] Create NotificationItem component (React)
- [ ] Add notification preferences check
- [ ] Style notification with Tailwind
- [ ] Test reminder frequency and accuracy

**Story Points**: 5

---

### Story 7.2: Receive New Course Notifications
**As a** learner
**I want to** be notified when new courses are assigned to me
**So that** I can start them promptly

**Acceptance Criteria:**
- Given a new course is assigned to me
- When the assignment is made
- Then I receive an in-app notification immediately
- And the notification shows the course name and a "View Course" button
- And a badge appears on the bell icon showing unread notification count
- And I receive an email notification if enabled
- And clicking the notification navigates to the course page

**Technical Tasks:**
- [ ] Set up real-time notification delivery (WebSocket or polling)
- [ ] Create notification badge on bell icon
- [ ] Implement unread count logic
- [ ] Add notification click handler for navigation
- [ ] Integrate email notification
- [ ] Create toast notification for immediate alert
- [ ] Style notifications with Tailwind
- [ ] Test real-time delivery

**Story Points**: 5

---

### Story 7.3: Receive Achievement Notifications
**As a** learner
**I want to** be notified when I unlock achievements, badges, or milestones
**So that** I feel recognized and motivated

**Acceptance Criteria:**
- Given I complete a course, unlock a badge, or achieve a milestone
- When the achievement is recorded
- Then I see a celebratory modal or toast notification
- And the notification shows confetti or celebratory animation
- And the notification describes the achievement
- And I can share the achievement on social media
- And the notification appears in my notification history

**Technical Tasks:**
- [ ] Create AchievementModal component with celebration design (React)
- [ ] Integrate confetti animation library (react-confetti)
- [ ] Add social media share buttons
- [ ] Implement notification trigger on achievement events
- [ ] Create achievement badge display
- [ ] Style modal with Tailwind (red and white theme)
- [ ] Add sound effect (optional)
- [ ] Test achievement flow end-to-end

**Story Points**: 5

---

### Story 7.4: Manage Notification Preferences
**As a** learner
**I want to** control which notifications I receive and how often
**So that** I'm not overwhelmed by alerts

**Acceptance Criteria:**
- Given I want to customize my notification settings
- When I navigate to notification preferences in settings
- Then I see toggle switches for each notification category
- And I can enable/disable in-app, email, and push notifications independently
- And I can set notification frequency (instant, daily digest, weekly digest)
- And I can configure quiet hours
- And I can enable Do Not Disturb mode
- And my preferences are saved and applied immediately

**Technical Tasks:**
- [ ] Create NotificationSettings component (React)
- [ ] Implement toggle switches with controlled state
- [ ] Add frequency selection dropdown
- [ ] Create quiet hours time picker
- [ ] Implement DND mode toggle
- [ ] Create mutation for saving preferences (React Query)
- [ ] Add TypeScript interfaces for settings
- [ ] Style settings page with Tailwind
- [ ] Add validation and success feedback

**Story Points**: 5

---

## Epic 8: GMFC Coins and Gamification

### Story 8.1: Earn GMFC Coins
**As a** learner
**I want to** earn GMFC Coins for completing activities
**So that** I feel rewarded for my learning efforts

**Acceptance Criteria:**
- Given I complete qualifying activities (course completion, quiz pass, streak achievement)
- When the activity is recorded
- Then coins are automatically added to my balance
- And I see an animated counter updating my coin total
- And I receive a notification showing how many coins I earned and why
- And the transaction is recorded in my coin history

**Technical Tasks:**
- [ ] Implement coin awarding logic (backend integration)
- [ ] Create animated coin counter component (React + CountUp.js)
- [ ] Display coin balance in navbar
- [ ] Create coin notification toast
- [ ] Record transaction in coin history
- [ ] Set up React Query mutations for coin operations
- [ ] Add TypeScript interfaces for transactions
- [ ] Style coin display with Tailwind (gold coin icon)

**Story Points**: 5

---

### Story 8.2: View Coin Transaction History
**As a** learner
**I want to** see my complete coin transaction history
**So that** I can track how I've earned coins

**Acceptance Criteria:**
- Given I have earned coins
- When I navigate to my coin history
- Then I see a list of all transactions with date, amount, and reason
- And I can filter by transaction type (course completion, quiz bonus, streak, etc.)
- And I can search by course name
- And transactions are sorted by most recent first
- And I can export history to CSV

**Technical Tasks:**
- [ ] Create CoinHistory component (React)
- [ ] Implement useCoinHistory hook with React Query
- [ ] Add filtering and search functionality
- [ ] Create transaction list with date formatting
- [ ] Implement CSV export
- [ ] Style transaction list with Tailwind (table or list view)
- [ ] Add pagination or infinite scroll
- [ ] Add empty state for no transactions

**Story Points**: 5

---

### Story 8.3: View and Unlock Badges
**As a** learner
**I want to** see available badges and my progress toward unlocking them
**So that** I'm motivated to achieve higher levels

**Acceptance Criteria:**
- Given badge system is enabled
- When I navigate to badges page
- Then I see all badge levels (Bronze, Silver, Gold, Platinum, Diamond)
- And I see which badges I've earned
- And I see progress toward next badge level
- And I can click on a badge to see its requirements
- And I receive celebration notification when I unlock a badge

**Technical Tasks:**
- [ ] Create BadgesGallery component (React)
- [ ] Implement useBadges hook with React Query
- [ ] Create badge card components showing locked/unlocked states
- [ ] Add progress bar for next badge level
- [ ] Create badge detail modal with requirements
- [ ] Implement badge unlock celebration animation
- [ ] Style badges with gradient backgrounds (Tailwind)
- [ ] Add TypeScript interfaces for badge data

**Story Points**: 8

---

### Story 8.4: View Coin Earning Rules
**As a** learner
**I want to** understand how to earn GMFC Coins
**So that** I can maximize my earnings

**Acceptance Criteria:**
- Given I want to learn about coin earning
- When I hover over the coin icon or view help section
- Then I see a tooltip or page explaining all earning rules
- And the rules include course completion, quiz scores, streaks, achievements, etc.
- And I see examples of how many coins each activity awards
- And the information is clear and concise

**Technical Tasks:**
- [ ] Create CoinRulesInfo component (React)
- [ ] Add tooltip to coin icon (react-tooltip)
- [ ] Create dedicated help page for coin system
- [ ] List all earning rules with coin amounts
- [ ] Add examples and icons
- [ ] Style with Tailwind (info cards or list)
- [ ] Make it accessible from dashboard
- [ ] Add to FAQ or help section

**Story Points**: 2

---

**Total Story Points for LMS Module**: 135 points

---

This document contains all user stories for the LMS (Learner Experience) module, organized by epic and ready for sprint planning and development.
