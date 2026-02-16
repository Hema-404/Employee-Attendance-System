document.getElementById('loginForm')?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const res = await fetch('http://localhost:3000/auth/login',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({email,password})
  });
  const data = await res.json();
  alert(data.message);
  if(data.user.role==='employee') window.location='employee.html?userId='+data.user.id;
  else window.location='manager.html';
});

const user = JSON.parse(localStorage.getItem('user'));

if (user) {
  document.getElementById('user-role').innerText = `Role: ${user.role}`;
} else {
 
  window.location.href = 'index.html';
}


document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('user'); 
  window.location.href = 'index.html'; 
});
