var typed = new Typed('.text', {
    strings: ['Frontend Developer', 'Full Stack Developer', 'UI / UX Designer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    };

    try {

        const response = await fetch("http://localhost:3001/api/contact", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });

        const result = await response.json();

        if (result.success) {

            alert("Message sent successfully!");

            contactForm.reset();

        } else {

            alert(result.message);

        }

    } catch (error) {

        console.error(error);

        alert("Server Error");

    }

});