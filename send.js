import sendInfo from "./index.js";

const form = document.querySelector('form');
const membersDiv = document.querySelector('.members');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  submitForm();
});

const submitForm = async () => {
  try {
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.value = 'Submitting...';
    membersDiv.innerHTML = '<h3>Loading...</h3><div class="member-info">Please wait while we process your registration...</div>';

    const response = await fetch('http://localhost:55000/send-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendInfo())
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      // Display group and members
      displayGroupMembers(data);
      form.reset();
    } else {
      showError(data.message || 'Registration failed. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    showError(error.message || 'Network error. Is the backend running on localhost:55000?');
  } finally {
    // Reset button
    submitBtn.disabled = false;
    submitBtn.value = 'Submit';
  }
};

const displayGroupMembers = (data) => {
  const { group, groupMembers, isNewStudent } = data;
  const newLabel = isNewStudent ? ' (NEW)' : '';

  let html = `<h3>Group: ${group}${newLabel} - ${groupMembers.length} members</h3>`;

  groupMembers.forEach(member => {
    html += `
      <div class="member-info">
        <strong>${member.name}</strong><br>
        Index: ${member.indexNumber}<br>
        Student ID: ${member.studentId}<br>
        Phone: ${member.phoneNumber}
      </div>
    `;
  });

  membersDiv.innerHTML = html;
};

const showError = (message) => {
  membersDiv.innerHTML = `<h3 style="color: red;">Error</h3><div class="member-info" style="color: red;">${message}</div>`;
};
