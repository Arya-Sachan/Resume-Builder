document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    const experienceFields = document.getElementById('experience-fields');
    const addExperienceButton = document.getElementById('add-experience');

    const educationFields = document.getElementById('education-fields');
    const addEducationButton = document.getElementById('add-education');

    const generateResumeButton = document.getElementById('generate-resume');
    const resumeContent = document.getElementById('resume-content');

    const profilePictureInput = document.getElementById('profile-picture');
    const profilePreview = document.getElementById('profile-preview');

    const skillsFields = document.getElementById('skills-fields');
    const addSkillButton = document.getElementById('add-skill');

    const projectsFields = document.getElementById('projects-fields');
    const addProjectButton = document.getElementById('add-project');

    const certificatesFields = document.getElementById('certificates-fields');
    const addCertificateButton = document.getElementById('add-certificate');

    const summaryInput = document.getElementById('summary');
    const printResumeButton = document.getElementById('print-resume'); // Changed from download-resume to print-resume

    // Handle profile picture upload
    profilePictureInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profilePreview.src = e.target.result;
                profilePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            profilePreview.src = '#';
            profilePreview.style.display = 'none';
        }
    });

    // Add experience fields
    addExperienceButton.addEventListener('click', () => {
        const experienceItem = document.createElement('div');
        experienceItem.classList.add('experience-item');
        experienceItem.innerHTML = `
            <input type="text" class="company" placeholder="Company">
            <input type="text" class="position" placeholder="Position">
            <textarea class="description" placeholder="Description"></textarea>
        `;
        experienceFields.appendChild(experienceItem);
    });

    // Add education fields
    addEducationButton.addEventListener('click', () => {
        const educationItem = document.createElement('div');
        educationItem.classList.add('education-item');
        educationItem.innerHTML = `
            <input type="text" class="school" placeholder="School">
            <input type="text" class="degree" placeholder="Degree">
            <input type="text" class="year" placeholder="Year">
        `;
        educationFields.appendChild(educationItem);
    });

    // Add skill fields
    addSkillButton.addEventListener('click', () => {
        const skillInput = document.createElement('input');
        skillInput.type = 'text';
        skillInput.classList.add('skill');
        skillInput.placeholder = 'Skill';
        skillsFields.appendChild(skillInput);
    });

    // Add project fields
    addProjectButton.addEventListener('click', () => {
        const projectItem = document.createElement('div');
        projectItem.classList.add('project-item');
        projectItem.innerHTML = `
            <input type="text" class="project-name" placeholder="Project Name">
            <textarea class="project-description" placeholder="Project Description"></textarea>
        `;
        projectsFields.appendChild(projectItem);
    });

    // Add certificate fields
    addCertificateButton.addEventListener('click', () => {
        const certificateInput = document.createElement('input');
        certificateInput.type = 'text';
        certificateInput.classList.add('certificate');
        certificateInput.placeholder = 'Certificate Name';
        certificatesFields.appendChild(certificateInput);
    });

    // Generate resume content
    generateResumeButton.addEventListener('click', () => {
        const name = nameInput.value;
        const email = emailInput.value;
        const phone = phoneInput.value;
        const summary = summaryInput.value;

        let experienceText = '';
        document.querySelectorAll('.experience-item').forEach(item => {
            const company = item.querySelector('.company').value;
            const position = item.querySelector('.position').value;
            const description = item.querySelector('.description').value;
            experienceText += `<strong>Company:</strong> ${company}<br><strong>Position:</strong> ${position}<br>Description: ${description}<br><br>`;
        });

        let educationText = '';
        document.querySelectorAll('.education-item').forEach(item => {
            const school = item.querySelector('.school').value;
            const degree = item.querySelector('.degree').value;
            const year = item.querySelector('.year').value;
            educationText += `<strong>School:</strong> ${school}<br><strong>Degree:</strong> ${degree}<br><strong>Year:</strong> ${year}<br><br>`;
        });

        let skillsText = '';
        document.querySelectorAll('.skill').forEach(skill => {
            skillsText += `${skill.value}, `;
        });

        let projectsText = '';
        document.querySelectorAll('.project-item').forEach(item => {
            const projectName = item.querySelector('.project-name').value;
            const projectDescription = item.querySelector('.project-description').value;
            projectsText += `<strong>Project:</strong> ${projectName}<br>Description: ${projectDescription}<br><br>`;
        });

        let certificatesText = '';
        document.querySelectorAll('.certificate').forEach(certificate => {
            certificatesText += `${certificate.value}, `;
        });

        const profilePictureSrc = profilePreview.src;

        let resumeContentHTML = '';

        if (profilePictureSrc && profilePictureSrc !== window.location.href) {
            resumeContentHTML += `<img src="${profilePictureSrc}" alt="Profile Picture" style="width: 120px; height: 120px; border-radius: 50%; display: block; margin: 20px auto; object-fit: cover;"><br>`;
        }

        resumeContentHTML += `
            <strong>Name:</strong> ${name}<br>
            <strong>Email:</strong> ${email}<br>
            <strong>Phone:</strong> ${phone}<br>
            <strong>Summary:</strong> ${summary}<br><br>
            <strong>Experience:</strong><br>${experienceText}<br>
            <strong>Education:</strong><br>${educationText}<br>
            <strong>Skills:</strong> ${skillsText}<br><br>
            <strong>Projects:</strong><br>${projectsText}<br>
            <strong>Certificates:</strong> ${certificatesText}
        `;

        resumeContent.innerHTML = resumeContentHTML;
    });

    // Print resume
    printResumeButton.addEventListener('click', () => {
        // Generate the resume content (if not already generated)
        if (resumeContent.innerHTML === '') {
            generateResumeButton.click(); // Programmatically trigger the generate button
        }

        // Open the browser's print dialog
        window.print();
    });
});