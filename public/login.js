const loginFormHandler = async (event) => { 
    console.log('Login form submitted.');
    event.preventDefault();
  
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
        console.log(`Sending fetch request to /api/users/login with username: ${username}`);
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
    
        console.log('Received response from server:', response.status, response.statusText);
    
        if (response.ok) {
            console.log('Response from server was successful. Redirecting to dashboard.');
            document.location.replace('/dashboard'); 
        } else {
            try {
                const data = await response.json();
                alert(data.message || response.statusText);
            } catch (error) {
                console.error("Error parsing JSON:", error);
                alert(response.statusText);
            }
        }
    }
};
  
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  