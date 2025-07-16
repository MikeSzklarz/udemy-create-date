(async function () {
    "use strict";

    const bodyElement = document.getElementById("udemy");
    if (!bodyElement) {
        console.error(
            "Udemy Date Extension: Could not find body element with id 'udemy'."
        );
        return;
    }

    const courseId = bodyElement.dataset.clpCourseId;
    if (!courseId) {
        console.error("Udemy Date Extension: Could not find course ID.");
        return;
    }

    try {
        const response = await fetch(
            `https://www.udemy.com/api-2.0/courses/${courseId}/?fields[course]=created`
        );
        if (!response.ok) {
            throw new Error(
                `API request failed with status ${response.status}`
            );
        }
        const data = await response.json();
        const createdDateStr = data.created;

        const createdDate = new Date(createdDateStr);
        const formattedDate = createdDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });

        const instructorElement = document.querySelector(
            'div[data-purpose="instructor-name-top"]'
        );
        if (!instructorElement) {
            console.error(
                "Udemy Date Extension: Could not find the 'instructor' element to anchor to."
            );
            return;
        }

        const newDateElement = document.createElement("div");
        newDateElement.className = "ud-text-sm"; // using udemy own CSS classes
        newDateElement.style.marginBottom = "8px"; // some spacing
        newDateElement.innerHTML = `<span>Created ${formattedDate}</span>`;

        instructorElement.after(newDateElement, instructorElement);
        
    } catch (error) {
        console.error("Udemy Date Extension Error:", error);
    }
})();
