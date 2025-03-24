// script.js

const students = Array.from({ length: 40 }, (_, i) => `${201 + i}`);

const attendanceTable = document.getElementById('attendanceTable');
const subjectSelect = document.getElementById('subjectSelect');
const dateInput = document.getElementById('dateInput');

// Create a container for the share button
const shareButton = document.createElement('button');
shareButton.textContent = 'Share Attendance';
shareButton.className = 'share-btn';

const shareButtonContainer = document.createElement('div');
shareButtonContainer.className = 'share-btn-container';
shareButtonContainer.appendChild(shareButton);
document.body.appendChild(shareButtonContainer);

function generateTable() {
  attendanceTable.innerHTML = '';

  if (!dateInput.value) {
    return;
  }

  // Calculate the number of columns per row
  const columnsPerRow = 4; // Adjust this value as needed
  let row;

  students.forEach((student, index) => {
    // Create a new row every `columnsPerRow` students
    if (index % columnsPerRow === 0) {
      row = document.createElement('tr');
      attendanceTable.appendChild(row);
    }

    const studentCell = document.createElement('td');
    const toggleButton = document.createElement('button');
    toggleButton.textContent = student;
    toggleButton.className = 'attendance-btn absent';

    toggleButton.addEventListener('click', () => {
      if (toggleButton.classList.contains('absent')) {
        toggleButton.textContent = `${student} (Present)`;
        toggleButton.className = 'attendance-btn present';
      } else {
        toggleButton.textContent = `${student} (Absent)`;
        toggleButton.className = 'attendance-btn absent';
      }
    });

    studentCell.appendChild(toggleButton);
    row.appendChild(studentCell);
  });
}

function shareAttendance() {
  const selectedSubject = subjectSelect.value;
  const selectedDate = dateInput.value;
  if (!selectedDate) {
    alert('Please select a date before sharing attendance.');
    return;
  }

  const presentStudents = [];
  const rows = attendanceTable.querySelectorAll('td');
  rows.forEach(cell => {
    const button = cell.querySelector('button');
    const studentName = button.textContent.split(' ')[0];
    if (button.classList.contains('present')) {
      presentStudents.push(studentName);
    }
  });

  if (presentStudents.length === 0) {
    alert('No students marked as Present to share.');
    return;
  }

  const message = `*University of Calcutta*\n *MCA 2nd Sem Attendance*\n*Subject:* ${selectedSubject}\n*Date:* ${selectedDate}\n*Present Students:*\n${presentStudents.join(', ')}`;
  const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, '_blank');
}

shareButton.addEventListener('click', shareAttendance);
subjectSelect.addEventListener('change', generateTable);
dateInput.addEventListener('change', generateTable);

generateTable();
