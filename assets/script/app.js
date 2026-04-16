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
// 3. SYSTEM DETECTION
const getBrowser = () => {
    const ua = navigator.userAgent;
    if (ua.includes("Edg")) return "Edge";
    if (ua.includes("Chrome")) return "Chrome";
    return "Other";
};

const getOS = () => {
    const ua = navigator.userAgent;
    if (ua.includes("Windows")) return "Windows";
    if (ua.includes("Mac OS")) return "macOS";
    return "Linux";
};

// 4. EVENT LISTENERS
window.addEventListener('load', () => {
    if (!getCookie('user-consent')) {
        setTimeout(() => {
            sectionOne.classList.add('visible');
            overlay.classList.add('visible');
        }, 1000); 
    }
});

document.querySelector('#acceptAll').addEventListener('click', () => {
    setCookie('Browser', getBrowser(), LIFETIME);
    setCookie('OS', getOS(), LIFETIME);
    setCookie('Screen', `${screen.width}x${screen.height}`, LIFETIME);
    setCookie('user-consent', 'accepted', LIFETIME);
    sectionOne.classList.remove('visible');
    overlay.classList.remove('visible');
});

document.querySelector('#openSettings').addEventListener('click', () => {
    sectionOne.classList.remove('visible');
    sectionTwo.classList.add('visible');
});

document.querySelector('#saveSettings').addEventListener('click', () => {
    setCookie('Browser', browserToggle.checked ? getBrowser() : 'rejected', LIFETIME);
    setCookie('OS', osToggle.checked ? getOS() : 'rejected', LIFETIME);
    setCookie('Screen', screenToggle.checked ? `${screen.width}x${screen.height}` : 'rejected', LIFETIME);
    setCookie('user-consent', 'customized', LIFETIME);
    sectionTwo.classList.remove('visible');
    overlay.classList.remove('visible');
});

document.querySelector('#rejectAll').addEventListener('click', () => {
    setCookie('user-consent', 'rejected', LIFETIME);
    sectionTwo.classList.remove('visible');
    overlay.classList.remove('visible');
});