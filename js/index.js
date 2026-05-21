// Create a footer element
const footer = document.createElement("footer");

// Select the body element
const body = document.querySelector("body");

// Append footer to the body
body.appendChild(footer);

// Create a date object
const today = new Date();

// Get the current year
const thisYear = today.getFullYear();

// Select the footer element
const footerElement = document.querySelector("footer");

// Create a paragraph element
const copyright = document.createElement("p");

// Add copyright text with current year
copyright.innerHTML = ` © Lisa Hoo ${thisYear}`;

// Append paragraph to footer
footerElement.appendChild(copyright);

// Array of skills
const skills = ["JavaScript", "HTML", "CSS", "GitHub", "SQL", "Python"];

// Select the skills section
const skillsSection = document.querySelector("#skills");

// Select the ul inside the skills section
const skillsList = skillsSection.querySelector("ul");

// Loop through the skills array
for (let i = 0; i < skills.length; i++) {

    // Create a new li element
    const skill = document.createElement("li");

    // Set the text of the li element
    skill.innerText = skills[i];

    // Add the li to the ul
    skillsList.appendChild(skill);
}