const url = "https://api.github.com/users/";

function get(element) {
  return document.getElementById(`${element}`);
}

const inputEl = get('input');
const buttonEl = get('button');

buttonEl.addEventListener('click', () => {
  if (inputEl.value !== '') {
    getData(url + inputEl.value);
  }
});

inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if (inputEl.value !== '') {
      getData(url + inputEl.value);
    }
  }
});

async function getData(gitUrl) {
  const response = await fetch(gitUrl);
  const data = await response.json();
  if (!data) {
    throw data;
  }
  updateProfile(data);
}

const noResultEl = get("noResult");

function updateProfile(data) {
  noResultEl.style.scale = 0;
  if (data.message !== 'Not Found') {
    function checkNull(apiPair, domEl) {
      if (apiPair === '' || apiPair === null) {
          domEl.style.opacity = 0.5;
          domEl.previousElementSibling.style.opacity = 0.5;
          return false;
      }
      else {
          return true;
      }
    }

    const userImageEl = get("userImage");
    const nameEl = get("name");
    const usernameEl = get("username");
    const dateEl = get("date");
    const bioEl = get("bio");
    const reposEl = get("repos");
    const followersEl = get("followers");
    const followingEl = get("following");
    const locationEl = get("location");
    const pageEl = get("page");
    const twitterEl = get("twitter");
    const companyEl = get("company");
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    userImageEl.src = data?.avatar_url;
    nameEl.innerText = data?.name;
    usernameEl.innerText = `@${data?.login}`;
    usernameEl.href = data?.html_url;

    let dateSegment = data?.created_at.split("T").shift().split("-");
    dateEl.innerText = `Joined ${dateSegment[2]} ${month[dateSegment[1] - 1]} ${dateSegment[0]}`;

    bioEl.innerText = (data?.bio === null) ? 'This Profile has no Bio' : data?.bio;

    reposEl.innerText = data?.public_repos;
    followersEl.innerText = data?.followers;
    followingEl.innerText = data?.following;

    locationEl.innerText = checkNull(data?.location, locationEl) ? data?.location : 'Not Available';

    pageEl.innerText = checkNull(data?.blog, pageEl) ? data?.blog : 'Not Available';
    pageEl.href = data?.blog;

    twitterEl.innerText = checkNull(data?.twitter_username, twitterEl) ? data?.twitter_username : 'Not Available';
    twitterEl.href = `@${data?.twitter_username}`;
    companyEl.innerText = checkNull(data?.company, companyEl) ? data?.company : 'Not Available';
  }
  else {
    noResultEl.style.scale = 1;
    setTimeout(() => {
      noResultEl.style.scale = 0;
    }, 2000);
  }
}

getData(url + 'mailatkaushal');

const modeEl = get('mode');
const textEl = get('text');
const iconEl = get('icon');
let darkMode = true;
const root = document.documentElement.style;

mode.addEventListener('click', () => {
  if (darkMode === false) {
    enableDarkMode();
  }
  else {
    enableLightMode();
  }
});

function enableDarkMode() {
  root.setProperty("--dm-bg", "#000");
  root.setProperty("--dm-bg-content", "#121212");
  root.setProperty("--dm-text", "#fff");
  root.setProperty("--dm-text-alt", "#fff");
  root.setProperty("--dm-btn", "#363636");
  root.setProperty("--dm-btn-hvr", "#484848");
  text.innerText = 'LIGHT';
  icon.src = "assets/sun-icon.svg";
  darkMode = true;
  localStorage.setItem("dark-mode", true);
}

function enableLightMode() {
  root.setProperty("--dm-bg", "#F6F8FF");
  root.setProperty("--dm-bg-content", "#FEFEFE");
  root.setProperty("--dm-text", "#4B6A9B");
  root.setProperty("--dm-text-alt", "#2B3442");
  root.setProperty("--dm-btn", "#0079ff");
  root.setProperty("--dm-btn-hvr", "#60abff");
  text.innerText = "DARK";
  icon.src = "assets/moon-icon.svg";
  darkMode = false;
  localStorage.setItem("dark-mode", false);
}
