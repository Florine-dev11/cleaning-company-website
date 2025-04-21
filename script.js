// Mobile Menu Toggle
document.querySelector(".burger").addEventListener("click", function () {
  const navLinks = document.querySelector(".nav-links");
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
});

// Testimonial Slider (Simple Version)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll(".testimonial");

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.style.display = i === index ? "block" : "none";
  });
}

// Auto-rotate testimonials every 5 seconds
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 5000);

// Initialize
showTestimonial(0);
// FAQ Toggle Functionality
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    question.classList.toggle("active");
    answer.classList.toggle("show");
  });
});
// Booking Form Multi-Step Logic
document.addEventListener("DOMContentLoaded", function () {
  // Initialize date picker
  flatpickr("#date", {
    minDate: "today",
    dateFormat: "Y-m-d",
    disable: [
      function (date) {
        // Disable Sundays
        return date.getDay() === 0;
      },
    ],
  });

  // Step navigation
  const steps = document.querySelectorAll(".form-step");
  const nextButtons = document.querySelectorAll(".next-step");
  const prevButtons = document.querySelectorAll(".prev-step");

  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const currentStep = document.querySelector(".form-step.active");
      const currentStepNumber = parseInt(currentStep.dataset.step);

      // Validate before proceeding
      if (validateStep(currentStepNumber)) {
        currentStep.classList.remove("active");
        steps[currentStepNumber].classList.add("active");
      }
    });
  });

  prevButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const currentStep = document.querySelector(".form-step.active");
      const currentStepNumber = parseInt(currentStep.dataset.step);

      currentStep.classList.remove("active");
      steps[currentStepNumber - 2].classList.add("active");
    });
  });

  // Price calculation
  document
    .getElementById("calculatePrice")
    .addEventListener("click", calculateTotal);

  // Form submission
  document
    .getElementById("bookingForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Booking confirmed! We’ll contact you shortly.");
      // In a real app: Send data to backend
    });
});

function validateStep(stepNumber) {
  let isValid = true;
  const currentStep = document.querySelector(
    `.form-step[data-step="${stepNumber}"]`
  );

  // Check required fields
  const requiredFields = currentStep.querySelectorAll("[required]");
  requiredFields.forEach((field) => {
    if (!field.value) {
      field.style.borderColor = "red";
      isValid = false;
    } else {
      field.style.borderColor = "#ddd";
    }
  });

  return isValid;
}

function calculateTotal() {
  const service = document.getElementById("service");
  const addOns = document.querySelectorAll('input[name="addon"]:checked');
  let total = 0;

  // Base price
  if (service.selectedOptions[0].dataset.price) {
    total += parseFloat(service.selectedOptions[0].dataset.price);
  }

  // Add-ons
  addOns.forEach((addon) => {
    total += parseFloat(addon.dataset.price);
  });

  // Frequency discount (example: 10% off for weekly)
  const frequency = document.getElementById("frequency");
  if (frequency.value !== "one_time") {
    total *= 0.9; // 10% discount
  }

  // Update summary
  document.getElementById("summaryDetails").innerHTML = `
        <div class="summary-item">
            <span>${service.selectedOptions[0].text}</span>
            <span>$${service.selectedOptions[0].dataset.price}</span>
        </div>
        ${Array.from(addOns)
          .map(
            (addon) => `
            <div class="summary-item">
                <span>${addon.parentElement.textContent.trim()}</span>
                <span>+$${addon.dataset.price}</span>
            </div>
        `
          )
          .join("")}
        ${
          frequency.value !== "one_time"
            ? `
            <div class="summary-item">
                <span>${
                  frequency.options[frequency.selectedIndex].text
                } (10% off)</span>
                <span>-$${(total * 0.1).toFixed(2)}</span>
            </div>
        `
            : ""
        }
    `;

  // Update total
  document.getElementById("totalPrice").textContent = `$${total.toFixed(2)}`;

  // Proceed to summary
  document.querySelector(".form-step.active").classList.remove("active");
  document.querySelector('.form-step[data-step="4"]').classList.add("active");
}
// Google Maps Integration
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: 47.6062, lng: -122.3321 }, // Replace with your city's coordinates
  });

  // Add markers for service areas (replace with your locations)
  const locations = [
    { lat: 47.6062, lng: -122.3321, title: "Seattle HQ" },
    { lat: 47.6101, lng: -122.2015, title: "Bellevue" },
    { lat: 47.6739, lng: -122.1215, title: "Redmond" },
  ];

  locations.forEach((location) => {
    new google.maps.Marker({
      position: location,
      map: map,
      title: location.title,
    });
  });
}
// Contact Form Submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value;

  // Simple validation
  if (!name || !email || !message) {
    alert("Please fill in all required fields.");
    return;
  }

  // In a real app: Send data to backend (e.g., via Fetch API)
  alert(
    `Thanks, ${name}! We'll contact you soon about your ${
      service || "inquiry"
    }.`
  );
  this.reset();
});

// Google Maps for Contact Page
function initMap() {
  const officeLocation = { lat: 47.6062, lng: -122.3321 }; // Replace with your coordinates
  const map = new google.maps.Map(document.getElementById("contactMap"), {
    zoom: 15,
    center: officeLocation,
  });

  new google.maps.Marker({
    position: officeLocation,
    map: map,
    title: "CleanPro Office",
  });
}
