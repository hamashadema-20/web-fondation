const STORAGE_KEY = "just_library_borrow_records";

const form = document.getElementById("borrowForm");
const recordIdInput = document.getElementById("recordId");
const studentNameInput = document.getElementById("studentName");
const studentIdInput = document.getElementById("studentId");
const bookTitleInput = document.getElementById("bookTitle");
const borrowDateInput = document.getElementById("borrowDate");
const statusInput = document.getElementById("status");

const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

const recordsBody = document.getElementById("recordsBody");
const noRecordsMessage = document.getElementById("noRecordsMessage");
const recordCountBadge = document.getElementById("recordCount");

function loadRecords() {
  const records = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  displayRecords(records);
}

function displayRecords(records) {
  recordsBody.innerHTML = "";
  if (records.length === 0) {
    noRecordsMessage.classList.remove("d-none");
    recordsBody.parentElement.classList.add("d-none");
    recordCountBadge.textContent = "0 Records";
    return;
  }

  noRecordsMessage.classList.add("d-none");
  recordsBody.parentElement.classList.remove("d-none");
  recordCountBadge.textContent = `${records.length} Records`;

  records.sort((a, b) => new Date(b.borrowDate) - new Date(a.borrowDate));

  records.forEach((record) => {
    const statusClass = getStatusClass(record.status);
    const row = `
            <tr>
                <td><strong>${record.studentId}</strong></td>
                <td>${record.studentName}</td>
                <td>${record.bookTitle}</td>
                <td>${formatDate(record.borrowDate)}</td>
                <td><span class="badge ${statusClass}">${record.status}</span></td>
                <td class="text-center">
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-primary" onclick="editRecord('${record.id}')" title="Edit">
                            ✏️ Edit
                        </button>
                        <button class="btn btn-outline-danger" onclick="deleteRecord('${record.id}')" title="Delete">
                            🗑️ Delete
                        </button>
                    </div>
                </td>
            </tr>`;
    recordsBody.innerHTML += row;
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = recordIdInput.value;
  const recordData = {
    studentName: studentNameInput.value.trim(),
    studentId: studentIdInput.value.trim(),
    bookTitle: bookTitleInput.value.trim(),
    borrowDate: borrowDateInput.value,
    status: statusInput.value,
  };

  const records = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  if (id) {
    const index = records.findIndex((r) => r.id === id);

    if (index !== -1) {
      records[index] = { ...records[index], ...recordData };
      alert("Record updated successfully!");
    }
  } else {
    recordData.id = Date.now().toString();
    records.push(recordData);
    alert("New record added successfully!");
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  resetForm();
  loadRecords();
});

function editRecord(id) {
  const records = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const record = records.find((r) => r.id === id);

  if (!record) return;

  recordIdInput.value = record.id;
  studentNameInput.value = record.studentName;
  studentIdInput.value = record.studentId;
  bookTitleInput.value = record.bookTitle;
  borrowDateInput.value = record.borrowDate;
  statusInput.value = record.status;

  formTitle.innerHTML = `✏️ Edit Record`;
  submitBtn.innerHTML = `🔄 Update Record`;
  cancelBtn.classList.remove("d-none");
  form.scrollIntoView({ behavior: "smooth" });
}

function deleteRecord(id) {
  if (!confirm("Are you sure you want to delete this borrowing record?"))
    return;

  const records = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const updatedRecords = records.filter((r) => r.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
  loadRecords();
  alert("Record deleted successfully.");
}

function resetForm() {
  form.reset();
  recordIdInput.value = "";
  formTitle.innerHTML = `➕ Add New Record`;
  submitBtn.innerHTML = `💾 Save Record`;
  cancelBtn.classList.add("d-none");
}

function getStatusClass(status) {
  switch (status) {
    case "Borrowed":
      return "bg-primary";
    case "Returned":
      return "bg-success";
    case "Overdue":
      return "bg-danger";
    default:
      return "bg-secondary";
  }
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

if (!localStorage.getItem(STORAGE_KEY)) {
  const initialData = [
    {
      id: "1",
      studentName: "Ahmad Ali",
      studentId: "142560",
      bookTitle: "Clean Code",
      borrowDate: "2026-05-10",
      status: "Borrowed",
    },

    {
      id: "2",
      studentName: "Sara Khan",
      studentId: "153200",
      bookTitle: "Gray's Anatomy",
      borrowDate: "2026-04-20",
      status: "Returned",
    },

    {
      id: "3",
      studentName: "Omar Hassan",
      studentId: "161188",
      bookTitle: "Thermodynamics",
      borrowDate: "2026-05-01",
      status: "Overdue",
    },
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
}

loadRecords();
