# Frontend Mock Data Migration Guide
## Professional Architecture Approach

### ✅ Completed Migrations
1. **lib/dataService.js** - Comprehensive data service layer with caching
2. **hooks/useData.js** - Professional custom hooks for data fetching
3. **app/postes/page.jsx** - Migrated to use postService
4. **app/website/freelancers/page.jsx** - Migrated to use freelancerService
5. **components/ui/NotificationsDropdown.jsx** - Migrated to use notificationService

---

## Remaining Files to Migrate

### Priority 1: Core Pages (HIGH IMPACT)

#### 1. **app/Academy/courses/[courseId]/page.jsx**
**Current Mock Data**: `const coursesData = [...]`
**Migration Steps**:
```javascript
// OLD - Remove this:
const courseId = pathname.split('/').pop();
const foundCourse = coursesData.find(c => c.id === parseInt(courseId));

// NEW - Replace with:
import { courseService } from '../../../../lib/dataService';
import { useFetchById } from '../../../../hooks/useData';

export default function CourseDetailsPage({ params }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const courseId = pathname.split('/').pop();
  
  const { data: course, loading, error } = useFetchById(
    courseService.getById,
    parseInt(courseId)
  );
  
  // Rest of component...
}
```

#### 2. **app/courses/[id]/page.jsx**
**Current Mock Data**: `const mockCourse = {...}`
**Old Import to Remove**:
- Uses local mockCourse object in courseId matching
**Implementation**:
- Use `useFetchById(courseService.getById, courseId)`
- Add error state UI

#### 3. **app/dashboard/course-details/[id]/page.jsx**
**Current Mock Data**: Multiple mock objects (mockCourse, mockComments, etc.)
**Migration Priority**: HIGH
**Implementation Pattern**:
```javascript
// Fetch course
const { data: course, loading: courseLoading } = useFetchById(
  courseService.getById,
  courseId
);

// Fetch students (if API endpoint exists)
const { data: students, loading: studentsLoading } = useFetch(
  () => apiGet(`/fyter/courses/${courseId}/students/`),
  !!courseId
);
```

#### 4. **app/freelancer/[id]/page.jsx**
**Current Mock Data**: `const mockFreelancer = {...}`
**Imports to Remove**: 
- `mockPosts, mockCertifications, mockProjects` inline definitions
**Implementation**:
```javascript
const { data: freelancer } = useFetchById(freelancerService.getById, id);
const { data: posts } = useFetch(() => postService.getAll({ userId: id }));
const { data: certifications } = useFetch(() => 
  apiGet(`/fyter/freelancers/${id}/certifications/`)
);
```

#### 5. **app/dashboard/learning-paths/[id]/page.jsx**
**Current Mock Data**: `const mockLearningPath = {...}`
**API Endpoint**: May need to be created if not exists
**Fallback**: Return empty array with proper error messaging

#### 6. **app/dashboard/students/[id]/analytics/page.jsx**
**Current Mock Data**: `const mockStudent = {...}`
**Implementation**:
```javascript
// If student analytics endpoint doesn't exist, fetch user and calculate locally
const { data: student, loading } = useFetchById(
  async (id) => apiGet(`/fyter/users/${id}/analytics/`, true),
  studentId
);
```

---

### Priority 2: Components (MEDIUM IMPACT)

#### 7. **components/Pages/FormateurDashboard.jsx**
**Current Mock Data**: `mockCourses`, `mockStudents`
```javascript
// Replace inline mock with:
const { data: courses } = useFetch(() => courseService.getAll());
const { data: students } = useFetch(() => 
  apiGet('/fyter/formatour/students/', true)
);
```

#### 8. **components/freelancers/FreelancersGrid.jsx**
**Current Mock Data**: Uses `mockFreelancers` from mockData.js
```javascript
import { freelancerService } from '../../lib/dataService';
import { useFetch } from '../../hooks/useData';

export default function FreelancersGrid() {
  const { data: freelancers = [] } = useFetch(
    () => freelancerService.getAll()
  );
  
  // Filter by level
  const beginners = freelancers.filter(f => f.level === 'beginner');
  const intermediates = freelancers.filter(f => f.level === 'intermediate');
  // etc...
}
```

#### 9. **components/ui/Post.jsx**
**Current Mock Data**: Check for hardcoded sample data
**Implementation**: Ensure it properly displays API data

#### 10. **components/fytrs/SuccessStories.jsx**
**Current Mock Data**: `const mockSuccessStories = [...]`
```javascript
// If endpoint doesn't exist, create one or fetch from posts/reviews
const { data: stories } = useFetch(async () => {
  // Either from API or construct from reviews
  return apiGet('/fyter/success-stories/', false);
});
```

#### 11. **components/integrations/GoogleMeetIntegration.jsx**
**Current Mock Data**: `const mockSessions = [...]`
**Note**: This is integration data, may need backend support
```javascript
const { data: sessions } = useFetch(() => 
  apiGet('/fyter/integrations/google-meet/sessions/', true)
);
```

