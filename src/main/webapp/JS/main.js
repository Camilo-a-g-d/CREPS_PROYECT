document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginMessage = document.getElementById('login-message');
    const registerMessage = document.getElementById('register-message');

    let registerFirstName, registerLastName, registerConfirmPassword, dataAuthorizationCheckbox, emailUpdatesCheckbox, showDataTermsLink;

    let modalOverlay, modalTitle, modalBody, closeButton, modalAcceptBtn;

    const termsAndConditionsContent = `
        <p>Estos son los términos y condiciones generales de uso de los servicios de Crepes & Waffles. Al utilizar nuestros servicios, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones. Por favor, léalos detenidamente.</p>
        <p><strong>1. Aceptación de los Términos:</strong> Al acceder o utilizar cualquier parte de nuestros servicios, usted acepta estos Términos y Condiciones. Si no está de acuerdo con todos los términos y condiciones de este acuerdo, entonces no podrá acceder al sitio web ni utilizar ningún servicio.</p>
        <p><strong>2. Modificaciones de los Términos:</strong> Nos reservamos el derecho de actualizar, cambiar o reemplazar cualquier parte de estos Términos y Condiciones mediante la publicación de actualizaciones y/o cambios en nuestro sitio web. Es su responsabilidad revisar esta página periódicamente para ver los cambios.</p>
        <p><strong>3. Uso de la Cuenta:</strong> Usted es responsable de mantener la confidencialidad de su cuenta y contraseña y de restringir el acceso a su computadora. Usted acepta la responsabilidad de todas las actividades que ocurran bajo su cuenta o contraseña.</p>
        <p><strong>4. Propiedad Intelectual:</strong> Todo el contenido incluido o disponible a través de nuestros servicios, como texto, gráficos, logotipos, iconos de botones, imágenes, clips de audio, descargas digitales, y compilaciones de datos es propiedad de Crepes & Waffles o de sus proveedores de contenido y está protegido por las leyes de derechos de autor internacionales.</p>
        <p><strong>5. Limitación de Responsabilidad:</strong> Crepes & Waffles no será responsable de ningún daño directo, indirecto, incidental, punitivo o consecuente que resulte del uso o la imposibilidad de usar nuestros servicios.</p>
        <p><strong>6. Ley Aplicable:</strong> Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes de Colombia.</p>
        <p><strong>7. Contacto:</strong> Si tiene alguna pregunta sobre estos Términos y Condiciones, por favor contáctenos.</p>
    `;

    const dataAuthorizationContent = `
        <p>Por medio de la presente, autorizo a Crepes & Waffles para recolectar, almacenar, usar, circular, suprimir, procesar y, en general, dar tratamiento a mis datos personales, incluyendo datos sensibles, de acuerdo con la Ley 1581 de 2012 y el Decreto 1377 de 2013, y demás normas que los modifiquen, adicionen o complementen.</p>
        <p>La finalidad de la recolección y tratamiento de mis datos personales es para:</p>
        <ul>
            <li>Gestionar mi registro y cuenta de usuario.</li>
            <li>Enviar información sobre productos, servicios, promociones y ofertas (si he dado mi consentimiento expreso para ello).</li>
            <li>Realizar estudios de mercado y análisis de comportamiento de consumo.</li>
            <li>Mejorar la experiencia de usuario y personalizar los servicios.</li>
            <li>Cumplir con obligaciones legales y regulatorias.</li>
        </ul>
        <p>Entiendo que tengo derecho a conocer, actualizar, rectificar y suprimir mis datos personales, así como a revocar la autorización otorgada, contactando a Crepes & Waffles a través de los canales dispuestos en su política de privacidad.</p>
        <p>La política de tratamiento de datos personales de Crepes & Waffles se encuentra disponible en [enlace a la política de privacidad, si existe].</p>
    `;

    function showModal(title, content) {
        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modalOverlay.classList.add('visible');
    }

    function hideModal() {
        modalOverlay.classList.remove('visible');
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            loginMessage.textContent = 'Iniciando sesión...';
            loginMessage.classList.remove('success', 'error');

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            if (!email || !password) {
                loginMessage.textContent = 'Por favor, ingresa tu correo y contraseña.';
                loginMessage.classList.add('error');
                return;
            }

            try {
                const response = await fetch('http://localhost:8080/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    loginMessage.textContent = '¡Sesión iniciada correctamente! Redirigiendo...';
                    loginMessage.classList.add('success');
                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('userEmail', email);

                    setTimeout(() => {
                        window.location.href = '/home.html';
                    }, 1500);
                } else {
                    loginMessage.textContent = data.message || 'Error al iniciar sesión. Verifica tus credenciales.';
                    loginMessage.classList.add('error');
                }
            } catch (error) {
                console.error('Error de red o servidor:', error);
                loginMessage.textContent = 'No se pudo conectar con el servidor. Intenta de nuevo más tarde.';
                loginMessage.classList.add('error');
            }
        });
    } else if (registerForm) {
        registerFirstName = document.getElementById('register-first-name');
        registerLastName = document.getElementById('register-last-name');
        registerConfirmPassword = document.getElementById('register-confirm-password');
        dataAuthorizationCheckbox = document.getElementById('data-authorization');
        emailUpdatesCheckbox = document.getElementById('email-updates');
        showDataTermsLink = document.getElementById('show-data-terms');

        modalOverlay = document.getElementById('modal');
        modalTitle = document.getElementById('modal-title');
        modalBody = document.getElementById('modal-body');
        closeButton = document.querySelector('.close-button');
        modalAcceptBtn = document.querySelector('.modal-accept-btn');

        if (showDataTermsLink) {
            showDataTermsLink.addEventListener('click', (e) => {
                e.preventDefault();
                showModal('Autorización de Tratamiento de Datos Personales', dataAuthorizationContent);
            });
        } else {
            console.warn('Elemento con ID "show-data-terms" no encontrado en esta página. El modal de términos no funcionará.');
        }

        if (closeButton) {
            closeButton.addEventListener('click', hideModal);
        }
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    hideModal();
                }
            });
        }
        if (modalAcceptBtn) {
            modalAcceptBtn.addEventListener('click', () => {
                hideModal();
            });
        }

        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            registerMessage.textContent = 'Registrando usuario...';
            registerMessage.classList.remove('success', 'error');

            const firstName = registerFirstName.value.trim();
            const lastName = registerLastName.value.trim();
            const email = document.getElementById('register-email').value.trim();
            const password = document.getElementById('register-password').value;
            const confirmPassword = registerConfirmPassword.value;
            const dataAuthorized = dataAuthorizationCheckbox.checked;
            const receiveEmailUpdates = emailUpdatesCheckbox.checked;

            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                registerMessage.textContent = 'Todos los campos marcados con * son obligatorios.';
                registerMessage.classList.add('error');
                return;
            }
            if (password.length < 8) {
                registerMessage.textContent = 'La contraseña debe tener al menos 8 caracteres.';
                registerMessage.classList.add('error');
                return;
            }
            if (password !== confirmPassword) {
                registerMessage.textContent = 'Las contraseñas no coinciden.';
                registerMessage.classList.add('error');
                return;
            }
            if (!dataAuthorized) {
                registerMessage.textContent = 'Debes autorizar el tratamiento de tus datos personales.';
                registerMessage.classList.add('error');
                return;
            }

            try {
                const response = await fetch('http://localhost:8080/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstName,
                        lastName,
                        email,
                        password,
                        receiveEmailUpdates
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    registerMessage.textContent = '¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.';
                    registerMessage.classList.add('success');
                    setTimeout(() => {
                        window.location.href = '/index.html';
                    }, 2000);
                } else {
                    registerMessage.textContent = data.message || 'Error al registrar usuario.';
                    registerMessage.classList.add('error');
                }
            } catch (error) {
                console.error('Error de red o servidor:', error);
                registerMessage.textContent = 'No se pudo conectar con el servidor. Intenta de nuevo más tarde.';
                registerMessage.classList.add('error');
            }
        });
    }
});
