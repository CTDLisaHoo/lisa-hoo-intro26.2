// ================= FOOTER =================

// Create footer element
const footer = document.createElement("footer");

// Select body
const body = document.querySelector("body");

// Append footer to body
body.appendChild(footer);

// Create date object
const today = new Date();

// Get current year
const thisYear = today.getFullYear();

// Create copyright paragraph
const copyright = document.createElement("p");

copyright.innerHTML = `© Lisa Hoo ${thisYear}`;

// Add paragraph to footer
footer.appendChild(copyright);

// ================= SKILLS SECTION =================

// Array of skills
const skills = ["JavaScript", "HTML", "CSS", "GitHub", "SQL", "Python"];

// Select skills section
const skillsSection = document.querySelector("#skills");

// Select ul inside skills section
const skillsList = skillsSection.querySelector("ul");

// Loop through skills array
for (let i = 0; i < skills.length; i++) {

    // Create li
    const skill = document.createElement("li");

    // Add skill text
    skill.innerText = skills[i];

    // Append to ul
    skillsList.appendChild(skill);
}

// ================= MESSAGES SECTION =================

// Select message section
const messageSection = document.querySelector("#messages");

// Hide section initially
messageSection.style.display = "none";

// Select form
const messageForm = document.forms["leave_message"];

// ================= ASYNC FUNCTION =================

// Simulate async save operation
async function saveMessage(messageData) {

    return new Promise((resolve, reject) => {

        // Simulate server delay
        setTimeout(() => {

            // Simulate success
            resolve("Message saved successfully!");

            // To test errors use:
            // reject("Server error");

        }, 2000);

    });
}

// ================= FORM SUBMIT =================

messageForm.addEventListener("submit", async function (event) {

    // Prevent page refresh
    event.preventDefault();

    // Get form values
    const usersName = event.target.usersName.value;
    const usersEmail = event.target.usersEmail.value;
    const usersMessage = event.target.usersMessage.value;

    // Create message object
    const messageData = {
        usersName,
        usersEmail,
        usersMessage
    };

    // Optional loading message
    console.log("Saving message...");

    try {

        // Wait for async function
        const response = await saveMessage(messageData);

        console.log(response);

        // Show messages section
        messageSection.style.display = "block";

        // Select message list
        const messageList = messageSection.querySelector("ul");

        // Create new message item
        const newMessage = document.createElement("li");

        // Add message content
        newMessage.innerHTML = `
            <a href="mailto:${usersEmail}">
                ${usersName}
            </a>
            <p>${usersEmail}</p>
            <span>${usersMessage}</span>
        `;

        // ================= EDIT BUTTON =================

        const editButton = document.createElement("button");

        editButton.innerText = "edit";

        editButton.type = "button";

        editButton.setAttribute("aria-label", "Edit message");

        editButton.addEventListener("click", async function () {

            // Select message span
            const messageSpan = newMessage.querySelector("span");

            // Prompt user
            const updatedMessage = prompt(
                "Edit your message:",
                messageSpan.innerText
            );

            // Validate update
            if (
                updatedMessage !== null &&
                updatedMessage.trim() !== ""
            ) {

                // Simulate async update
                await new Promise((resolve) =>
                    setTimeout(resolve, 1000)
                );

                // Update text
                messageSpan.innerText = updatedMessage;
            }
        });

        // ================= REMOVE BUTTON =================

        const removeButton = document.createElement("button");

        removeButton.innerText = "remove";

        removeButton.type = "button";

        removeButton.setAttribute("aria-label", "Remove message");

        removeButton.addEventListener("click", async function () {

            // Confirm delete
            const confirmDelete = confirm(
                "Are you sure you want to remove this message?"
            );

            if (confirmDelete) {

                // Simulate async delete
                await new Promise((resolve) =>
                    setTimeout(resolve, 1000)
                );

                // Remove message
                newMessage.remove();

                // Hide section if empty
                if (messageList.children.length === 0) {
                    messageSection.style.display = "none";
                }
            }
        });

        // Add buttons
        newMessage.appendChild(editButton);
        newMessage.appendChild(removeButton);

        // Add message to list
        messageList.appendChild(newMessage);

        // Reset form
        messageForm.reset();

    } catch (error) {

        console.error("Error:", error);

        alert("Something went wrong!");

    }
});