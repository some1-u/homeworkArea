function getAllCookies() {
  return document.cookie
    .split("; ")
    .reduce((cookies, cookie) => {
      const [name, value] = cookie.split("=");
      cookies[name] = value;
      return cookies;
    }, {});
}

export function getCookie(name) {
  if (!document.cookie) {
    return {};
  }
  if (!name) {
    return getAllCookies();
  }
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return cookie ? cookie.split("=")[1] : "";
}

export function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}`;
}

export function removeCookie(name) {
  document.cookie = `${name}=; expires=Sat, 01 Jan 2000 00:00:00 UTC`;
}

export function clearCookies() {
  document.cookie.split("; ").forEach((cookie) => {
    const [name] = cookie.split("=");
    removeCookie(name);
  });
}
