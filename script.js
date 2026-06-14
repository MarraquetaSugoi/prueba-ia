document.addEventListener('DOMContentLoaded', () => {
    
    // --- Reveal Animations on Scroll ---
    const revealElements = document.querySelectorAll('.reveal-fade-up');
    
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    };

    // Initial check on load
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);


    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const button = item.querySelector('button');
        
        button.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').classList.add('hidden');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                item.querySelector('.faq-answer').classList.add('hidden');
            } else {
                item.classList.add('active');
                item.querySelector('.faq-answer').classList.remove('hidden');
            }
        });
    });


    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Navbar Blur Effect on Scroll ---
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            nav.classList.add('bg-dark/95', 'shadow-lg');
            nav.classList.remove('bg-dark/80');
        } else {
            nav.classList.remove('bg-dark/95', 'shadow-lg');
            nav.classList.add('bg-dark/80');
        }
    });

    // --- Chatbot Logic ---
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    // Toggle Chat Window
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
        // Hide notification badge when opened
        const badge = chatToggle.querySelector('span');
        if (badge) badge.classList.add('hidden');
    });

    const addMessage = (text, isUser = false) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `flex ${isUser ? 'justify-end' : 'justify-start'}`;
        
        const innerDiv = document.createElement('div');
        innerDiv.className = `${isUser ? 'bg-primary text-white rounded-tr-none' : 'bg-white/5 text-gray-300 rounded-tl-none'} p-4 rounded-2xl text-sm max-w-[80%] shadow-lg`;
        innerDiv.textContent = text;
        
        msgDiv.appendChild(innerDiv);
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const handleChat = () => {
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage(text, true);
        chatInput.value = '';

        // Simulated AI Logic
        setTimeout(() => {
            const query = text.toLowerCase();
            let response = "";

            if (query.includes("precio") || query.includes("costo") || query.includes("pago")) {
                response = "Tenemos un plan gratuito de 2h/mes y un plan Pro ilimitado por $19/mes. ¿Te gustaría saber más sobre el plan Pro?";
            } else if (query.includes("idioma") || query.includes("lengua")) {
                response = "¡Soportamos más de 99 idiomas! Incluyendo español, inglés, francés, alemán y muchos más.";
            } else if (query.includes("seguro") || query.includes("privacidad") || query.includes("privado")) {
                response = "Tu privacidad es nuestra prioridad. Ofrecemos procesamiento local para que tus audios nunca salgan de tu ordenador.";
            } else if (query.includes("descargar") || query.includes("bajar") || query.includes("instal")) {
                response = "Puedes descargarlo haciendo clic en el botón 'Download' arriba a la derecha. ¡Es compatible con Windows y Mac!";
            } else {
                // If the question is "important" or unknown, offer email redirection
                response = "Esa es una buena pregunta. Como parece algo importante, ¿quieres que se lo envíe directamente a Joacoli por email?";
                
                // Add a special button for email redirection
                addMessage(response);
                
                const btnContainer = document.createElement('div');
                btnContainer.className = "flex justify-start mt-2";
                const emailBtn = document.createElement('button');
                emailBtn.className = "text-[10px] bg-primary/20 hover:bg-primary/40 text-primary border border-primary/30 px-3 py-1 rounded-full transition-all";
                emailBtn.textContent = "Sí, enviar email a Joacoli";
                
                emailBtn.onclick = () => {
                    emailBtn.disabled = true;
                    emailBtn.textContent = "Enviando...";
                    
                    // FORM SUBMIT REDIRECTION
                    // Using FormSubmit.co - 100% Free
                    const formData = new FormData();
                    formData.append('Pregunta', text);
                    formData.append('_subject', 'Nueva pregunta importante de WhisperTranscriber');
                    formData.append('_captcha', 'false');

                    // REEMPLAZA ESTE EMAIL CON EL TUYO
                    fetch('https://formsubmit.co/ajax/TU_EMAIL_AQUI', {
                        method: 'POST',
                        body: formData
                    })
                    .then(res => {
                        addMessage("¡Listo! Tu mensaje ha sido enviado. Joacoli te responderá pronto.");
                    })
                    .catch(err => {
                        addMessage("Hubo un error al enviar. Por favor, inténtalo de nuevo más tarde.");
                    });
                };
                
                chatMessages.appendChild(emailBtn);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                return;
            }
            
            addMessage(response);
        }, 1000);
    };

    chatSend.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChat();
    });
});
