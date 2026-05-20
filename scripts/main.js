function handleSignIn() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    if (u === 'admin' && p === 'admin123') {
        alert('✅ Signed in successfully!');
    } else {
        alert('❌ Invalid credentials. Use admin / admin123');
    }
}