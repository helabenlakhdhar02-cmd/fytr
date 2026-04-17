# Payment Routes & Navigation Setup

## 📍 Payment Route Structure

### Core Payment Routes
```
/payment                    → Payment Form (Submit payment with transaction ref)
/payment/success           → Payment Success/Verification Page
/payment/history           → Payment History & Management
```

---

## 🔗 Route Definitions

### 1. **Payment Form Route**
**Route:** `/payment`  
**File:** `app/payment/page.jsx`  
**Purpose:** Main payment form where users enter transaction details

**URL Parameters:**
```
?type=project|service|course
&amount=500
&receiver_id=3
&project_id=123 (optional)
&service_id=456 (optional)
&course_id=789 (optional)
&title=Payment Title (optional)
```

**Example:**
```
/payment?type=project&amount=500&receiver_id=3&project_id=123&title=Website%20Redesign
```

---

### 2. **Payment Success Route**
**Route:** `/payment/success`  
**File:** `app/payment/success/page.jsx`  
**Purpose:** Display payment status after submission

**URL Parameters:**
```
?payment_id=12345
```

**Example:**
```
/payment/success?payment_id=123
```

---

### 3. **Payment History Route**
**Route:** `/payment/history`  
**File:** `app/payment/history/page.jsx`  
**Purpose:** View all sent and received payments

**Features:**
- Payment list table
- Search by transaction reference or ID
- Filter by status (pending, completed, failed, cancelled)
- View payment details
- Download receipts (stub)

---

## 🧭 Navigation Integration

### Desktop Navigation

#### Navbar Profile Dropdown
**Location:** `components/Navbar.jsx` (Lines 500-510)
```
Profile Menu
├── My Profile
├── 💳 Payment History ← NEW
├── Settings
└── Sign out
```

#### Role-Based Top Navigation

**FreelancerNav** (`components/navigation/FreelancerNav.jsx`)
```
Left Links:
├── Academy
├── Workspace
└── 💳 Payments ← NEW

Right Links:
├── Home
└── Ranked Badge
```

**ClientNav** (`components/navigation/ClientNav.jsx`)
```
Left Links:
├── Home
├── Fytrs
└── 💳 Payments ← NEW

Center: Theme Toggle

Right Links:
├── Panel
└── Projects
```

---

### Mobile Navigation

#### MobileNav Component (`components/navigation/MobileNav.jsx`)

**Freelancer Mobile Menu:**
```
1. Academy
2. Workspace
3. 💳 Payments ← NEW
4. Home
5. Ranked (Button)
```

**Client Mobile Menu:**
```
1. Home
2. Fytrs
3. 💳 Payments ← NEW
4. Services
5. Projects
```

---

## 🚀 Payment Initiation Routes

### From Project Details Page
**Route:** `app/project-details/page.jsx`

**Button:** "Pay Freelancer" (Green)  
**Visibility:** Shows only when freelancer is selected

**Click Handler:**
```javascript
router.push(
  `/payment?type=project&amount=${budget}&receiver_id=${freelancerId}&project_id=${projectId}&title=${title}`
);
```

---

### From Services List Page
**Route:** `components/ServiceCard.jsx`

**Button:** "Hire" (Green)  
**Location:** Service card footer next to "View" button

**Click Handler:**
```javascript
router.push(
  `/payment?type=service&amount=${price}&receiver_id=${freelancerId}&service_id=${serviceId}&title=${title}`
);
```

---

### From Course Details Page
**Route:** `app/courses/[id]/page.jsx`

**Button:** "Enroll Now" or "Enroll for $X" (Blue)  
**Visibility:** Always visible

**Click Handler:**
```javascript
router.push(
  `/payment?type=course&amount=${price}&receiver_id=${instructorId}&course_id=${courseId}&title=${title}`
);
```

---

## 📊 Payment Flow Diagram

```
User Action
    ↓
┌─────────────────────────────────────────┐
│   Page with Payment Action              │
│   • Project Details                     │
│   • Services List                       │
│   • Course Details                      │
└──────────┬──────────────────────────────┘
           │ Click "Pay Now"
           ↓
┌─────────────────────────────────────────┐
│   /payment?type=...&amount=...          │
│   (PaymentForm Component)               │
│   • Display breakdown                   │
│   • Enter transaction ref               │
│   • Validate input                      │
└──────────┬──────────────────────────────┘
           │ Submit payment
           ↓
┌─────────────────────────────────────────┐
│   Backend API                           │
│   POST /fyter/payments/                 │
│   • Create payment record               │
│   • Set status to "pending"             │
│   • Return payment ID                   │
└──────────┬──────────────────────────────┘
           │ Redirect
           ↓
┌─────────────────────────────────────────┐
│   /payment/success?payment_id=123       │
│   (PaymentSuccess Component)            │
│   • Fetch payment details               │
│   • Display status                      │
│   • Show actions                        │
└──────────┬──────────────────────────────┘
           │ User clicks "Payment History"
           ↓
┌─────────────────────────────────────────┐
│   /payment/history                      │
│   (PaymentHistory Component)            │
│   • List all payments                   │
│   • Search & filter                     │
│   • View details                        │
└─────────────────────────────────────────┘
```

