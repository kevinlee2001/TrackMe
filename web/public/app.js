$('#navbar').load('navbar.html');
$('#footer').load('footer.html');
const API_URL = 'https://api-jade-one.vercel.app/api';

$.get(`${API_URL}/devices`) .then(response => {
response.forEach(device => { $('#devices tbody').append(`
<tr> <td>${device.user}</td> <td>${device.name}</td>
</tr>`
); });
})
.catch(error => {
console.error(`Error: ${error}`); });


$('#add-device').on('click', () => { const name = $('#name').val(); const user = $('#user').val(); const sensorData = [];
  const body = {
    name,
user,
    sensorData
  };
$.post(`${API_URL}/devices`, body) .then(response => {
location.href = '/'; })
.catch(error => { console.error(`Error: ${error}`);
}); });


$('#send-command').on('click', function() {
    const command = $('#command').val();
    console.log(`command is: ${command}`);
  });

  $('#login').on('click', () => {
    const username = $('#user').val();
    const password = $('#password').val();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const exists = users.find(user => user.name === username);
    if (exists && exists.password === password) {
      localStorage.setItem('isAuthenticated', true);
      location.href = '/';
    } else {
      $('#message').append('<p class="alert alert-danger">Authentication failed</p>');
    }
  });

  $('#register').on('click', () => {
    const username = $('#user').val();
    const password = $('#password').val();
    const confirm = $('#confirm').val();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const exists = users.find(user => user.name === username);
    if (exists) {
      $('#message').append('<p class="alert alert-danger">User already exists</p>');
    } else if (password !== confirm) {
      $('#message').append('<p class="alert alert-danger">Passwords do not match</p>');
    } else {
      users.push({ name: username, password });
      localStorage.setItem('users', JSON.stringify(users));
      location.href = '/login';
    }
  });

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    location.href = '/login';
  }
  