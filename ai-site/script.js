const educationSection = document.querySelector("#education");
const workExperienceSection = document.querySelector("#work-experience");
const skillsSection = document.querySelector("#skills");

educationSection.addEventListener("click", () => {
  educationSection.classList.toggle("show-details");
});

workExperienceSection.addEventListener("click", () => {
  workExperienceSection.classList.toggle("show-details");
});

skillsSection.addEventListener("click", () => {
  skillsSection.classList.toggle("show-details");
});
