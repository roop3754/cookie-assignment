'use strict';

// Selectors
const sectionOne = document.querySelector('#consentDialog');
const sectionTwo = document.querySelector('#settingsDialog');
const overlay = document.querySelector('.overlay');

const browserToggle = document.querySelector('#cookieBrowser');
const osToggle = document.querySelector('#cookieOS');
const screenToggle = document.querySelector('#cookieScreen');

const LIFETIME = 20; 

// 1. SET COOKIE
function setCookie(name, value, maxAge) {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    const options = { path: '/', SameSite: 'Lax' };
    for (let option in options) {
        cookieString += `; ${option}=${options[option]}`;
    }
    if (maxAge) {
        cookieString += `; max-age=${maxAge}`;
    }
    document.cookie = cookieString;
}

// 2. GET COOKIE (RegExp Version)
function getCookie(cookie) {
    const name = cookie + '=';
    const decodedCookies = decodeURIComponent(document.cookie);
    const matches = decodedCookies.match(new RegExp(name + '([^;]+)'));
 if (matches) {
      console.log(cookie + ': ' + matches[1]);
      return { name: cookie, value: matches[1] };
  } else {
      console.log(`Cookie ${cookie} not found`);
      return null;
  }
}