#### 12. **components/integrations/SlackIntegration.jsx**
**Current Mock Data**: `const mockChannels = [...]`
```javascript
const { data: channels } = useFetch(() => 
  apiGet('/fyter/integrations/slack/channels/', true)
);
```

---

### Priority 3: Utility Data (LOW-MEDIUM IMPACT)

#### 13. **lib/mockData.js**
**Status**: Still used by components
**Action**: Keep file but gradually refactor components to use dataService

#### 14. **lib/samplePosts.js**
**Status**: Used in postes/page.jsx as fallback
**Action**: Remove import once API migration is complete

#### 15. **app/website/works/page.jsx**
**Current Mock Data**: `const mockProjects = [...]`
```javascript
import { projectService } from '../../../lib/dataService';

export default function WorksPage() {
  const { data: projects } = useFetch(() => projectService.getAll());
  // Render projects...
}
```

#### 16. **app/login/page.jsx**
**Current Mock Data**: `const mockToken = '...'` for admin user
**Action**: This is for testing only. Add comment explaining its use.

---

## Implementation Pattern Template

```javascript
'use client';

import { useFetch, useFetchById, useMutation } from '@/hooks/useData';
import { serviceFunction } from '@/lib/dataService';

export default function MyComponent() {
  // For fetching list
  const { data, loading, error, refetch } = useFetch(
    () => serviceFunction.getAll(),
    true, // immediate fetch
    2 // retry count
  );

  // For fetching by ID
  const { data: item, loading: itemLoading, error: itemError } = useFetchById(
    serviceFunction.getById,
    itemId
  );

  // For mutations (POST, PUT, DELETE)
  const { execute, loading: mutating, error: mutateError } = useMutation(
    (payload) => serviceFunction.create(payload)
  );

  // Render with error and loading states
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={refetch} />;
  if (!data || data.length === 0) return <EmptyState />;
  
  return <DataDisplay data={data} />;
}
```

---

## Error Handling Best Practices

### Required Error States
```javascript
{loading ? (
  <LoadingSpinner />
) : error ? (
  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-lg p-4">
    <p className="text-red-700">{error}</p>
    <button onClick={refetch} className="mt-2 px-4 py-2 bg-red-600 text-white rounded">
      Try Again
    </button>
  </div>
) : data && data.length > 0 ? (
  <DataDisplay data={data} />
) : (
  <EmptyState message="No data available" />
)}
```

---

## API Endpoints Verification

Before migrating each file, verify the endpoint exists:

- ✅ `/fyter/posts/` - Posts listing
- ✅ `/fyter/profile/` - User profile
- ✅ `/fyter/notifications/` - Notifications
- ❓ `/fyter/academy/` - Check if supports filtering/pagination
- ❓ `/fyter/courses/{id}/students/` - May need to create
- ❓ `/fyter/freelancers/{id}/certifications/` - May need to create
- ❓ `/fyter/success-stories/` - Check if exists

**Action Items**:
1. Verify all endpoints in backend
2. Create missing endpoints if needed
3. Document endpoint parameters and response format

---

## Caching Strategy

The dataService implements intelligent caching:
- **Freelancers**: 5 minutes cache
- **Projects**: 5 minutes cache
- **Posts**: 3 minutes cache (more frequent updates)
- **Courses**: 10 minutes cache
- **Notifications**: 1 minute cache

To clear cache when needed:
```javascript
import { clearCache } from '@/lib/dataService';
clearCache(CACHE.POSTS);
```

---

## Performance Optimization Checklist

- [ ] Use `useFetchById` for single resource pages
- [ ] Use `useFetch` with caching for lists
- [ ] Implement pagination for large datasets
- [ ] Use `useMutation` for POST/PUT/DELETE operations
- [ ] Add loading states to all async operations
- [ ] Implement error boundaries at page level
- [ ] Cache API responses appropriately
- [ ] Use React.memo for expensive components
- [ ] Lazy load images and components

---

## Testing Checklist

For each migrated file:
- [ ] Test data fetches on first load
- [ ] Test error state (disconnect from API)
- [ ] Test loading state (slow network)
- [ ] Test empty state (no data)
- [ ] Test refetch functionality
- [ ] Test filters and search
- [ ] Test pagination (if applicable)
- [ ] Test mutations (create, update, delete)

---

## Migration Priority Summary

**Complete This Sprint**:
1. Academy courses page
2. Freelancer profiles
3. Dashboard pages
4. Components using large mock datasets

**Next Sprint**:
1. Integration components
2. Utility components
3. Remaining pages
4. Remove mockData.js entirely

---

## Questions & Backend Coordination

Before completing migration, confirm with backend team:
1. All required API endpoints exist
2. Proper error responses (400, 401, 404, 500)
3. Pagination parameters and format
4. Authentication requirements
5. CORS configurations
6. Rate limiting policies
7. Websocket support for real-time notifications

---

## Support & References

- dataService.js: Complete service layer with examples
- useData.js: All custom hooks documentation
- API Config: config/api.js for endpoints
- API Utils: lib/apiUtils.js for request helpers

