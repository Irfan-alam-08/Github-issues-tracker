document.getElementById("loginBtn").addEventListener("click", () => {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    if (u === 'admin' && p === 'admin123') {

        document.body.classList.add("fade-out");

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 500);
    }
    else {
        alert('❌ Invalid credentials. Use admin / admin123');
    }
});

