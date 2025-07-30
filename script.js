document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if (!name || !service || !date || !time) {
      alert("Please fill out all fields.");
      return;
    }

    const booking = {
      name,
      service,
      date,
      time,
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("tailorBookings")) || [];
    existing.push(booking);
    localStorage.setItem("tailorBookings", JSON.stringify(existing));

    successMessage.textContent = `✅ Booking Successful! Thank you, ${name}.`;
    successMessage.style.display = "block";

    form.reset();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("bookingsList");
  const bookings = JSON.parse(localStorage.getItem("tailorBookings")) || [];

  if (bookings.length === 0) {
    container.innerHTML = "<p>Hmmm. It seems like you have no active bookings yet. Go book something <a href='booking.html'>Here<a></p>";
    return;
  }

  bookings.forEach((booking, index) => {
    const card = document.createElement("div");
    card.classList.add("booking-card");
    card.innerHTML = `
        <h3>Booking #${index + 1}</h3>
        <p><strong>Name:</strong> ${booking.name}</p>
        <p><strong>Service:</strong> ${booking.service}</p>
        <p><strong>Date:</strong> ${booking.date}</p>
        <p><strong>Time:</strong> ${booking.time}</p>
        <p><small><strong>Created:</strong> ${new Date(
          booking.createdAt
        ).toLocaleString()}</small></p>
      `;
    container.appendChild(card);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleDarkMode");
  const isDark = localStorage.getItem("darkMode") === "true";

  if (isDark) {
    document.body.classList.add("dark-mode");
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const darkEnabled = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", darkEnabled);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const queryParams = new URLSearchParams(window.location.search);
  const tailorId = queryParams.get("id");

  // Example: static tailor data
  const tailors = [
    {
      id: "1",
      name: "Grace Couture",
      location: "Lagos, Nigeria",
      service: "Custom gowns, Bridal fittings, alterations",
      image: "img/beautiful-curly-brunette-dark-skinned-fashion-designer-poses-office-leans-table.jpg",
      bio: "Specialist in traditional and modern outfit design. 10+ years of experience.",
    },
    {
      id: "2",
      name: "David Stitch",
      location: "Abuja",
      service: "Fittings & Repairs",
      image:
        "img/medium-shot-man-repairing-fashion-goods (1).jpg",
      bio: "Quick-fix tailoring and professional fittings for all body types.",
    },
    {
      id: "3",
      name: "Sophie's Stitches",
      location: " Ibadan",
      service: "Kidswear, casuals, repairs",
      image: "img/medium-shot-black-woman-running-small-business.jpg",
      bio: "Expert in bridal and formal wear with a keen eye for detail. 15+ years in the industry.",
    }
  ];

  const tailor = tailors.find((t) => t.id === tailorId);

  const container = document.getElementById("tailorProfile");

  if (!tailor) {
    container.innerHTML = "<p>Tailor not found.</p>";
    return;
  }

  container.innerHTML = `
      <div class="tailor-profile">
        <img src="${tailor.image}" alt="${tailor.name}" />
        <h2>${tailor.name}</h2>
        <p><strong>Location:</strong> ${tailor.location}</p>
        <p><strong>Specialty:</strong> ${tailor.service}</p>
        <p>${tailor.bio}</p>
        <a href="booking.html" class="btn">Book This Tailor</a>
      </div>
    `;
});

  
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const tailorCards = document.querySelectorAll(".tailor-card");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    tailorCards.forEach((card) => {
      const location = card.dataset.location.toLowerCase();
      const service = card.dataset.service.toLowerCase();

      const match = location.includes(query) || service.includes(query);
      card.style.display = match ? "block" : "none";
    });
  });
});
  
    const form = document.getElementById('form');
    const firstname_Input = document.getElementById('firstname-input');
    const email_Input = document.getElementById('email-input');
    const password_Input = document.getElementById('password-input');
    const repeat_Password_Input = document.getElementById('repeat-password-input');
    const error_message = document.getElementById('error-message');

    form.addEventListener('submit', (e) => {
        let errors = [];

        errors = getSignupFormErrors(
            firstname_Input,
            email_Input,
            password_Input,
            repeat_Password_Input
        );

        if (errors.length > 0) {
            e.preventDefault(); // Stop form submission
            error_message.textContent = errors.join(', ');
        }
    });

    function getSignupFormErrors(firstnameEl, emailEl, passwordEl, repeatPasswordEl) {
        let errors = [];
        const firstname = firstnameEl.value.trim();
        const email = emailEl.value.trim();
        const password = passwordEl.value;
        const repeatPassword = repeatPasswordEl.value;

        if (firstname === '') {
            errors.push('Username is required');
            firstnameEl.parentElement.classList.add('incorrect');
        }

        if (email === '') {
            errors.push('Email is required');
            emailEl.parentElement.classList.add('incorrect');
        }

        if (password === '') {
            errors.push('Password is required');
            passwordEl.parentElement.classList.add('incorrect');
        } else if (password.length < 6) {
            errors.push('Password must be at least 6 characters long');
            passwordEl.parentElement.classList.add('incorrect');
        }

        if (password !== repeatPassword) {
            errors.push('Passwords do not match');
            passwordEl.parentElement.classList.add('incorrect');
            repeatPasswordEl.parentElement.classList.add('incorrect');
        }

        return errors;
    }

    function getLoginFormErrors(emailEl, passwordEl) {
        let errors = [];
        const email = emailEl.value.trim();
        const password = passwordEl.value;

        if (email === '') {
            errors.push('Email is required');
            emailEl.parentElement.classList.add('incorrect');
        }

        if (password === '') {
            errors.push('Password is required');
            passwordEl.parentElement.classList.add('incorrect');
        }

        return errors;
    }

    const allInputs = [firstname_Input, email_Input, password_Input, repeat_Password_Input];
    allInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.parentElement.classList.contains('incorrect')) {
                input.parentElement.classList.remove('incorrect');
                error_message.innerText = '';
            }
        });
    });
