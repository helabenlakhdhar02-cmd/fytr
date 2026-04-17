# Payment Integration Guide for Components

Quick reference for integrating payment functionality into existing components and pages.

---

## 🎯 Quick Start Integration Template

```javascript
'use client';

import { useRouter } from 'next/navigation';

export default function MyComponent() {
  const router = useRouter();

  const handleInitiatePayment = (paymentType, amount, receiverId, itemId) => {
    if (!amount || !receiverId) {
      alert('Missing payment details');
      return;
    }

    // Navigate to payment form with parameters
    router.push(
      `/payment?type=${paymentType}&amount=${amount}&receiver_id=${receiverId}&${paymentType}_id=${itemId}`
    );
  };

  return (
    <button
      onClick={() => handleInitiatePayment('project', 500, 3, 123)}
      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
    >
      Pay Now
    </button>
  );
}
```

---

## 📍 Integration Points

### 1. Project Details Page (`app/project-details/page.jsx`)

**Location:** Action buttons section  
**Priority:** HIGH

```javascript
import { useRouter } from 'next/navigation';

export default function ProjectDetailsPage() {
  const router = useRouter();

  // Assuming you have project data
  const project = {
    id: 123,
    title: 'Build Mobile App',
    budget: 5000,
    freelancer_id: 45,
    freelancer_name: 'John Developer'
  };

  const handlePayFreelancer = () => {
    router.push(
      `/payment?type=project&amount=${project.budget}&receiver_id=${project.freelancer_id}&project_id=${project.id}&title=${encodeURIComponent(project.title)}`
    );
  };

  return (
    <div>
      {/* ... existing content ... */}
      
      {/* Add this button in the action buttons section */}
      <button
        onClick={handlePayFreelancer}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
      >
        <FaMoneyBill /> Pay Freelancer - {project.budget} TND
      </button>
    </div>
  );
}
```

---

### 2. Services List Page (`app/services-list/page.jsx`)

**Location:** Service card component  
**Priority:** HIGH

```javascript
import { useRouter } from 'next/navigation';
import { FaCreditCard } from 'react-icons/fa';

export default function ServiceCard({ service }) {
  const router = useRouter();

  const handleHireService = () => {
    router.push(
      `/payment?type=service&amount=${service.price}&receiver_id=${service.provider_id}&service_id=${service.id}&title=${encodeURIComponent(service.title)}`
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{service.description}</p>
      
      <div className="flex justify-between items-center mb-4">
        <span className="text-xl font-bold text-blue-600">{service.price} TND</span>
        <div className="flex items-center gap-1 text-yellow-500">
          {/* Star rating */}
        </div>
      </div>

      <button
        onClick={handleHireService}
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <FaCreditCard /> Hire Now
      </button>
    </div>
  );
}
```

---

### 3. Course Details Page (`app/courses/[id]/page.jsx`)

**Location:** Enrollment section  
**Priority:** HIGH

```javascript
'use client';

import { useRouter } from 'next/navigation';
import { FaShoppingCart } from 'react-icons/fa';

export default function CourseDetailsPage({ params }) {
  const router = useRouter();

  // Assuming you have course data
  const course = {
    id: params.id,
    title: 'Advanced React Development',
    instructor_id: 12,
    price: 2500,
    enrolled: false
  };

  const handleEnrollCourse = () => {
    if (course.enrolled) {
      router.push(`/courses/${course.id}`);
      return;
    }

    // For paid courses
    if (course.price > 0) {
      router.push(
        `/payment?type=course&amount=${course.price}&receiver_id=${course.instructor_id}&course_id=${course.id}&title=${encodeURIComponent(course.title)}`
      );
    } else {
      // Free course enrollment
      handleFreeCourseEnrollment();
    }
  };

  const handleFreeCourseEnrollment = async () => {
    // Implement free course enrollment logic
    console.log('Enrolling in free course');
  };

  return (
    <div>
      {/* ... course content ... */}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 sticky top-4">
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400 mb-2">Course Price</p>
          <p className="text-3xl font-bold text-blue-600">{course.price} TND</p>
        </div>

        <button
          onClick={handleEnrollCourse}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 mb-3"
        >
          <FaShoppingCart /> Enroll Now
        </button>

        <button
          onClick={() => router.back()}
          className="w-full py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold rounded-xl transition-colors"
        >
          Back to Courses
        </button>
      </div>
    </div>
  );
}
```

---

### 4. Dashboard - Recent Payments Widget

**Location:** `components/dashboard/PaymentsWidget.jsx`  
**Priority:** MEDIUM

