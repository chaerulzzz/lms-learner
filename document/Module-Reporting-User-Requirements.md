# Module 2: Reporting (HC Version) - User Requirements

## Document Information
- **Document Version**: 1.0
- **Date**: January 28, 2026
- **Project Name**: Web-Based Training Platform LMS
- **Module**: Module 2 - Reporting (HC Version)
- **Technology Stack**: ReactJS, React Query, Tailwind CSS, TypeScript
- **Color Theme**: Crimson Red (#DC143C) and White (#FFFFFF)

---

## Table of Contents
1. [Module Overview](#module-overview)
2. [User Roles](#user-roles)
3. [User Requirements](#user-requirements)
4. [Non-Functional Requirements](#non-functional-requirements)
5. [Technical Stack](#technical-stack)

---

## Module Overview

### Purpose
The Reporting module provides HC (Human Capital) administrators and managers with comprehensive tools to monitor, analyze, and report on employee training progress, course effectiveness, and organizational learning metrics.

### Target Users
- **HC Admin**: Full access to all reporting features, can view all employees and departments
- **Reporting Viewer**: Read-only access to reports and dashboards
- **Department Manager**: Access restricted to their department's data only

### Key Features
- Employee progress monitoring with advanced filtering
- Course performance analytics
- Department comparison and analytics
- Downloadable reports (Excel, CSV, PDF)
- Real-time monitoring dashboard
- Access control based on user role

---

## User Roles

### HC Admin
**Full administrator of the reporting module**

**Responsibilities:**
- Monitor all employee training progress across organization
- Generate and download comprehensive reports
- Analyze course effectiveness and completion rates
- Compare department performance
- Send reminders to employees
- Assign courses to employees (if applicable)
- Configure reporting settings

**Access Level:**
- Full access to all reports and data
- Can view all employees regardless of department
- Can perform actions (send reminders, assign courses)
- Can export all data
- Can access real-time monitoring dashboard

---

### Reporting Viewer
**Read-only observer of training data**

**Responsibilities:**
- View reports and dashboards
- Monitor employee progress
- Analyze trends and metrics
- Share insights with leadership

**Access Level:**
- Read-only access to all reports
- Cannot perform actions (no send reminders, no assign courses)
- Limited or no export capabilities
- Cannot modify any data
- Cannot access sensitive employee information

---

### Department Manager
**Manager with department-specific access**

**Responsibilities:**
- Monitor their department's training progress
- View reports for direct reports only
- Identify training gaps within department
- Support team members in training completion

**Access Level:**
- Access restricted to own department data only
- Can view employee progress for department members
- Can send reminders to department employees (optional)
- Cannot view other departments' data
- Limited export capabilities (department data only)

---

## User Requirements

### UR-REPORT-001: Employee Progress Dashboard
**Priority**: High
**User Role**: HC Admin, Reporting Viewer, Department Manager

**Description:**
A comprehensive dashboard for HC administrators to monitor all employees' learning progress, with advanced filtering, searching, and sorting capabilities.

**Functional Requirements:**
- **Employee Data Display**:
  - Employee name and ID
  - Department/division
  - Role/position
  - Total courses assigned
  - Courses in progress (count)
  - Courses completed (count)
  - Overall completion percentage
  - Total learning hours
  - Last activity date
  - GMFC Coins earned
  - Current badge level
  - Enrollment date (when user joined LMS)

- **Filtering Options**:
  - **Department/Division Filter**:
    - Dropdown with all departments
    - Multi-select capability
    - "All Departments" option
  - **Status Filter**:
    - Not started (0% progress)
    - In progress (1-99% progress)
    - Completed (100% progress)
    - Overdue (mandatory courses past deadline)
  - **Role/Position Filter**:
    - Filter by job role or position
    - Multi-select capability
  - **Date Range Filter**:
    - Last activity date range
    - Enrollment date range
    - Custom date picker
  - **Completion Percentage Range**:
    - Slider or input fields (e.g., 0-30%, 31-70%)
    - Quick filters (Low: 0-30%, Medium: 31-70%, High: 71-100%)
  - **Badge Level Filter**:
    - Filter by badge level (Bronze, Silver, Gold, etc.)

- **Search Functionality**:
  - Search by employee name (first name, last name, full name)
  - Search by employee ID
  - Search by department name
  - Real-time search with debouncing
  - Search suggestions/autocomplete

- **Sorting Options**:
  - Sort by name (A-Z, Z-A)
  - Sort by completion percentage (ascending/descending)
  - Sort by last activity date (most recent/oldest)
  - Sort by department (alphabetical)
  - Sort by courses completed (highest/lowest)
  - Sort by total learning hours (highest/lowest)
  - Column header click to sort

- **Pagination**:
  - Support for large datasets (10,000+ employees)
  - Configurable page size (10, 25, 50, 100 per page)
  - Page number navigation
  - "Go to page" input
  - Total count display

- **Bulk Actions**:
  - Select multiple employees (checkboxes)
  - Select all on current page
  - Select all matching filter
  - Bulk export to Excel/CSV
  - Bulk send reminder notifications

- **Employee Detail View**:
  - Click on employee row to view detailed progress
  - Modal or navigate to dedicated page
  - Comprehensive individual report

- **Data Refresh**:
  - Manual refresh button
  - Auto-refresh every 60 seconds
  - Last updated timestamp displayed

**Technical Implementation:**
- **ReactJS**:
  - EmployeeProgressDashboard component with data table
  - Custom hooks for employee data management (useEmployeeProgress)
  - Advanced FilterPanel component with multiple filter controls
  - SearchBar with debounced input
  - Sortable table headers (react-table or @tanstack/react-table)
  - Pagination component with page size selector
  - EmployeeDetail modal/page
  - BulkActions toolbar component
- **TypeScript**:
  - Employee interface with all fields
  - ProgressSummary interface
  - FilterCriteria interface
  - SortConfig interface
  - Type-safe filtering and sorting functions
  - Enum for filter types, sort directions, employee status
- **React Query**:
  - Query for fetching employee list with pagination (/api/reporting/employees)
  - Query parameters for filters, search, sorting, pagination
  - Optimistic updates for bulk actions
  - Background refetch every 60 seconds (refetchInterval)
  - Cache management for large datasets
  - Prefetching next page for faster navigation
- **Tailwind**:
  - Responsive table design with horizontal scroll on mobile
  - FilterPanel with dropdowns, inputs, date pickers
  - Search bar styling with icon
  - Pagination controls (flex, gap-2)
  - Color-coded status indicators (badges)
  - Data grid layout for card view alternative (mobile-friendly)
  - Loading skeletons for table rows
- **Additional Libraries**:
  - react-table or @tanstack/react-table for advanced table features
  - Export functionality using xlsx library (SheetJS)
  - date-fns for date formatting and manipulation

**Acceptance Criteria:**
- ✓ Dashboard loads employee list within 3 seconds for 1,000 employees
- ✓ All filters apply immediately with visual feedback (< 500ms)
- ✓ Search returns results within 1 second
- ✓ Sorting works correctly for all columns
- ✓ Pagination handles 10,000+ employees efficiently
- ✓ Clicking employee opens detailed progress view
- ✓ Bulk actions work for selected employees (select 50, export all 50)
- ✓ Export generates complete dataset without data loss
- ✓ Responsive design works on tablet and desktop
- ✓ Auto-refresh updates data without disrupting user interaction
- ✓ Role-based access control: Department Managers see only their department

---

### UR-REPORT-002: Employee Detail View
**Priority**: High
**User Role**: HC Admin, Reporting Viewer, Department Manager

**Description:**
Detailed view of an individual employee's complete learning journey, including all courses, quizzes, certificates, and activity timeline.

**Functional Requirements:**
- **Employee Information**:
  - Full name, employee ID
  - Profile photo (if available)
  - Department, role, manager name
  - Contact information (email, phone)
  - Start date, employment status
  - LMS enrollment date

- **Learning Summary**:
  - Total courses assigned
  - Courses in progress (count)
  - Courses completed (count)
  - Overall completion rate (percentage)
  - Total learning hours
  - GMFC Coins balance
  - Badge level and achievements
  - Current learning streak (consecutive days)
  - Average quiz score

- **Course-by-Course Breakdown**:
  - List of all courses (assigned, in progress, completed)
  - For each course:
    - Course name and category
    - Mandatory/optional indicator
    - Progress percentage
    - Time spent (hours:minutes)
    - Start date
    - Last accessed date
    - Completion date (if completed)
    - Due date (if mandatory)
    - Status (not started, in progress, completed, overdue)
  - Quiz attempts and scores per course
  - Certificate status and download link
  - Expandable rows for detailed view

- **Quiz Performance**:
  - All quiz attempts with dates and scores
  - Pass/fail status per attempt
  - Number of attempts used
  - Average quiz score across all courses
  - Best score per quiz
  - Question-level performance analysis (optional)
  - Weakest topics identification

- **Activity Timeline**:
  - Chronological log of all learning activities
  - Events include:
    - Course starts
    - Video views (lesson names)
    - Material downloads
    - Quiz attempts (with scores)
    - Course completions
    - Certificate awards
    - Badge unlocks
  - Visual timeline with dates and icons
  - Filterable by activity type
  - Searchable by course or activity

- **Certificates**:
  - List of all earned certificates
  - Certificate preview (thumbnail or modal)
  - Download certificate button (if permitted)
  - Issue date and certificate ID

- **Performance Charts**:
  - Progress trend over time (line chart showing cumulative completion)
  - Course completion distribution (pie chart: completed, in progress, not started)
  - Quiz score trends (bar chart showing scores over time)
  - Monthly activity heatmap (GitHub-style)
  - Learning hours per week/month (bar chart)

- **Action Buttons** (for HC Admin):
  - Send reminder notification
  - Assign new course
  - Download employee report (PDF with all data)
  - Export data (CSV with all records)
  - View full activity log

**Technical Implementation:**
- **ReactJS**:
  - EmployeeDetail component with multiple sections (tabs or accordion)
  - EmployeeHeader component (photo, name, summary stats)
  - CourseList component with expandable rows
  - ActivityTimeline component with chronological display
  - PerformanceCharts component with multiple chart types
  - CertificateGallery component with preview
  - ActionToolbar component with buttons
  - Custom hooks:
    - useEmployeeDetail (fetch detailed employee data)
    - useEmployeeTimeline (fetch activity log)
    - useEmployeeCharts (fetch chart data)
- **TypeScript**:
  - Comprehensive Employee interface with nested data structures
  - CourseProgress interface
  - TimelineEvent interface with discriminated union for event types
  - ChartData interfaces (LineChartData, PieChartData, etc.)
  - Action permission types based on user role
- **React Query**:
  - Detailed query for employee data (/api/reporting/employees/:id)
  - Separate queries for timeline, certificates, performance data (parallel queries)
  - Mutations for sending reminders and assigning courses
  - Prefetching for quick navigation between employees (prefetch on hover)
  - Cache management for employee details
- **Charting**:
  - Recharts for all performance visualizations
  - LineChart for progress trends
  - PieChart for completion distribution
  - BarChart for quiz scores and learning hours
  - Heatmap for activity calendar
- **Tailwind**:
  - Multi-section layout with tabs or vertical navigation
  - Timeline component styling with icons and lines
  - Chart containers with consistent design (rounded-lg, shadow, p-6)
  - Responsive design for all sections
  - Action button toolbar (flex, gap-2, justify-end)
  - Expandable course rows with smooth transition

**Acceptance Criteria:**
- ✓ Employee detail loads within 2 seconds
- ✓ All data is accurate and up-to-date
- ✓ Charts render correctly and are interactive (tooltips on hover)
- ✓ Timeline shows all activities in chronological order
- ✓ Action buttons work correctly (send reminder triggers notification)
- ✓ Report download generates comprehensive PDF with all data
- ✓ CSV export includes all employee data in tabular format
- ✓ Navigation between employees is smooth with prefetching
- ✓ Role-based permissions applied (Reporting Viewer cannot send reminders)
- ✓ Responsive design works on tablet and desktop

---

### UR-REPORT-003: Course Report
**Priority**: High
**User Role**: HC Admin, Reporting Viewer

**Description:**
Comprehensive reporting on individual courses, showing completion rates, average scores, time spent, and learner engagement metrics.

**Functional Requirements:**
- **Course Overview**:
  - Course name, ID, category
  - Course description and learning objectives
  - Course duration (estimated hours)
  - Content overview (number of modules, lessons, quizzes)
  - Mandatory/optional status
  - Assigned date range (when course was active)
  - Total materials available

- **Enrollment Statistics**:
  - Total learners assigned to course
  - Learners who started (enrollment rate %)
  - Learners in progress (count and %)
  - Learners completed (count and %)
  - Learners not started (count and %)
  - Completion rate (completed / assigned %)
  - Dropout rate (started but not completed %)

- **Performance Metrics**:
  - Average quiz score across all learners
  - Pass rate (% of learners who passed quiz)
  - Fail rate (% of learners who failed after all attempts)
  - Average number of quiz attempts
  - Average time spent on course (hours:minutes)
  - Average time to completion (from start to finish)
  - Fastest completion time
  - Slowest completion time
  - Median completion time

- **Engagement Metrics**:
  - Video view counts per lesson
  - Material download counts per file
  - Average watch time per video
  - Video completion rate (% who watched to end)
  - Rewind/replay frequency (engagement indicator)
  - Most skipped sections/lessons
  - Drop-off rate at each module (funnel analysis)

- **Learner List**:
  - Table of all assigned learners with:
    - Name, department, role
    - Status (not started, in progress, completed, failed)
    - Progress percentage
    - Quiz score
    - Time spent
    - Start date, last accessed date, completion date
  - Sortable by all columns
  - Filterable by status, department, completion %
  - Searchable by name
  - Export to Excel/CSV

- **Comparative Analysis**:
  - Comparison with other courses in same category
  - Benchmark against organizational averages:
    - Average completion rate across all courses
    - Average quiz pass rate
    - Average time to complete
  - **Top Performers**:
    - Learners with highest scores (top 10)
    - Fastest completions
  - **Learners Needing Assistance**:
    - Low progress (< 30% after 14 days)
    - Failed quizzes (multiple attempts)
    - Overdue completions

- **Visualizations**:
  - **Completion Funnel**:
    - Assigned → Started → In Progress → Completed
    - Visual funnel chart showing drop-off at each stage
  - **Score Distribution Histogram**:
    - X-axis: Score ranges (0-50%, 51-70%, 71-85%, 86-100%)
    - Y-axis: Number of learners
  - **Progress Over Time (Line Chart)**:
    - X-axis: Dates
    - Y-axis: Cumulative completions
    - Shows completion trend
  - **Department Comparison (Bar Chart)**:
    - X-axis: Departments
    - Y-axis: Completion rate %
    - Compare performance across departments

- **Export Options**:
  - Download course report (PDF with charts and tables)
  - Export learner list (Excel/CSV)
  - Export engagement metrics (Excel)

**Technical Implementation:**
- **ReactJS**:
  - CourseReport component with multiple sections
  - CourseOverview component (summary stats cards)
  - StatisticsCards component for key metrics
  - CompletionFunnel visualization component
  - LearnerList with filtering and sorting (react-table)
  - EngagementCharts component (multiple charts)
  - ComparativeAnalysis component
  - TopPerformers and NeedingAssistance lists
  - ExportButtons component
- **TypeScript**:
  - CourseReport interface with all metrics
  - EnrollmentStats interface
  - PerformanceMetrics interface
  - EngagementMetrics interface
  - LearnerProgress interface
  - Type-safe data aggregation functions
- **React Query**:
  - Query for course report data (/api/reporting/courses/:courseId)
  - Query for learner list with pagination
  - Query for engagement metrics
  - Background refetch every 2 minutes
  - Parallel queries for different data sections
- **Charting**:
  - Recharts for all visualizations
  - Custom FunnelChart component
  - Histogram (BarChart with custom bins)
  - LineChart for progress trends
  - BarChart for department comparison
- **Tailwind**:
  - Dashboard layout with stat cards (grid-cols-1 md:grid-cols-3)
  - Chart containers with responsive design
  - Tables with sorting and filtering
  - Color-coded metrics (green for good, red for poor completion rates)
  - Export buttons styled consistently

**Acceptance Criteria:**
- ✓ Course report loads within 3 seconds
- ✓ All metrics are calculated accurately
- ✓ Completion funnel displays correct progression (no data loss between stages)
- ✓ Learner list shows all assigned employees
- ✓ Charts are interactive and responsive
- ✓ Filtering and sorting work correctly on learner list
- ✓ Comparative analysis provides meaningful insights
- ✓ Export generates comprehensive course report with all data and charts
- ✓ Score distribution histogram accurately reflects score ranges
- ✓ Drop-off analysis identifies problematic modules

---

### UR-REPORT-004: Downloadable Reports
**Priority**: High
**User Role**: HC Admin

**Description:**
Generate and download comprehensive training reports in Excel/CSV format for offline analysis and record-keeping.

**Functional Requirements:**
- **Report Types**:
  1. **Employee Progress Report**:
     - All employees with complete progress data
     - Columns: Name, ID, Department, Role, Courses Assigned, In Progress, Completed, Completion %, Learning Hours, Last Activity, Coins, Badge
  2. **Course Report**:
     - Complete data for specific course
     - Enrollment stats, performance metrics, learner list
  3. **Department Report**:
     - Aggregated data by department
     - Department comparison metrics
  4. **Time Period Report**:
     - Training activities within custom date range
     - Completions, enrollments, quiz attempts in period
  5. **Certificate Report**:
     - All certificates issued
     - Columns: Certificate ID, Employee Name, Course Name, Issue Date, Verification Link
  6. **Quiz Performance Report**:
     - Detailed quiz results across all courses
     - Columns: Employee, Course, Quiz, Attempts, Score, Pass/Fail, Date

- **Report Content**:
  - All relevant data fields based on report type
  - Formatted columns with clear headers
  - Summary statistics at top or bottom
  - Timestamp of report generation
  - Generated by (user name)
  - Filters applied (if any) shown in report
  - Organization logo/branding (optional)

- **Download Formats**:
  - **Excel (.xlsx)**:
    - Formatted sheets with styling
    - Multiple sheets for complex reports
    - Column auto-sizing
    - Header row frozen
    - Summary sheet with charts
  - **CSV (.csv)**:
    - Simple comma-separated values
    - For easy import to other tools
    - UTF-8 encoding
  - **PDF** (optional for formal reports):
    - Professional formatting
    - Charts and tables included
    - Print-ready layout

- **Report Customization**:
  - **Select Date Range**:
    - Custom start and end dates
    - Quick presets (This Week, This Month, This Quarter, This Year, Last 30 Days, Last 90 Days)
  - **Select Departments/Courses**:
    - Multi-select departments to include
    - Multi-select courses to include
    - "Select All" option
  - **Select Data Fields**:
    - Checkboxes for each available field
    - Show/hide specific columns
    - Reorder columns (optional)
  - **Choose Format**:
    - Radio buttons: Excel, CSV, PDF
    - Format-specific options (e.g., include charts in Excel)
  - **Summary Options**:
    - Include summary statistics
    - Include charts (for Excel/PDF)
    - Include raw data vs. aggregated data

- **Report Generation**:
  - Generate button with loading state
  - Progress indicator for large reports
  - Estimated time to completion
  - Download automatically starts when ready
  - Option to email report to self or others
  - Save report configuration for reuse

- **Scheduling** (Future Enhancement):
  - Schedule automatic report generation
  - Email delivery of reports
  - Recurring reports (daily, weekly, monthly)
  - Configure recipients
  - Report templates

**Technical Implementation:**
- **ReactJS**:
  - ReportGenerator component with form controls
  - ReportTypeSelector component (radio buttons or dropdown)
  - DateRangePicker component (react-datepicker or custom)
  - DepartmentSelector component (multi-select)
  - FieldSelector component (checkboxes for columns)
  - FormatSelector component (radio buttons)
  - GenerateButton with loading state
  - ProgressBar component for generation status
  - SaveConfigModal for saving report templates
- **TypeScript**:
  - ReportConfig interface with all options:
    ```typescript
    interface ReportConfig {
      type: ReportType;
      dateRange: { start: Date; end: Date };
      departments?: string[];
      courses?: string[];
      fields: string[];
      format: 'excel' | 'csv' | 'pdf';
      includeSummary: boolean;
      includeCharts: boolean;
    }
    ```
  - ReportData interface for each report type
  - Type-safe report generation functions
  - Validation for report configuration
- **React Query**:
  - Mutation for triggering report generation (/api/reporting/generate)
  - Download blob handling
  - Progress tracking for large reports (polling or WebSocket)
  - Error handling for failed generation
- **Export Libraries**:
  - **xlsx** (SheetJS) for Excel generation:
    - Create workbook with multiple sheets
    - Style cells and headers
    - Auto-size columns
    - Add charts to Excel (with recharts or manually)
  - **csv-stringify** for CSV generation
  - **jsPDF** or server-side rendering for PDF reports
- **Tailwind**:
  - Form layout for report configuration (space-y-4)
  - Date picker styling
  - Multi-select dropdowns
  - Checkbox groups for field selection
  - Download button styling (bg-primary-red, hover effect)
  - Progress bar (animated, w-full, h-2, bg-blue-500)

**Acceptance Criteria:**
- ✓ Report configuration form is intuitive and easy to use
- ✓ Date range picker works correctly with quick presets
- ✓ Generated Excel files have properly formatted columns and headers
- ✓ CSV files open correctly in Excel and Google Sheets
- ✓ PDF reports include charts and proper formatting (if format selected)
- ✓ Large reports (10,000+ rows) generate without errors
- ✓ Download completes successfully across all browsers (Chrome, Firefox, Safari, Edge)
- ✓ Generated files include accurate, complete data (no truncation)
- ✓ Report generation completes within 10 seconds for 1,000 records
- ✓ Progress indicator shows accurate progress percentage
- ✓ Email delivery works and sends report as attachment
- ✓ Save configuration allows reuse of report settings

---

### UR-REPORT-005: Department Analytics
**Priority**: Medium
**User Role**: HC Admin, Reporting Viewer

**Description:**
Aggregate analytics and comparisons across departments to identify trends, top-performing teams, and areas needing attention.

**Functional Requirements:**
- **Department Comparison**:
  - Table comparing all departments side-by-side
  - **Metrics per Department**:
    - Employee count
    - Courses assigned (average per employee)
    - Completion rate (overall %)
    - Average quiz score
    - Total learning hours
    - Average learning hours per employee
    - GMFC Coins earned (total and average)
    - Employees with 100% completion (count and %)
    - Overdue courses (count)
  - Ranking of departments by each metric (1st, 2nd, 3rd, etc.)
  - Visual indicators for top performers (green) and bottom performers (red)
  - Sortable by any metric
  - Exportable to Excel/CSV

- **Department Detail View**:
  - Click department row to see detailed breakdown
  - **Detailed Information**:
    - List of all employees in department (with progress)
    - Department-specific courses assigned
    - Most completed courses in department
    - Least completed courses (potential issues)
    - Average completion time per course
    - Common training gaps (courses not completed)
    - Top performers in department (highest completion/scores)
    - Employees needing assistance (low progress)
  - **Department Progress Trend**:
    - Line chart showing completion rate over time
    - Monthly or quarterly data points
  - Export department detail report

- **Trend Analysis**:
  - Department performance over time (month-over-month, quarter-over-quarter)
  - Improvement or decline indicators (↑↓ arrows with percentage change)
  - Seasonal patterns identification
  - Goal tracking (vs. target completion rates)
  - Historical data comparison (this quarter vs. last quarter)

- **Visualizations**:
  - **Bar Chart**: Comparing department completion rates (horizontal bars, sorted)
  - **Heatmap**: Showing activity levels by department and month
  - **Line Chart**: Showing trend over time for selected departments (multi-line)
  - **Radar Chart** (optional): Comparing departments across multiple metrics
  - **Treemap** (optional): Visualizing departments by size (employee count) and color by completion rate

- **Insights and Recommendations**:
  - Automatic insights generation:
    - "IT Department has highest completion rate (95%)"
    - "Sales Department needs attention (45% completion rate)"
    - "HR Department showing improvement (+15% vs. last month)"
  - Actionable recommendations:
    - "Send reminders to Sales Department employees with overdue courses"
    - "Share best practices from IT Department with other teams"

- **Export**:
  - Download department comparison report (Excel with all metrics)
  - Download trend analysis report (Excel with charts)

**Technical Implementation:**
- **ReactJS**:
  - DepartmentAnalytics component (main dashboard)
  - DepartmentComparison table component (sortable)
  - DepartmentDetail modal or page
  - TrendChart component (line chart with date range selector)
  - InsightsPanel component (auto-generated insights)
  - ComparisonCharts component (bar, heatmap, radar)
  - Custom hooks:
    - useDepartmentAnalytics (fetch all department data)
    - useDepartmentDetail (fetch specific department details)
    - useDepartmentTrends (fetch time-series data)
- **TypeScript**:
  - DepartmentMetrics interface:
    ```typescript
    interface DepartmentMetrics {
      departmentId: string;
      departmentName: string;
      employeeCount: number;
      completionRate: number;
      averageScore: number;
      totalLearningHours: number;
      avgLearningHoursPerEmployee: number;
      coinsEarned: number;
      ranking: number;
    }
    ```
  - DepartmentTrend interface
  - Comparison data types
  - Type-safe ranking and sorting functions
- **React Query**:
  - Query for department analytics (/api/reporting/departments)
  - Query for department detail (/api/reporting/departments/:id)
  - Query for trend data (/api/reporting/departments/trends)
  - Aggregated data fetching
  - Background refetch every 5 minutes
- **Charting**:
  - Recharts for all visualizations
  - BarChart for comparison (horizontal bars with labels)
  - LineChart for trend analysis (multi-line, legend, tooltips)
  - Heatmap with custom cells (color scale from red to green)
  - RadarChart for multi-metric comparison (optional)
- **Tailwind**:
  - Comparison table with color coding (text-green-600 for top, text-red-600 for bottom)
  - Chart containers with consistent styling
  - Heatmap styling (grid layout with colored cells)
  - Department detail modal (full-width or large modal)
  - Insights panel with icon and highlighted text

**Acceptance Criteria:**
- ✓ Department comparison table displays all departments with accurate metrics
- ✓ Metrics are calculated correctly (aggregations match individual employee data)
- ✓ Clicking department opens detail view with comprehensive data
- ✓ Charts visualize data clearly and accurately
- ✓ Trends show accurate month-over-month or quarter-over-quarter changes
- ✓ Improvement/decline indicators are correct (positive/negative change)
- ✓ Export generates comprehensive comparison report with all metrics
- ✓ Sorting works for all columns
- ✓ Heatmap clearly shows activity patterns across time
- ✓ Insights are relevant and actionable

---

### UR-REPORT-006: Real-Time Monitoring Dashboard
**Priority**: Medium
**User Role**: HC Admin

**Description:**
Live dashboard showing current training activity across the organization with real-time updates.

**Functional Requirements:**
- **Live Metrics**:
  - **Current Active Learners**:
    - Number of learners watching videos right now
    - Number of learners taking quizzes right now
    - Names of active learners (list)
  - **Courses in Progress** (right now):
    - Active course sessions count
    - Most active courses (highest concurrent users)
  - **Recent Completions**:
    - Last hour completions (count)
    - Last 24 hours completions (count)
    - List of recent completions (last 10) with timestamps
  - **Recent Certificate Issuances**:
    - Certificates issued today
    - Recent certificates (last 10) with employee names
  - **System Health**:
    - Total users online
    - API response time (average)
    - Video streaming status (operational/degraded)

- **Activity Feed**:
  - Real-time stream of training events
  - **Event Types**:
    - Course starts (Employee X started Course Y)
    - Course completions (Employee X completed Course Y)
    - Quiz passes (Employee X passed Quiz Y with score Z%)
    - Quiz failures (Employee X failed Quiz Y)
    - Certificate awards (Employee X earned certificate for Course Y)
    - Badge unlocks (Employee X unlocked Gold badge)
  - Event details: Employee name, course name, timestamp, icon
  - Auto-scrolling feed (newest at top)
  - Filterable by event type
  - Searchable by employee or course name
  - Pause auto-scroll button

- **Quick Stats** (Today's Activity):
  - Today's completions (count and % vs. yesterday)
  - Today's new enrollments (count)
  - Today's learning hours (total)
  - Week-to-date comparison:
    - This week vs. last week completions
    - This week vs. last week learning hours
  - Monthly progress toward goal (if goals set)

- **Alerts**:
  - **Low Completion Rate Alerts**:
    - Course completion rate dropped below threshold (e.g., 60%)
    - Department completion rate below threshold
  - **Overdue Mandatory Training Alerts**:
    - X employees with overdue mandatory courses
    - Specific courses overdue by many employees
  - **System Issues Alerts**:
    - High API latency
    - Video streaming issues
    - Database connection issues
  - **High Failure Rate on Quizzes**:
    - Quiz Y has 80% failure rate (potential issue with quiz or content)
  - Alert severity levels: Critical (red), Warning (yellow), Info (blue)
  - Dismissable alerts
  - Alert history log

- **Data Refresh**:
  - Auto-refresh every 5-10 seconds
  - Manual refresh button
  - Last updated timestamp
  - Real-time via WebSocket (preferred) or polling

**Technical Implementation:**
- **ReactJS**:
  - LiveDashboard component (main layout)
  - LiveMetrics component with stat cards
  - ActivityFeed component with auto-scroll
  - QuickStats component (today's data)
  - AlertsPanel component with severity levels
  - SystemHealth component (status indicators)
  - Custom hooks:
    - useLiveActivity (fetch live data with short refetch interval)
    - useWebSocket (WebSocket connection for real-time events)
    - useAlerts (fetch and manage alerts)
- **TypeScript**:
  - LiveEvent interface:
    ```typescript
    interface LiveEvent {
      id: string;
      type: EventType;
      employeeName: string;
      courseName?: string;
      quizName?: string;
      score?: number;
      timestamp: Date;
    }
    ```
  - Alert interface with severity enum
  - LiveMetrics interface
  - Type-safe event handlers
- **React Query**:
  - Query with short refetchInterval (5-10 seconds) for live updates:
    - /api/reporting/live/metrics
    - /api/reporting/live/events
    - /api/reporting/live/alerts
  - WebSocket integration for true real-time (optional, preferred)
  - Optimistic updates for dismissed alerts
- **WebSocket** (Optional, Recommended):
  - WebSocket connection to backend for real-time events
  - Push notifications for new events instead of polling
  - Reconnection logic on disconnect
  - Use Socket.io or native WebSocket API
- **Tailwind**:
  - Dashboard grid layout (grid-cols-1 lg:grid-cols-3)
  - Stat cards with animated numbers (transition-all)
  - Activity feed styling with scroll (overflow-y-auto, max-h-96)
  - Alert styling with colors (bg-red-50 for critical, bg-yellow-50 for warning)
  - Animated updates (fade-in for new events)
  - Pulse animation for live indicators (animate-pulse)

**Acceptance Criteria:**
- ✓ Dashboard updates every 5-10 seconds with latest data
- ✓ Activity feed shows recent events in real-time (or near real-time)
- ✓ Quick stats are accurate and current (match today's actual data)
- ✓ Alerts appear immediately when triggered (< 10 seconds delay)
- ✓ Performance remains smooth with frequent updates (no lag or stuttering)
- ✓ Auto-scroll works smoothly without disrupting user if they scroll up
- ✓ Pause auto-scroll button stops new events from scrolling
- ✓ Filters apply to activity feed correctly
- ✓ Alert dismissal works and alerts don't reappear
- ✓ System health indicators show accurate status

---

### UR-REPORT-007: Advanced Filtering and Search
**Priority**: High
**User Role**: HC Admin, Reporting Viewer, Department Manager

**Description:**
Powerful filtering and search capabilities across all reporting views to quickly find specific data and insights.

**Functional Requirements:**
- **Multi-Criteria Filtering**:
  - Combine multiple filters simultaneously
  - Examples:
    - Department: "IT" + Status: "In Progress" + Date Range: "Last 30 Days" + Completion: "0-50%"
    - Role: "Manager" + Department: "Sales" + Status: "Overdue"
  - All filters apply with AND logic
  - Save filter combinations as presets

- **Filter Types**:
  - Dropdown filters (Department, Role, Status, Badge Level)
  - Date range filters with presets
  - Slider filters (Completion %, Learning Hours)
  - Multi-select filters (multiple departments, courses, etc.)
  - Boolean filters (Overdue: Yes/No, Mandatory Only: Yes/No)

- **Active Filters Display**:
  - Show active filter tags/chips above results
  - Each chip shows filter name and value (e.g., "Department: IT")
  - Click X on chip to remove individual filter
  - "Clear All Filters" button to reset
  - Filter count indicator (e.g., "5 filters active")

- **Advanced Search**:
  - **Full-text search** across:
    - Employee names (first name, last name)
    - Employee IDs
    - Course titles
    - Department names
  - Search as you type (debounced for performance)
  - Search suggestions/autocomplete:
    - Show matching results in dropdown as user types
    - Highlight matching text
  - Search history:
    - Save recent searches
    - Quick access to previous searches
  - Boolean operators (AND, OR, NOT) for power users (optional):
    - Example: "Sales AND Manager NOT completed"

- **Quick Filters**:
  - One-click filters for common scenarios
  - **Preset Quick Filters**:
    - "Overdue Mandatory Training" (Mandatory: Yes + Status: Overdue)
    - "Completed This Week" (Status: Completed + Date Range: This Week)
    - "Low Performers" (Completion: 0-30% + Active: > 14 days)
    - "High Performers" (Completion: 100% + Avg Score: > 90%)
    - "Inactive Users" (Last Activity: > 30 days ago)
    - "New Enrollments" (Enrolled: Last 7 days)
  - Displayed as buttons or dropdown
  - Highlight active quick filter
  - Can combine with other filters

- **Date Range Picker**:
  - **Custom date range selection**:
    - Start date and end date inputs
    - Calendar popup for easy selection
  - **Quick presets**:
    - Today
    - Yesterday
    - This Week
    - Last Week
    - This Month
    - Last Month
    - This Quarter
    - Last Quarter
    - This Year
    - Last Year
  - **Relative dates**:
    - Last 7 days
    - Last 30 days
    - Last 60 days
    - Last 90 days

- **Saved Filter Presets**:
  - Save current filter combination
  - Name the preset (e.g., "IT Department Overdue Training")
  - Access saved presets from dropdown
  - Edit or delete saved presets
  - Share presets with other users (optional)
  - Personal presets vs. team presets

- **Filter Persistence**:
  - Filters persist across page refreshes (localStorage)
  - Filters persist when navigating away and back
  - Option to clear filters on navigation

**Technical Implementation:**
- **ReactJS**:
  - FilterPanel component with multiple filter controls
  - FilterChip component for active filters
  - SearchBar component with autocomplete
  - QuickFilters component with preset buttons
  - DateRangePicker component (react-datepicker or custom)
  - SavedFilters dropdown component
  - SaveFilterModal for naming and saving presets
  - Custom hooks:
    - useFilters (manage filter state)
    - useSearch (handle search with debouncing)
    - useSavedFilters (load and save filter presets)
- **TypeScript**:
  - FilterState interface:
    ```typescript
    interface FilterState {
      departments: string[];
      roles: string[];
      status: string[];
      dateRange: { start: Date | null; end: Date | null };
      completionRange: { min: number; max: number };
      isOverdue: boolean;
      mandatoryOnly: boolean;
    }
    ```
  - FilterPreset interface
  - SearchQuery interface
  - Type-safe filter functions and validators
- **React Query**:
  - Dynamic query parameters based on filters:
    ```typescript
    const { data } = useQuery({
      queryKey: ['employees', filterState],
      queryFn: () => fetchEmployees(filterState),
    });
    ```
  - Debounced search queries (useDebouncedValue hook)
  - Query invalidation when filters change
- **Local Storage**:
  - Save filter state to localStorage on change
  - Load filter state from localStorage on mount
  - Save and load filter presets
- **Tailwind**:
  - Filter panel layout (grid, gap-4, p-4, bg-gray-50)
  - Filter chips (inline-flex, items-center, rounded-full, bg-blue-100)
  - Search bar styling (relative, with icon, rounded input)
  - Quick filter buttons (flex, gap-2, bg-white, border, hover:bg-gray-50)
  - Date picker styling (custom or library default)
  - Saved filters dropdown (max-h-60, overflow-y-auto)

**Acceptance Criteria:**
- ✓ Filters apply immediately when changed (< 500ms)
- ✓ Multiple filters work together correctly (AND logic)
- ✓ Search returns relevant results within 1 second
- ✓ Autocomplete shows suggestions as user types (after 2+ characters)
- ✓ Quick filters apply correct criteria with one click
- ✓ Date range picker is intuitive and quick presets work
- ✓ Saved filters persist across sessions (localStorage)
- ✓ "Clear All Filters" resets to default view
- ✓ Active filter chips display correctly
- ✓ Removing individual filter chip updates results immediately
- ✓ Filter count indicator shows correct number

---

### UR-REPORT-008: Reporting Access Control
**Priority**: High
**User Role**: HC Admin, Reporting Viewer, Department Manager

**Description:**
Role-based access control for reporting features to ensure data security and appropriate access levels.

**Functional Requirements:**
- **User Roles**:
  1. **HC Admin**:
     - Full access to all reports and data
     - Can view all employees regardless of department
     - Can perform actions (send reminders, assign courses)
     - Can download/export all reports
     - Can access all sensitive data

  2. **Reporting Viewer**:
     - Read-only access to reports
     - Can view all data but cannot edit
     - Cannot perform actions (no send reminders, no assign courses)
     - Limited or no export capabilities (configurable)
     - Cannot access personally identifiable information (PII) if restricted

  3. **Department Manager**:
     - Access only to own department's data
     - Can view employees in their department
     - Can send reminders to department employees (optional)
     - Limited export (department data only)
     - Cannot view other departments' data

- **Permissions Matrix**:
  | Permission | HC Admin | Reporting Viewer | Department Manager |
  |------------|----------|------------------|--------------------|
  | View all employees | ✓ | ✓ | ✗ (only own dept) |
  | View employee details | ✓ | ✓ | ✓ (only own dept) |
  | View course reports | ✓ | ✓ | ✓ (courses in dept) |
  | Download reports | ✓ | ✗ or Limited | ✓ (dept only) |
  | Send notifications | ✓ | ✗ | ✓ (dept only) |
  | Assign courses | ✓ | ✗ | ✗ or ✓ (dept only) |
  | Access sensitive data | ✓ | ✗ | ✗ |
  | View other departments | ✓ | ✓ | ✗ |
  | Generate reports | ✓ | ✗ | ✓ (dept only) |

- **Data Filtering by Role**:
  - **HC Admin**:
    - No restrictions
    - See all data across organization
  - **Reporting Viewer**:
    - See all data but cannot modify
    - Some fields may be hidden (e.g., employee ID, contact info)
  - **Department Manager**:
    - Automatic filter applied: Department = [Manager's Department]
    - Department filter dropdown disabled or hidden
    - Cannot bypass department restriction
    - Cannot see employee data from other departments

- **Audit Log**:
  - Log all report access events:
    - User who accessed report
    - Report type accessed
    - Timestamp
    - Actions performed (view, download, send notification)
    - IP address (optional)
  - Audit log viewable by HC Admin only
  - Exportable for compliance purposes

- **Authentication**:
  - JWT token with role information embedded
  - Session timeout for inactivity (e.g., 30 minutes)
  - Forced re-authentication for sensitive actions
  - Logout on token expiration

- **Authorization Checks**:
  - Frontend role checks (hide UI elements)
  - Backend role checks (enforce permissions)
  - API endpoints validate user role and permissions
  - Return 403 Forbidden for unauthorized actions

**Technical Implementation:**
- **ReactJS**:
  - Role-based conditional rendering:
    ```jsx
    {userRole === 'HC_ADMIN' && <SendReminderButton />}
    {userRole !== 'REPORTING_VIEWER' && <ExportButton />}
    ```
  - ProtectedComponent wrapper for role checking
  - Permission checks before displaying actions
  - Redirect to unauthorized page if access denied
- **TypeScript**:
  - UserRole enum:
    ```typescript
    enum UserRole {
      HC_ADMIN = 'HC_ADMIN',
      REPORTING_VIEWER = 'REPORTING_VIEWER',
      DEPARTMENT_MANAGER = 'DEPARTMENT_MANAGER',
    }
    ```
  - Permission types and checker functions
  - Type-safe role checking throughout app
- **React Query**:
  - API endpoints respect user role (backend filtering)
  - Queries include role-based filtering automatically
  - Mutations check permissions before execution
  - Error handling for 403 Forbidden responses
- **Custom Hooks**:
  - usePermissions hook:
    ```typescript
    const { canSendReminder, canDownloadReport, canViewAllDepts } = usePermissions();
    ```
  - useAuth hook for user role and authentication state
- **Authorization**:
  - JWT token includes role claim
  - Backend validates role on every API request
  - Middleware for role-based access control
  - Automatic data filtering based on role (e.g., department filter for managers)

**Acceptance Criteria:**
- ✓ Users only see reports they have permission to view
- ✓ Department Managers see only their department's data (no other departments)
- ✓ Reporting Viewers cannot perform write actions (buttons hidden/disabled)
- ✓ Audit log tracks all report access with user, timestamp, and action
- ✓ Unauthorized access attempts are blocked and logged
- ✓ Session expires after 30 minutes of inactivity
- ✓ JWT token includes correct role information
- ✓ Backend enforces permissions (not just frontend hiding)
- ✓ 403 Forbidden errors display user-friendly message
- ✓ Role changes take effect immediately (no cache issues)

---

## Non-Functional Requirements

### Performance
| Metric | Requirement |
|--------|-------------|
| Employee list load time | < 3 seconds for 1,000 employees |
| Employee detail load time | < 2 seconds |
| Course report load time | < 3 seconds |
| Report generation (Excel) | < 10 seconds for 1,000 records |
| Dashboard refresh | < 1 second (background refetch) |
| Search results | < 1 second |
| Chart rendering | < 500ms |
| Filter application | < 500ms |

### Usability
- Intuitive dashboard layout with clear navigation
- Consistent UI design matching LMS module
- Helpful tooltips for metrics
- Clear labels and descriptions
- Responsive design for tablet and desktop (mobile optional)
- Loading states for all async operations
- Empty states with helpful messages

### Reliability
- 99.9% uptime SLA
- Automatic retry on network failures (React Query)
- Graceful degradation if backend services unavailable
- Data consistency across reports
- Accurate calculations (no rounding errors)

### Security
- Role-based access control strictly enforced
- Data isolation (managers cannot see other departments)
- Audit logging for compliance
- JWT authentication with token refresh
- HTTPS for all data transmission
- Input validation and sanitization
- Protection against XSS and CSRF attacks

### Scalability
- Support for 10,000+ employees
- Efficient pagination for large datasets
- Database query optimization (indexing)
- Caching strategies for frequently accessed data
- CDN for static assets
- Horizontal scaling capability

### Compatibility
| Category | Support |
|----------|---------|
| **Browsers** | Chrome (latest 2), Firefox (latest 2), Safari (latest 2), Edge (latest 2) |
| **Devices** | Desktop (primary), Tablet (secondary), Mobile (view only) |
| **Screen Sizes** | 1024px (tablet) to 3840px (4K desktop) |
| **Export Compatibility** | Excel 2016+, Google Sheets, any CSV reader |

---

## Technical Stack

### Core Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **React JS** | 18.x | UI components and state management |
| **TypeScript** | 5.x | Type safety and developer experience |
| **React Query** | 5.x | Data fetching, caching, real-time updates |
| **Tailwind CSS** | 3.x | Styling and responsive design |

### Additional Libraries
- **react-table** or **@tanstack/react-table** - Advanced table features
- **Recharts** - Data visualization and charts
- **xlsx** (SheetJS) - Excel file generation
- **react-datepicker** - Date range picker
- **date-fns** - Date formatting and manipulation
- **framer-motion** - Animations (optional)
- **react-toastify** - Notifications

---

This document provides comprehensive user requirements for the Reporting (HC Version) module, ready for development team implementation.
