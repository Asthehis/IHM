'use strict';

document.getElementById('login').addEventListener('submit', setCookie);

connect();

function setCookie(event){
    // Delete the default using of the authentication form
    event.preventDefault();

    // We get the login and password back
    let key = document.getElementById('flogin').value + ':' + 
    document.getElementById('fpassword').value;

    // We set up the cookie 'auth=login:password', btoa is used to encode the character chain
    document.cookie = 'auth=' + btoa(key);

    connect();
}

function connect(){
    // Cookie
    let cookie = document.cookie.split('; ').find(row => row.startsWith('auth='));

    // If cookie's not empty and is real
    if (cookie && (cookie !== 'auth=') && (cookie !== 'auth=Og=='))
        window.location.href = 'index2.html';

    if (document.getElementById('connect') && document.getElementById('connect').checked)
        document.cookie += atob(86400);
}