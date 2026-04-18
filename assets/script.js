// Survey Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('surveyModal');
    const closeBtn = document.querySelector('.close');
    const surveyForm = document.getElementById('surveyForm');
    const skipBtn = document.getElementById('skipSurvey');

    // Show modal on page load
    modal.classList.remove('hidden');

    // Close modal when X is clicked
    closeBtn.addEventListener('click', function() {
        closeSurvey();
    });

    // Close modal when skip is clicked
    skipBtn.addEventListener('click', function() {
        closeSurvey();
    });

    // Handle survey submission
    surveyForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Collect survey data
        const purpose = document.querySelector('input[name="purpose"]:checked')?.value;
        const interest = document.querySelector('input[name="interest"]:checked')?.value;
        const email = document.getElementById('email').value;

        // Create survey response object
        const surveyData = {
            purpose: purpose,
            interest: interest,
            email: email,
            timestamp: new Date().toISOString()
        };

        // Log to console (in production, you'd send this to a server)
        console.log('Survey Response:', surveyData);

        // Store in localStorage for reference
        localStorage.setItem('surveyResponse', JSON.stringify(surveyData));

        // Show thank you message
        showThankYou();

        // Close modal after brief delay
        setTimeout(() => {
            closeSurvey();
        }, 2000);
    });

    // Close button - clicking outside modal also closes it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeSurvey();
        }
    });

    // CTA Button
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', function() {
        alert('Welcome! Ready to explore ROOTED?');
    });

    function closeSurvey() {
        modal.classList.add('hidden');
    }

    function showThankYou() {
        const formContent = surveyForm;
        const originalContent = formContent.innerHTML;

        formContent.innerHTML = '<div class="thank-you-message"><h3>Thank you!</h3><p>We appreciate your feedback. Enjoy exploring ROOTED!</p></div>';

        // Restore form after 2 seconds
        setTimeout(() => {
            formContent.innerHTML = originalContent;
            reattachEventListeners();
        }, 2000);
    }

    function reattachEventListeners() {
        // Reattach event listeners after form is restored
        skipBtn = document.getElementById('skipSurvey');
        surveyForm = document.getElementById('surveyForm');

        if (skipBtn) {
            skipBtn.addEventListener('click', function() {
                closeSurvey();
            });
        }

        if (surveyForm) {
            surveyForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const purpose = document.querySelector('input[name="purpose"]:checked')?.value;
                const interest = document.querySelector('input[name="interest"]:checked')?.value;
                const email = document.getElementById('email').value;

                const surveyData = {
                    purpose: purpose,
                    interest: interest,
                    email: email,
                    timestamp: new Date().toISOString()
                };

                console.log('Survey Response:', surveyData);
                localStorage.setItem('surveyResponse', JSON.stringify(surveyData));

                showThankYou();

                setTimeout(() => {
                    closeSurvey();
                }, 2000);
            });
        }
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Optional: Add CSS for thank you message
const style = document.createElement('style');
style.textContent = `
    .thank-you-message {
        text-align: center;
        padding: 2rem;
        color: #667eea;
    }

    .thank-you-message h3 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }

    .thank-you-message p {
        color: #999;
    }
`;
document.head.appendChild(style);