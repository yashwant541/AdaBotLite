let step = 0; // Current question step
const questions = [
  { text: "What is your name?", arabic: "<span style='font-size: 1.5em;'>ما اسمك؟</span>", key: "name" },
  { text: "Let me call you - What's your number?", arabic: "<span style='font-size: 1.5em;'>دعني اتصل بك - ما رقمك؟</span>", key: "number" },
  { text: "What is your email address?", arabic: "<span style='font-size: 1.5em;'>ما هو عنوان بريدك الإلكتروني؟</span>", key: "email" }
];

const formData = {};
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


document.getElementById("questionnaire-form").addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = new FormData();
  formData.append("entry.1047060156", document.getElementById("name").value); // Name field
  formData.append("entry.2101188198", document.getElementById("phone").value); // Phone field
  formData.append("entry.1462208696", document.getElementById("email").value); // Email field

  fetch("https://script.google.com/macros/s/AKfycbykLWyE5D8vJwJzly_MoJrwerQZlpa27tCFarmwykhNNc_P53UDGLpkzD3pzmxO-CFY/exec", {  // Replace with your Google Apps Script Web App URL
    method: "POST",
    body: formData,
    mode: "no-cors"  // Required for Google Apps Script
  })
  .then(() => {
      chatBox.innerHTML = `<p style='font-size: 1.5em; text-align: center;'>
        ${isArabic ? "شكرًا لك على تقديم النموذج. سنتواصل معك قريبًا." : "Thank you for submitting the form. We will reach out to you shortly."}
      </p>`;
    })
    .catch(() => {
      alert(isArabic ? "فشل الإرسال. حاول مرة أخرى." : "Failed to submit. Please try again later.");
    });
});

// Initialize the first question
showQuestion();
