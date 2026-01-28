# Module 2: Reporting (HC Version) - User Stories

## Document Information
- **Document Version**: 1.0
- **Date**: January 28, 2026
- **Project Name**: Web-Based Training Platform LMS
- **Module**: Module 2 - Reporting (HC Version)
- **Technology Stack**: ReactJS, React Query, Tailwind CSS, TypeScript

---

## Table of Contents
1. [Epic 1: Employee Progress Monitoring](#epic-1-employee-progress-monitoring)
2. [Epic 2: Course Reporting and Analytics](#epic-2-course-reporting-and-analytics)
3. [Epic 3: Downloadable Reports](#epic-3-downloadable-reports)
4. [Epic 4: Department Analytics](#epic-4-department-analytics)
5. [Epic 5: Real-Time Monitoring](#epic-5-real-time-monitoring)
6. [Epic 6: Access Control and Security](#epic-6-access-control-and-security)
7. [Epic 7: Advanced Filtering and Search](#epic-7-advanced-filtering-and-search)

---

## Epic 1: Employee Progress Monitoring

### Story 1.1: View All Employee Progress
**As an** HC Admin
**I want to** see a list of all employees and their training progress
**So that** I can monitor compliance and identify who needs support

**Acceptance Criteria:**
- Given I am logged in as HC Admin
- When I navigate to the Employee Progress dashboard
- Then I see a table of all employees with columns for name, department, role, completion %, and last activity
- And the list loads within 3 seconds
- And I can scroll through all employees with pagination
- And I can see at a glance who is on track and who is falling behind

**Technical Tasks:**
- [ ] Create EmployeeProgressDashboard component (React)
- [ ] Implement useEmployeeProgress hook with React Query
- [ ] Design table layout with react-table or @tanstack/react-table
- [ ] Add pagination controls
- [ ] Style table with Tailwind (responsive, color-coded progress)
- [ ] Add loading skeletons for better UX
- [ ] Implement error handling
- [ ] Add TypeScript interfaces for employee data

**Story Points**: 8

---

### Story 1.2: Filter Employees by Department
**As an** HC Admin
**I want to** filter the employee list by department
**So that** I can focus on specific teams

**Acceptance Criteria:**
- Given I am viewing the employee progress list
- When I select a department from the filter dropdown
- Then the list updates to show only employees in that department
- And the filter applies immediately with visual feedback
- And I can clear the filter to see all employees again

**Technical Tasks:**
- [ ] Create DepartmentFilter dropdown component (React)
- [ ] Implement filter logic in useEmployeeProgress hook
- [ ] Update React Query parameters to include department filter
- [ ] Add "Clear Filters" button
- [ ] Style filter controls with Tailwind
- [ ] Add TypeScript types for filter state

**Story Points**: 3

---

### Story 1.3: Filter Employees by Status
**As an** HC Admin
**I want to** filter employees by their training status (not started, in progress, completed, overdue)
**So that** I can quickly identify groups needing attention

**Acceptance Criteria:**
- Given I am viewing the employee progress list
- When I select a status from the filter
- Then I see only employees with that status
- And overdue employees are highlighted in red
- And I can select multiple statuses simultaneously

**Technical Tasks:**
- [ ] Create StatusFilter component with checkboxes (React)
- [ ] Implement multi-status filtering logic
- [ ] Add color coding for overdue status (Tailwind)
- [ ] Update query parameters for status filtering
- [ ] Add visual indicators for each status type
- [ ] Test filtering with various status combinations

**Story Points**: 3

---

### Story 1.4: Search Employees by Name
**As an** HC Admin
**I want to** search for a specific employee by name
**So that** I can quickly find their progress information

**Acceptance Criteria:**
- Given I am viewing the employee progress list
- When I type an employee's name in the search bar
- Then the list filters to show matching employees as I type
- And search results appear within 1 second
- And I can clear the search to see the full list again

**Technical Tasks:**
- [ ] Create SearchBar component (React)
- [ ] Implement debounced search with lodash or custom hook
- [ ] Add search to query parameters (React Query)
- [ ] Style search bar with Tailwind
- [ ] Add search icon and clear button
- [ ] Add TypeScript types for search state

**Story Points**: 3

---

### Story 1.5: View Employee Detail
**As an** HC Admin
**I want to** click on an employee to see their detailed progress
**So that** I can understand their complete learning journey

**Acceptance Criteria:**
- Given I am viewing the employee progress list
- When I click on an employee row
- Then I navigate to a detailed employee page or modal opens
- And I see all courses assigned to the employee with progress for each
- And I see quiz scores, certificates earned, and activity timeline
- And I can navigate back to the list easily

**Technical Tasks:**
- [ ] Create EmployeeDetail component/page (React)
- [ ] Set up routing or modal for detail view
- [ ] Implement useEmployeeDetail hook with React Query
- [ ] Create sub-components for courses, quizzes, certificates, timeline
- [ ] Style detail view with Tailwind (multi-section layout)
- [ ] Add breadcrumb or back button navigation
- [ ] Prefetch employee details on row hover for faster loading

**Story Points**: 13

---

### Story 1.6: Sort Employee List
**As an** HC Admin
**I want to** sort the employee list by various columns
**So that** I can view data in my preferred order

**Acceptance Criteria:**
- Given I am viewing the employee progress list
- When I click on a column header (Name, Department, Completion %, Last Activity)
- Then the list sorts by that column in ascending order
- And clicking again sorts in descending order
- And a sort indicator (arrow) shows the current sort direction

**Technical Tasks:**
- [ ] Add sort functionality to table (react-table sorting feature)
- [ ] Implement sort indicators in column headers
- [ ] Update query parameters to include sort column and direction
- [ ] Style sorted column header differently (Tailwind)
- [ ] Add TypeScript types for sort state
- [ ] Test sorting with various data types (strings, numbers, dates)

**Story Points**: 3

---

### Story 1.7: Export Employee Progress Report
**As an** HC Admin
**I want to** export the employee progress list to Excel
**So that** I can analyze data offline or share with leadership

**Acceptance Criteria:**
- Given I am viewing the employee progress list
- When I click the "Export to Excel" button
- Then an Excel file downloads with all employee data
- And the file includes all visible columns based on current filters
- And the file has formatted headers and readable data
- And the export completes within 5 seconds for 1,000 employees

**Technical Tasks:**
- [ ] Create ExportButton component (React)
- [ ] Integrate xlsx library for Excel generation
- [ ] Implement data formatting for export
- [ ] Add loading state during export
- [ ] Handle large datasets efficiently
- [ ] Style export button with Tailwind
- [ ] Add error handling for failed exports

**Story Points**: 5

---

## Epic 2: Course Reporting and Analytics

### Story 2.1: View Course Report Overview
**As an** HC Admin
**I want to** see a summary report for a specific course
**So that** I understand how learners are performing in that course

**Acceptance Criteria:**
- Given I want to analyze a specific course
- When I navigate to the course report page
- Then I see key metrics: total assigned, completion rate, average score, average time spent
- And I see enrollment statistics (started, in progress, completed, not started)
- And I see performance metrics (pass rate, average attempts)
- And I see visualizations (completion funnel, score distribution)
- And the report loads within 3 seconds

**Technical Tasks:**
- [ ] Create CourseReport component (React)
- [ ] Implement useCourseReport hook with React Query
- [ ] Create StatCards for key metrics
- [ ] Integrate Recharts for visualizations (funnel, histogram)
- [ ] Style report with Tailwind (dashboard layout)
- [ ] Add TypeScript interfaces for course report data
- [ ] Implement error handling and loading states

**Story Points**: 13

---

### Story 2.2: View Learner Performance in Course
**As an** HC Admin
**I want to** see a list of all learners enrolled in a course and their individual progress
**So that** I can identify who is struggling and who is excelling

**Acceptance Criteria:**
- Given I am viewing a course report
- When I scroll to the learner list section
- Then I see a table of all learners with columns: name, progress %, quiz score, time spent, status
- And I can sort by any column
- And I can filter by status (not started, in progress, completed, failed)
- And I can click on a learner to see their detailed progress

**Technical Tasks:**
- [ ] Create CourseLearnerList component (React)
- [ ] Implement table with sorting and filtering (react-table)
- [ ] Add status badges with color coding (Tailwind)
- [ ] Implement click handler to open learner detail
- [ ] Add pagination for large learner lists
- [ ] Style table with responsive design

**Story Points**: 5

---

### Story 2.3: Compare Course Performance Across Departments
**As an** HC Admin
**I want to** compare how different departments are performing in a course
**So that** I can identify if certain teams need additional support

**Acceptance Criteria:**
- Given I am viewing a course report
- When I view the department comparison section
- Then I see a bar chart comparing completion rates across departments
- And I see a table with department names, completion rates, average scores
- And I can identify top-performing and underperforming departments

**Technical Tasks:**
- [ ] Create DepartmentComparison component (React)
- [ ] Fetch department-level aggregated data (React Query)
- [ ] Create bar chart with Recharts
- [ ] Create comparison table
- [ ] Style with Tailwind (charts and table)
- [ ] Add TypeScript interfaces for comparison data

**Story Points**: 5

---

### Story 2.4: Identify Course Drop-off Points
**As an** HC Admin
**I want to** see at which point in the course learners are dropping off
**So that** I can improve course content and engagement

**Acceptance Criteria:**
- Given I am viewing a course report
- When I view the engagement section
- Then I see a chart showing completion rates for each module/lesson
- And I can identify modules with high drop-off rates
- And I can see which videos are most frequently skipped

**Technical Tasks:**
- [ ] Fetch module-level engagement data (API endpoint)
- [ ] Create EngagementChart component (React + Recharts)
- [ ] Visualize drop-off rates per module (line or bar chart)
- [ ] Highlight problematic modules in red
- [ ] Style with Tailwind
- [ ] Add insights or recommendations based on data

**Story Points**: 8

---

### Story 2.5: Export Course Report
**As an** HC Admin
**I want to** download a complete course report as Excel
**So that** I can share it with course creators or leadership

**Acceptance Criteria:**
- Given I am viewing a course report
- When I click "Export Report"
- Then an Excel file downloads with all course metrics and learner data
- And the file includes summary statistics, learner list, and department comparison
- And the file is well-formatted and ready to share

**Technical Tasks:**
- [ ] Create course report export function
- [ ] Use xlsx library to generate multi-sheet Excel file
- [ ] Include summary sheet, learner sheet, department sheet
- [ ] Format data with headers and cell styling
- [ ] Add export button to CourseReport component
- [ ] Test with large datasets

**Story Points**: 5

---

## Epic 3: Downloadable Reports

### Story 3.1: Generate All Employee Progress Report
**As an** HC Admin
**I want to** generate a comprehensive report of all employees' training progress
**So that** I have a complete record for compliance and analysis

**Acceptance Criteria:**
- Given I want a full employee progress report
- When I navigate to the Reports section and select "Employee Progress Report"
- Then I can configure date range and departments to include
- And I can choose Excel or CSV format
- And when I click "Generate Report", the file downloads
- And the report includes all employee data with progress metrics
- And the report generation completes within 10 seconds for 1,000 employees

**Technical Tasks:**
- [ ] Create ReportGenerator component with configuration form (React)
- [ ] Add date range picker (react-datepicker or similar)
- [ ] Add department multi-select
- [ ] Implement generateReport mutation (React Query)
- [ ] Integrate xlsx library for Excel export
- [ ] Integrate csv-stringify for CSV export
- [ ] Add loading progress bar
- [ ] Style form with Tailwind
- [ ] Add TypeScript interfaces for report config

**Story Points**: 8

---

### Story 3.2: Generate Department Report
**As an** HC Admin
**I want to** generate a report for a specific department
**So that** I can provide targeted insights to department managers

**Acceptance Criteria:**
- Given I want a department-specific report
- When I select "Department Report" and choose a department
- Then I can configure date range and metrics to include
- And when I generate the report, it includes only that department's employees
- And the report includes aggregated department statistics

**Technical Tasks:**
- [ ] Add department report type to ReportGenerator
- [ ] Implement department filter in report configuration
- [ ] Fetch department-specific data (React Query)
- [ ] Generate report with department summary section
- [ ] Add department name to report filename
- [ ] Test with various departments

**Story Points**: 5

---

### Story 3.3: Generate Certificate Report
**As an** HC Admin
**I want to** generate a report of all certificates issued
**So that** I can track certifications for compliance purposes

**Acceptance Criteria:**
- Given I want a certificate report
- When I select "Certificate Report" and configure date range
- Then a report downloads with all certificates issued in that period
- And the report includes certificate ID, employee name, course name, issue date
- And the report can be filtered by course or department

**Technical Tasks:**
- [ ] Add certificate report type to ReportGenerator
- [ ] Fetch certificate data (React Query)
- [ ] Format certificate data for export
- [ ] Add filters for course and department
- [ ] Generate Excel/CSV with certificate information
- [ ] Test with large certificate datasets

**Story Points**: 5

---

### Story 3.4: Generate Quiz Performance Report
**As an** HC Admin
**I want to** generate a detailed quiz performance report
**So that** I can analyze assessment effectiveness and learner comprehension

**Acceptance Criteria:**
- Given I want a quiz performance report
- When I select "Quiz Performance Report" and configure options
- Then the report includes all quiz attempts with scores, pass/fail status, and question-level performance
- And I can filter by course, date range, or department
- And the report includes aggregate statistics (average score, pass rate)

**Technical Tasks:**
- [ ] Add quiz performance report type
- [ ] Fetch detailed quiz data (React Query)
- [ ] Include question-level analysis in report
- [ ] Calculate aggregate statistics
- [ ] Format multi-level data for Excel (nested sheets or flat structure)
- [ ] Add comprehensive filters

**Story Points**: 8

---

### Story 3.5: Schedule Automated Reports (Future)
**As an** HC Admin
**I want to** schedule reports to be generated and emailed automatically
**So that** I receive regular updates without manual effort

**Acceptance Criteria:**
- Given I want automated reporting
- When I configure a report schedule (daily, weekly, monthly)
- Then the system generates and emails the report at the specified interval
- And I can manage scheduled reports (edit, delete)
- And I receive the report at the configured email address

**Technical Tasks:**
- [ ] Create ScheduledReports management page (React)
- [ ] Implement schedule configuration form (cron-like settings)
- [ ] Set up backend cron jobs for report generation
- [ ] Integrate email sending functionality
- [ ] Create scheduled report list with edit/delete actions
- [ ] Add notifications for successful/failed automated reports

**Story Points**: 13

---

## Epic 4: Department Analytics

### Story 4.1: Compare All Departments
**As an** HC Admin
**I want to** see a comparison of all departments' training performance
**So that** I can identify top performers and areas needing improvement

**Acceptance Criteria:**
- Given I want to compare departments
- When I navigate to the Department Analytics page
- Then I see a table comparing all departments with columns: name, employees count, completion rate, average score, learning hours
- And I see visual indicators for top (green) and bottom (red) performers
- And I can sort by any metric
- And I see a bar chart visualizing completion rates

**Technical Tasks:**
- [ ] Create DepartmentAnalytics component (React)
- [ ] Implement useDepartmentAnalytics hook (React Query)
- [ ] Create comparison table with sorting
- [ ] Add color coding for performance (Tailwind)
- [ ] Create bar chart with Recharts
- [ ] Style with responsive layout
- [ ] Add TypeScript interfaces for department data

**Story Points**: 8

---

### Story 4.2: View Department Detail
**As an** HC Admin
**I want to** click on a department to see detailed analytics
**So that** I can understand that department's specific training situation

**Acceptance Criteria:**
- Given I am viewing the department comparison
- When I click on a department row
- Then I see a detailed view with all employees in that department
- And I see department-specific courses assigned
- And I see trends over time for that department
- And I see common training gaps or areas of excellence

**Technical Tasks:**
- [ ] Create DepartmentDetail component (React)
- [ ] Implement useDepartmentDetail hook (React Query)
- [ ] Create employee list for department
- [ ] Add trend chart (Recharts line chart)
- [ ] Identify training gaps (courses with low completion)
- [ ] Style with Tailwind
- [ ] Add navigation back to comparison view

**Story Points**: 8

---

### Story 4.3: View Department Trends
**As an** HC Admin
**I want to** see how department performance changes over time
**So that** I can identify improvements or declines

**Acceptance Criteria:**
- Given I am viewing department analytics
- When I view the trends section
- Then I see line charts showing completion rates over the past 6-12 months
- And I can see month-over-month changes
- And I can identify departments improving or declining
- And I can compare trends across multiple departments

**Technical Tasks:**
- [ ] Fetch time-series data for departments (React Query)
- [ ] Create TrendChart component (React + Recharts)
- [ ] Calculate month-over-month changes
- [ ] Add trend indicators (up/down arrows with percentages)
- [ ] Allow comparison of multiple departments on same chart
- [ ] Style with Tailwind

**Story Points**: 8

---

## Epic 5: Real-Time Monitoring

### Story 5.1: View Live Training Activity
**As an** HC Admin
**I want to** see real-time training activity across the organization
**So that** I can monitor engagement levels

**Acceptance Criteria:**
- Given I want to monitor live activity
- When I navigate to the Live Dashboard
- Then I see the number of learners currently active (watching videos)
- And I see recent completions in the last hour
- And I see recent quiz passes and failures
- And the dashboard updates automatically every 10 seconds
- And I see an activity feed scrolling with recent events

**Technical Tasks:**
- [ ] Create LiveDashboard component (React)
- [ ] Implement useLiveActivity hook with short refetch interval (React Query)
- [ ] Create ActivityFeed component with auto-scroll
- [ ] Create live metric cards (active learners, recent completions)
- [ ] Style with Tailwind (animated updates)
- [ ] Consider WebSocket integration for true real-time updates
- [ ] Add TypeScript interfaces for live events

**Story Points**: 13

---

### Story 5.2: Receive Low Completion Alerts
**As an** HC Admin
**I want to** receive alerts when completion rates drop below thresholds
**So that** I can take corrective action quickly

**Acceptance Criteria:**
- Given completion monitoring is enabled
- When a course or department completion rate falls below the threshold (e.g., 60%)
- Then I see an alert on the Live Dashboard
- And the alert is color-coded by severity (red for critical, yellow for warning)
- And I can click the alert to see details
- And I can dismiss or acknowledge the alert

**Technical Tasks:**
- [ ] Create AlertsPanel component (React)
- [ ] Implement alert detection logic (backend or frontend)
- [ ] Fetch alerts with React Query
- [ ] Add severity levels and color coding (Tailwind)
- [ ] Create alert detail modal
- [ ] Implement dismiss/acknowledge functionality
- [ ] Add notifications for new alerts

**Story Points**: 8

---

## Epic 6: Access Control and Security

### Story 6.1: Department Manager Access Restriction
**As a** Department Manager
**I want to** access reports only for my department
**So that** I respect data privacy and see relevant information

**Acceptance Criteria:**
- Given I am logged in as a Department Manager
- When I navigate to the reporting module
- Then I see only my department's employees and data
- And I cannot view other departments' information
- And all filters default to my department
- And department selection dropdown is disabled or hidden

**Technical Tasks:**
- [ ] Implement role-based rendering in reporting components
- [ ] Add user role check in useEmployeeProgress hook
- [ ] Filter API queries by department for Department Manager role
- [ ] Hide department selector for Department Managers
- [ ] Add TypeScript role checks
- [ ] Test access restrictions thoroughly

**Story Points**: 5

---

### Story 6.2: Reporting Viewer Read-Only Access
**As a** Reporting Viewer
**I want to** view all reports without editing capabilities
**So that** I can analyze data without risk of changes

**Acceptance Criteria:**
- Given I am logged in as a Reporting Viewer
- When I access the reporting module
- Then I can view all reports and dashboards
- And I cannot see action buttons (send reminder, assign course)
- And I cannot download reports (or have limited export capabilities)
- And I see a visual indicator that I have read-only access

**Technical Tasks:**
- [ ] Implement role-based conditional rendering for action buttons
- [ ] Create usePermissions hook for permission checks
- [ ] Add read-only indicator to UI
- [ ] Disable mutations for Reporting Viewer role
- [ ] Test that Reporting Viewers cannot perform write actions

**Story Points**: 3

---

### Story 6.3: Audit Log for Report Access
**As an** HC Admin
**I want to** see an audit log of who accessed which reports
**So that** I can ensure data security and accountability

**Acceptance Criteria:**
- Given audit logging is enabled
- When I navigate to the Audit Log page
- Then I see a log of all report access events
- And each entry shows user name, report type, timestamp, and actions performed
- And I can filter by user, report type, or date range
- And I can export the audit log

**Technical Tasks:**
- [ ] Create AuditLog component (React)
- [ ] Implement useAuditLog hook (React Query)
- [ ] Fetch audit log data from API
- [ ] Create table with filtering and sorting
- [ ] Add export functionality
- [ ] Style with Tailwind
- [ ] Add TypeScript interfaces for audit entries

**Story Points**: 8

---

## Epic 7: Advanced Filtering and Search

### Story 7.1: Apply Multiple Filters Simultaneously
**As an** HC Admin
**I want to** apply multiple filters at once (department + status + date range)
**So that** I can narrow down data to exactly what I need

**Acceptance Criteria:**
- Given I am viewing the employee progress list
- When I select multiple filters (e.g., IT Department + In Progress + Last 30 Days)
- Then all filters apply simultaneously
- And the list updates to show only employees matching all criteria
- And I see active filter tags/chips showing what's applied
- And I can remove individual filters or clear all at once

**Technical Tasks:**
- [ ] Create FilterPanel component with multiple filter controls (React)
- [ ] Implement multi-filter state management
- [ ] Update React Query parameters with all active filters
- [ ] Create ActiveFilters component showing filter chips
- [ ] Add remove filter functionality for each chip
- [ ] Add "Clear All Filters" button
- [ ] Style with Tailwind
- [ ] Add TypeScript interfaces for filter state

**Story Points**: 5

---

### Story 7.2: Save Filter Presets
**As an** HC Admin
**I want to** save frequently used filter combinations as presets
**So that** I can quickly apply them without reconfiguring

**Acceptance Criteria:**
- Given I have configured multiple filters
- When I click "Save Filter Preset"
- Then I can name and save the current filter combination
- And the preset appears in a dropdown for quick access
- And I can load a saved preset with one click
- And I can edit or delete saved presets

**Technical Tasks:**
- [ ] Create SaveFilterPreset modal component (React)
- [ ] Implement preset storage (localStorage or backend)
- [ ] Create PresetDropdown component
- [ ] Add load, edit, delete preset functionality
- [ ] Use React Query mutations for backend persistence
- [ ] Style with Tailwind
- [ ] Add TypeScript interfaces for presets

**Story Points**: 8

---

### Story 7.3: Use Quick Filters
**As an** HC Admin
**I want to** use one-click quick filters for common scenarios
**So that** I can quickly view specific segments without manual configuration

**Acceptance Criteria:**
- Given I am viewing the employee progress list
- When I click a quick filter button (e.g., "Overdue Mandatory Training")
- Then the appropriate filters are applied automatically
- And the list updates to show matching employees
- And I can see which quick filter is active
- And I can clear the quick filter to return to default view

**Technical Tasks:**
- [ ] Create QuickFilters component with preset buttons (React)
- [ ] Define quick filter configurations (overdue, completed this week, low performers, etc.)
- [ ] Apply quick filters to query parameters
- [ ] Add active state styling for selected quick filter (Tailwind)
- [ ] Ensure quick filters can be combined with manual filters
- [ ] Add TypeScript types for quick filter definitions

**Story Points**: 3

---

**Total Story Points for Reporting Module**: 165 points

---

This document contains all user stories for the Reporting (HC Version) module, organized by epic and ready for sprint planning and development.