```javascript
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { paymentService } from '../../lib/dataService';
import { FaArrowRight, FaHistory } from 'react-icons/fa';

export default function PaymentsWidget() {
  const router = useRouter();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await paymentService.getMyPayments({ limit: 5 });
        setPayments(data || []);
      } catch (err) {
        console.error('Failed to load payments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <div className="animate-pulse h-40 bg-gray-200 rounded"></div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Payments</h3>
        <button
          onClick={() => router.push('/payment/history')}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
        >
          <FaHistory /> View All
        </button>
      </div>

      {payments.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 text-sm">No payments yet</p>
      ) : (
        <div className="space-y-3">
          {payments.slice(0, 5).map(payment => (
            <div
              key={payment.id}
              className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors"
              onClick={() => router.push(`/payment/success?payment_id=${payment.id}`)}
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white capitalize">{payment.payment_type}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{payment.transaction_ref}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900 dark:text-white">{payment.total_amount.toFixed(2)} TND</p>
                <p className={`text-xs font-medium ${
                  payment.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {payment.status}
                </p>
              </div>
              <FaArrowRight className="text-gray-400 ml-2" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

### 5. Freelancer Profile Page (`app/freelancer/[id]/page.jsx`)

**Location:** Profile action section  
**Priority:** MEDIUM

```javascript
'use client';

import { useRouter } from 'next/navigation';
import { FaMoneyBill } from 'react-icons/fa';

export default function FreelancerProfilePage({ params }) {
  const router = useRouter();

  // Assuming freelancer data
  const freelancer = {
    id: params.id,
    name: 'Jane Smith',
    hourly_rate: 50,
    title: 'Senior Developer'
  };

  const handleHireFreelancer = () => {
    // For hourly rate, user can specify hours during payment
    const defaultAmount = freelancer.hourly_rate * 10; // Default to 10 hours

    router.push(
      `/payment?type=project&amount=${defaultAmount}&receiver_id=${freelancer.id}&title=${encodeURIComponent(`Hire ${freelancer.name}`)}`
    );
  };

  return (
    <div>
      {/* ... freelancer profile content ... */}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="text-center mb-6">
          <p className="text-2xl font-bold text-blue-600">${freelancer.hourly_rate}/hr</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Hourly Rate</p>
        </div>

        <button
          onClick={handleHireFreelancer}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <FaMoneyBill /> Hire Freelancer
        </button>
      </div>
    </div>
  );
}
```

---

## 🔄 Payment Flow Summary

### User Perspective
```
1. User clicks "Pay Now" / "Hire" / "Enroll" button
   ↓
2. Redirected to /payment with params
   ↓
3. Form pre-populates with amount & fees
   ↓
4. User enters transaction reference
   ↓
5. Submits payment (paymentService.create)
   ↓
6. Redirected to /payment/success
   ↓
7. Payment details displayed
   ↓
8. Can view history or go to dashboard
```

---

## 📋 Common URL Parameters

| Parameter | Type | Example | Required |
|-----------|------|---------|----------|
| `type` | string | `project`, `service`, `course` | ✅ Yes |
| `amount` | number | `500` | ✅ Yes |
| `receiver_id` | number | `3` | ✅ Yes |
| `project_id` | number | `123` | ❌ No |
| `service_id` | number | `456` | ❌ No |
| `course_id` | number | `789` | ❌ No |
| `title` | string | `Project Payment` | ❌ No |

---

## 🛠️ Error Handling

```javascript
const handlePayment = async (paymentData) => {
  try {
    if (!paymentData.amount || paymentData.amount <= 0) {
      throw new Error('Invalid amount');
    }

    if (!paymentData.receiver_id) {
      throw new Error('Receiver not specified');
    }

    // Navigate to payment form
    router.push(
      `/payment?type=${paymentData.type}&amount=${paymentData.amount}&receiver_id=${paymentData.receiver_id}`
    );
  } catch (err) {
    alert(`Payment error: ${err.message}`);
  }
};
```

---

## 🎨 Button Styling Templates

### Primary CTA Button
```jsx
<button
  onClick={handlePayment}
  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
>
  <FaCreditCard /> Pay Now
</button>
```

### Secondary Action Button
```jsx
<button
  onClick={handlePayment}
  className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
>
  Make Payment
</button>
```

---

## 📱 Mobile Responsive Modifications

```javascript
// For smaller screens, consider adjusting button text
const buttonText = isMobile ? 'Pay' : 'Pay Now';

// For smaller screens, use column layout
const gridClass = isMobile ? 'flex flex-col gap-2' : 'grid grid-cols-2 gap-4';
```

---

## 🔐 Security Best Practices

1. **Validate on Frontend:**
   ```javascript
   if (amount <= 0 || amount > MAX_PAYMENT_AMOUNT) {
     return alert('Invalid payment amount');
   }
   ```

2. **Check Authentication:**
   ```javascript
   const { user } = useAuth();
   if (!user) {
     router.push('/login');
     return;
   }
   ```

3. **Sanitize User Input:**
   ```javascript
   const safeTitle = title.replace(/[<>]/g, '').substring(0, 100);
   ```

---

## 📊 Testing Integration

```javascript
// Test payment initiation
describe('Payment Integration', () => {
  it('should navigate to payment page with correct params', () => {
    handlePayment({
      type: 'project',
      amount: 500,
      receiver_id: 3
    });

    expect(router.push).toHaveBeenCalledWith(
      '/payment?type=project&amount=500&receiver_id=3'
    );
  });
});
```

---

## ✅ Integration Checklist

- [ ] Import `useRouter` from `next/navigation`
- [ ] Implement `handlePayment` function
- [ ] Add payment button with onClick handler
- [ ] Test with valid parameters
- [ ] Test error scenarios (missing fields)
- [ ] Verify redirection to payment form
- [ ] Check responsive design
- [ ] Verify fee calculation in payment form
- [ ] Test success page display
- [ ] Verify payment history tracking

---

## 📞 Need Help?

Refer to:
- `PAYMENT_SYSTEM_COMPLETE.md` - Full system documentation
- `lib/dataService.js` → `paymentService` - Service implementation
- `app/payment/page.jsx` - Payment form reference
- `app/payment/history/page.jsx` - History page reference

