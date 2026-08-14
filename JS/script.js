// ==============================
// BOOKING FORM VALIDATION
// ==============================

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    bookingForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const date = document.getElementById("date").value;
        const guests = document.getElementById("guests").value;

        if (
            name === "" ||
            email === "" ||
            phone === "" ||
            date === "" ||
            guests === ""
        ) {
            alert("Please complete all required fields.");
            return;
        }

        alert(
            "Thank you, " +
            name +
            ". Your booking enquiry has been received."
        );

        bookingForm.reset();
    });
}