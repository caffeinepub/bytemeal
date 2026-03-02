/**
 * ByteMeal – Standalone Shared Utilities
 * Works via file:// protocol, no build tools required.
 */

/* ============================================================
   Mobile Navigation Toggle
   ============================================================ */
function toggleMobileNav() {
  var navLinks = document.getElementById('navLinks');
  var hamburger = document.getElementById('hamburger');
  if (!navLinks) return;

  var isOpen = navLinks.classList.toggle('open');
  if (hamburger) {
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }
}

// Close nav when clicking outside
document.addEventListener('click', function (e) {
  var navLinks = document.getElementById('navLinks');
  var hamburger = document.getElementById('hamburger');
  if (!navLinks || !navLinks.classList.contains('open')) return;
  if (!navLinks.contains(e.target) && e.target !== hamburger && !hamburger.contains(e.target)) {
    navLinks.classList.remove('open');
  }
});

/* ============================================================
   Toast Notifications
   ============================================================ */
function showToast(message, type) {
  type = type || 'info';
  var container = document.getElementById('toastContainer');
  if (!container) return;

  var toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.innerHTML =
    '<span class="toast-message">' + message + '</span>' +
    '<span class="toast-dismiss" onclick="dismissToast(this.parentElement)" title="Dismiss">✕</span>';

  container.appendChild(toast);

  // Auto-dismiss after 4 seconds
  var timer = setTimeout(function () {
    dismissToast(toast);
  }, 4000);

  // Click to dismiss early
  toast.addEventListener('click', function () {
    clearTimeout(timer);
    dismissToast(toast);
  });
}

function dismissToast(toastEl) {
  if (!toastEl || !toastEl.parentElement) return;
  toastEl.style.animation = 'toastOut 0.3s ease forwards';
  setTimeout(function () {
    if (toastEl.parentElement) {
      toastEl.parentElement.removeChild(toastEl);
    }
  }, 300);
}

/* ============================================================
   Form Validation Helpers
   ============================================================ */
function showFieldError(fieldId, message) {
  var el = document.getElementById(fieldId);
  if (el) {
    el.textContent = message;
    el.style.display = 'block';
  }
}

function clearErrors() {
  var errors = document.querySelectorAll('.field-error');
  errors.forEach(function (el) {
    el.textContent = '';
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ============================================================
   Button Loading State
   ============================================================ */
function setButtonLoading(button, isLoading) {
  if (!button) return;
  var textEl = button.querySelector('[id$="Text"]') || button.querySelector('span:first-child');
  var spinnerEl = button.querySelector('[id$="Spinner"]') || button.querySelector('.spinner');

  if (isLoading) {
    button.disabled = true;
    button.style.opacity = '0.75';
    if (textEl) textEl.style.opacity = '0.5';
    if (spinnerEl) spinnerEl.classList.remove('hidden');
  } else {
    button.disabled = false;
    button.style.opacity = '';
    if (textEl) textEl.style.opacity = '';
    if (spinnerEl) spinnerEl.classList.add('hidden');
  }
}

/* ============================================================
   Timestamp Generator
   ============================================================ */
function generateTimestamp() {
  return new Date().toISOString();
}

/* ============================================================
   localStorage Helpers – Donations
   ============================================================ */
function getDonations() {
  try {
    var raw = localStorage.getItem('donations');
    if (!raw) return [];
    var parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function saveDonation(data) {
  try {
    var donations = getDonations();
    var record = Object.assign({}, data, {
      id: 'don_' + Date.now(),
      status: 'available',
      timestamp: generateTimestamp()
    });
    donations.push(record);
    localStorage.setItem('donations', JSON.stringify(donations));
    return record;
  } catch (e) {
    console.warn('Could not save donation:', e);
    return null;
  }
}

/* ============================================================
   localStorage Helpers – Assistance Requests
   ============================================================ */
function getAssistanceRequests() {
  try {
    var raw = localStorage.getItem('assistanceRequests');
    if (!raw) return [];
    var parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function saveAssistanceRequest(data) {
  try {
    var requests = getAssistanceRequests();
    var record = Object.assign({}, data, {
      id: 'req_' + Date.now(),
      status: 'pending',
      timestamp: generateTimestamp()
    });
    requests.push(record);
    localStorage.setItem('assistanceRequests', JSON.stringify(requests));
    return record;
  } catch (e) {
    console.warn('Could not save assistance request:', e);
    return null;
  }
}

/* ============================================================
   localStorage Helpers – Volunteers
   ============================================================ */
function getVolunteers() {
  try {
    var raw = localStorage.getItem('volunteers');
    if (!raw) return [];
    var parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function saveVolunteer(data) {
  try {
    var volunteers = getVolunteers();
    var record = Object.assign({}, data, {
      id: 'vol_' + Date.now(),
      status: 'active',
      timestamp: generateTimestamp()
    });
    volunteers.push(record);
    localStorage.setItem('volunteers', JSON.stringify(volunteers));
    return record;
  } catch (e) {
    console.warn('Could not save volunteer:', e);
    return null;
  }
}

/* ============================================================
   Platform Stats Aggregation
   ============================================================ */
function getStats() {
  var donations = getDonations();
  var requests = getAssistanceRequests();
  var volunteers = getVolunteers();
  var claimed = donations.filter(function (d) { return d.status === 'claimed'; }).length;

  return {
    donations: donations.length,
    assistanceRequests: requests.length,
    volunteers: volunteers.length,
    claimed: claimed
  };
}
