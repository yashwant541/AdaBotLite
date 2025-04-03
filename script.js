let step = 0; // Current question step
const questions = [
  { text: "What is your name?", arabic: "<span style='font-size: 1.5em;'>ما اسمك؟</span>", key: "name" },
  { text: "Let me call you - What's your number?", arabic: "<span style='font-size: 1.5em;'>دعني اتصل بك - ما رقمك؟</span>", key: "phone" },
  { text: "What is your email address?", arabic: "<span style='font-size: 1.5em;'>ما هو عنوان بريدك الإلكتروني؟</span>", key: "email" }
];

const formData = {}; // This will collect the form answers
const salmaMessage = document.getElementById("salma-message");
const questionContainer = document.getElementById("question-container");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const languageToggle = document.getElementById("language-toggle");
const chatBox = document.getElementById("chat-box");

let isArabic = false;

// Handle language toggle
languageToggle.addEventListener("click", () => {
  isArabic = !isArabic;
  languageToggle.textContent = isArabic ? "English" : "Arabic";
  updateLanguage();
});

// Function to update Salma's messages in the selected language
function updateLanguage() {
  salmaMessage.innerHTML = isArabic
    ? "<span style='font-size: 1.5em;'>مرحبًا، بكم في جلف واستا! اسمي سلمى.</span>"
    : "Hey, Welcome to Gulf Waasta! My name is Salma.";
  showQuestion();
}

// Show the current question
function showQuestion() {
  questionContainer.innerHTML = `
    <label>${isArabic ? questions[step].arabic : questions[step].text}</label>
    <input type="text" id="${questions[step].key}" required>
  `;
  nextBtn.classList.remove("hidden");
  submitBtn.classList.add("hidden");

  if (step === questions.length - 1) {
    nextBtn.classList.add("hidden");
    submitBtn.classList.remove("hidden");
  }
}

// Move to the next step
nextBtn.addEventListener("click", () => {
  const input = document.getElementById(questions[step].key);
  if (!input.value.trim()) {
    alert(isArabic ? "يرجى تقديم إجابة." : "Please provide an answer.");
    return;
  }
  formData[questions[step].key] = input.value.trim();
  step++;
  if (step < questions.length) {
    showQuestion();
  }
});

// Handle form submission
document.getElementById("questionnaire-form").addEventListener("submit", (e) => {
  e.preventDefault();  // Prevent form from refreshing the page

  // Create FormData using the formData object populated from the previous steps
  let formDataToSend = new FormData();
  formDataToSend.append("entry.1047060156", formData.name);  // Name field
  formDataToSend.append("entry.2101188198", formData.phone);  // Phone field
  formDataToSend.append("entry.1462208696", formData.email);  // Email field

  fetch("https://script.google.com/macros/s/AKfycbykLWyE5D8vJwJzly_MoJrwerQZlpa27tCFarmwykhNNc_P53UDGLpkzD3pzmxO-CFY", {  // Replace with your Google Apps Script Web App URL
    method: "POST",
    body: formDataToSend,
    mode: "no-cors"  // This allows sending data to Google Forms without a CORS error
  })
  .then(() => {
    alert("Form submitted successfully!");
    document.getElementById("questionnaire-form").reset();  // Reset form fields
  })
  .catch(() => {
    alert("Failed to submit. Please try again later.");
  });
});

// Initialize the first question
showQuestion();
