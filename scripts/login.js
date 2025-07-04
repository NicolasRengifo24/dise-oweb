
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('error');


    errorElement.style.display = 'none';

    // Validar credenciales 
    if (username === 'admin' && password === 'admin123') {



        window.location.href = '/admin.html';

    } else if (username === 'vendedor' && password === 'vendedor123') {
        sessionStorage.setItem('currentUser', JSON.stringify({
            nombre: 'Vendedor',
            rol: 'vendedor'
        }));
        window.location.href = 'pos.html';

    } else if (username === 'inventario' && password === 'inventario123') {
        sessionStorage.setItem('currentUser', JSON.stringify({
            nombre: 'Inventario',
            rol: 'inventario'
        }));
        window.location.href = 'inventario.html';

    } else {
        // Mostrar error
        errorElement.style.display = 'block';
    }
});
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('error');

    // Ocultar mensaje de error previo
    errorElement.style.display = 'none';

    // Credenciales válidas (puedes agregar más según necesites)
    const validCredentials = [
        {
            email: 'admin@electro13.com',
            password: 'admin123',
            redirect: '/admin.html',
            userData: { nombre: 'Administrador', rol: 'admin' }
        },
        {
            email: 'vendedor@electro13.com',
            password: 'vendedor123',
            redirect: '/vendedor.html',
            userData: { nombre: 'Vendedor', rol: 'vendedor' }
        },
        {
            email: 'cliente@electro13.com',
            password: 'cliente123',
            redirect: '/cliente.html',
            userData: { nombre: 'Inventario', rol: 'inventario' }
        }
    ];

    // Verificar credenciales
    const matchedUser = validCredentials.find(user =>
        user.email === email && user.password === password
    );

    if (matchedUser) {
        // Guardar datos del usuario en sessionStorage
        sessionStorage.setItem('currentUser', JSON.stringify(matchedUser.userData));

        // Redirigir a la página correspondiente
        window.location.href = matchedUser.redirect;
    } else {
        // Mostrar mensaje de error
        errorElement.style.display = 'block';
    }
});