---

## 🔄 Navigation Links Map

### From Payment Form
```
/payment
├── Back → Previous page (router.back())
├── View History → /payment/history
└── Submit Payment → /payment/success?payment_id={id}
```

### From Payment Success
```
/payment/success?payment_id=123
├── Go to Dashboard → /dashboard
├── Payment History → /payment/history
└── Download Receipt → (Future feature)
```

### From Payment History
```
/payment/history
├── Back → Previous page
├── View Details → /payment/success?payment_id={id}
└── Clear Filters → Reset search/filter
```

---

## 🎨 Navigation Icons Used

| Icon | Component | Route |
|------|-----------|-------|
| `FaHistory` | Payment History | `/payment/history` |
| `FaCreditCard` | Payment Form | `/payment` |
| `FaCheckCircle` | Payment Success | `/payment/success` |
| `FaMoneyBillWave` | Payments (Profile) | `/payment/history` |
| `FaShoppingCart` | Enroll Course | `/payment` |
| `FaMoneyBill` | Pay Project | `/payment` |

---

## 🔐 Authentication & Access Control

### Who Can Access Payment Routes?
- ✅ Authenticated users only
- ✅ Both clients and freelancers
- ✅ Admin users (for monitoring)

### Route Protection
- Payment form requires `receiver_id` parameter
- Success page requires `payment_id` parameter
- History page shows user's own payments only

---

## 📱 Responsive Behavior

### Desktop (md and above)
- Full navigation menu visible
- Inline payment links in navbar
- Quick access from profile dropdown

### Mobile (below md)
- Mobile menu drawer with payment link
- Role-specific navigation
- Touch-friendly buttons

---

## 🧪 Testing Checklist

- [ ] Payment link from Project Details works
- [ ] Payment link from Services List works
- [ ] Payment link from Course Details works
- [ ] Payment History link from navbar works
- [ ] Payment History link from mobile menu works
- [ ] URL parameters pass correctly
- [ ] Form receives parameters correctly
- [ ] Success page with payment_id works
- [ ] Redirect from payment form to success works
- [ ] All navigation links responsive on mobile
- [ ] Fee calculation displays (15% vs 25%)
- [ ] Status badges show correct states

---

## 🔗 Quick Navigation Links

### Development URLs
```
http://localhost:3000/payment/history                    → Payment History
http://localhost:3000/payment                            → Payment Form
http://localhost:3000/payment/success?payment_id=1       → Payment Success
```

### Payment Form Test URLs
```
http://localhost:3000/payment?type=project&amount=500&receiver_id=3&project_id=1&title=Test

http://localhost:3000/payment?type=service&amount=750&receiver_id=5&service_id=2&title=Service

http://localhost:3000/payment?type=course&amount=2000&receiver_id=7&course_id=3&title=Course
```

---

## 📝 Implementation Notes

### Added/Modified Files

**Navigation Components:**
- ✅ `components/Navbar.jsx` - Added payment history to profile dropdown
- ✅ `components/navigation/FreelancerNav.jsx` - Added Payments link
- ✅ `components/navigation/ClientNav.jsx` - Added Payments link  
- ✅ `components/navigation/MobileNav.jsx` - Added Payments for mobile

**Payment Integration:**
- ✅ `app/project-details/page.jsx` - Added "Pay Freelancer" button
- ✅ `app/courses/[id]/page.jsx` - Added "Enroll Now" payment button
- ✅ `components/ServiceCard.jsx` - Added "Hire" payment button

**Payment Pages:**
- ✅ `app/payment/page.jsx` - Main form (fixed)
- ✅ `app/payment/success/page.jsx` - Success display
- ✅ `app/payment/history/page.jsx` - History view

---

## 🚀 Future Enhancements

1. **Dashboard Payment Widget:** Real-time payment stats
2. **Payment Notifications:** Email/SMS on status change
3. **Receipt Generation:** PDF download from success page
4. **Payment Analytics:** Charts and insights for freelancers
5. **Refund Management:** Handle refund requests
6. **Subscription Payments:** Recurring payment support
7. **Multi-currency Support:** Accept payments in different currencies
8. **Payment Methods Integration:** Credit card, digital wallets

---

## 📞 Support

For issues with payment routes and navigation:
1. Check URL parameters match the expected format
2. Verify receiver_id is valid user ID
3. Ensure payment_id is correct for success page
4. Check browser console for navigation errors
5. Validate authentication token in cookies

