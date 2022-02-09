import i18Obj from './translate.js';

window.addEventListener('DOMContentLoaded', () => {

  /* --------------------- hamburger --------------------- */

  const hamburger = document.querySelector('.hamburger');
  const navList = document.querySelector('.nav-list'); // parent
  const navItemShow = document.querySelectorAll('.nav-item a'); // each item
  const lightBtn = document.querySelector('.light');
  const darkBtn = document.querySelector('.dark')

  // show/close nav-menu by clicking on hamgurger
  hamburger.addEventListener('click', () => {
    navList.classList.toggle('show');
    hamburger.classList.toggle('active-hamburger');
    if(navList.classList.contains('show') && lightBtn.classList.contains('hide')) {
      navList.classList.add('light-theme');
    } else {
      navList.classList.remove('light-theme');
    }
  });

  // close nav-menu by clicking on any nav-item btns
  navItemShow.forEach((item) =>
    item.addEventListener('click', () => {
      if (document.querySelector('.nav-list.show')) {
        navList.classList.remove('show');
        navList.classList.add('hide');
        hamburger.classList.remove('active-hamburger');
      }
    })
  );

  // close nav-menu by clicking 'Esc'
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && navList.classList.contains('show')) {
      navList.classList.remove('show');
      navList.classList.add('hide');
      hamburger.classList.remove('active-hamburger');
    }
  });

  /* --------------------- cache images --------------------- */

  function preloadImages() {
    const seasons = ['winter', 'spring', 'summer', 'autumn'];

    seasons.forEach((val) => {
      for (let i = 1; i <= 6; i++) {
        const img = new Image();
          img.src = `assets/img/${val}/${i}.png`;
      }
    });
  }

  preloadImages();

  /* --------------------- change portfolio imgs by season --------------------- */

  // choose particular image by clicking the button
  const portfolioBtn = document.querySelectorAll('.btn-portfolio'); // each button
  const portfolioBtns = document.querySelector('.btns-portfolio'); // button`s parent
  const portfolioImgs = document.querySelectorAll('.portfolio-image'); // all imgs

  // change src of all imgs & hide not chosen imgs
  function changeImg(event) {
    if (event.target.classList.contains('btn-portfolio')) {
      portfolioImgs.forEach((img, i) => {
        // if(event.target.dataset.season.contains(img[i].classList)) {
          img.src = `assets/img/${event.target.dataset.season}/${i + 1}.png`;
          img.onload = () => {
            img.classList.add('show');
            img.classList.remove('hide');
          };
          img.onerror = () => {
            img.classList.add('hide');
            img.classList.remove('show');
          };
        // }
      });
    }
  }

  function changeClassActive(className) {
    className.classList.add('active');
  }
  function changeClassActiveDark (className) {
    if(lightBtn.classList.contains('show')) {
      event.target.classList.add('avtive-dark')
    }
    className.classList.add('')
  }


  // choose image by season and change active button
  portfolioBtns.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-portfolio')) {
    changeImg(e);
    portfolioBtn.forEach((btn) => btn.classList.remove('active'));
    changeClassActive(e.target);
    }
  });


    /*--------------------- local storage --------------------- */

// можешь объявить переменные, но присваивай им дефолтные значения в том случае, если соответствующий localStorage.getItem ничего не отдает 

  // set default props for languages and themes in local storage
  let storageLang = localStorage.getItem('storageLang') ? localStorage.getItem('storageLang') : 'en';
  let theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark';

  // set language and theme if not already exist
  function setLocalStorage() {
    if(localStorage.getItem('storageLang') && localStorage.getItem('theme')) {
      localStorage.getItem('storageLang')
      localStorage.getItem('theme')
    } else {
      localStorage.setItem('storageLang', storageLang)
      localStorage.setItem('theme', theme)
    }
  }
  window.addEventListener('beforeunload', setLocalStorage);

  // take language and theme from local storage and apply it
  function getLocalStorage() {
    if(localStorage.getItem('storageLang') && localStorage.getItem('theme')) {
      const storageLang = localStorage.getItem('storageLang')
      getTranslate(storageLang);
      const theme = localStorage.getItem('theme')
      switchTheme(theme)
    }
  }
  window.addEventListener('load', getLocalStorage)

  /*--------------------- translate to russian --------------------- */

  const langs = document.querySelector('.nav-languages'); // parent
  const lang = document.querySelectorAll('.nav-language'); // each language

  // select targeted language and translate depending on witch languaged user clicked
  langs.addEventListener('click', (e) => {

    if((e.target.classList.contains('ru')) || (e.target.classList.contains('en'))) {
      
      lang.forEach((btn) => btn.classList.remove('active-lang'));
      changeClassActiveLang(e.target);
      if (e.target.classList.contains('ru')) {
        getTranslate('ru');
        localStorage.setItem('storageLang', 'ru')
      } else {
        getTranslate('en');
        localStorage.setItem('storageLang', 'en')
      }
    }
  });

  function changeClassActiveLang(className) {
    className.classList.add('active-lang');
  }

  // run through all data types and put texcontent from i18Obj
  function getTranslate(languages) {
    const data = document.querySelectorAll('[data-i18]');
    data.forEach((el) => {
      if(el.placeholder) {
        el.placeholder = i18Obj[languages][el.dataset.i18]
        el.textContent = '';
      } else {
        el.textContent = i18Obj[languages][el.dataset.i18];
      }
    });
  }

  /*--------------------- light-theme --------------------- */

  const x = window.matchMedia("(max-width: 768px)")

  lightBtn.addEventListener('click', () => {
    lightBtn.classList.add('hide');
    lightBtn.classList.remove('show');
    darkBtn.classList.add('show');
    darkBtn.classList.remove('hide');
    switchTheme('light');
    localStorage.setItem('theme', 'light');
  })

  darkBtn.addEventListener('click', () => {
    lightBtn.classList.remove('hide');
    lightBtn.classList.add('show');
    darkBtn.classList.remove('show');
    darkBtn.classList.add('hide');
    switchTheme('dark');
    localStorage.setItem('theme', 'dark')
  })


  // check if light/dark theme and change css variables
  function switchTheme (mode) {
    if(mode === 'light') {
      document.documentElement.style.setProperty('--bg-main', "url('../assets/img/bg-light.png')");
      document.documentElement.style.setProperty('--bg-contacts', "url('../assets/img/contacts-light.png')");
      document.documentElement.style.setProperty('--color-white', '#000');
      document.documentElement.style.setProperty('--btn-gold-to-white-bg', '#fff');
      document.documentElement.style.setProperty('--btn-black-to-gold-bg', '#bdae82');
      document.documentElement.style.setProperty('--btn-hover-bg', '#000');
      document.documentElement.style.setProperty('--btn-hover-color', '#bdae82');
      document.documentElement.style.setProperty('--bg-color', '#fff');
      document.documentElement.style.setProperty('--icon-color', '#000');
      document.documentElement.style.setProperty('--btn-color', '#000');
      document.documentElement.style.setProperty('--btn-color-gold-to-black', '#000');
      document.documentElement.style.setProperty('--btn-gold-to-gold-bg', '#bdae82');
      document.documentElement.style.setProperty('--btn-white-to-white-color', '#fff');
      if(x.matches) {
        document.documentElement.style.setProperty('--background-image768', 'url(../assets/img/tablet/hero-bg-light.png)')
        document.documentElement.style.setProperty('--background-image768-contacts', 'url(../assets/img/tablet/contacts-light.png)')
      }
      document.documentElement.style.setProperty('--active-class-bg', '#000');
      document.documentElement.style.setProperty('--active-class-color', '#bdae82');

    } else {
      document.documentElement.style.setProperty('--bg-main', "url('../assets/img/bg.png')");
      document.documentElement.style.setProperty('--bg-contacts', "url('../assets/img/contacts.png')");
      document.documentElement.style.setProperty('--color-white', '#fff');
      document.documentElement.style.setProperty('--btn-gold-to-white-bg', '#bdae82');
      document.documentElement.style.setProperty('--btn-black-to-gold-bg', '#000');
      document.documentElement.style.setProperty('--btn-hover-bg', '#bdae82');
      document.documentElement.style.setProperty('--btn-hover-color', '#fff');
      document.documentElement.style.setProperty('--bg-color', '#000');
      document.documentElement.style.setProperty('--icon-color', '#fff');
      document.documentElement.style.setProperty('--btn-color', '#fff');
      document.documentElement.style.setProperty('--btn-color-gold-to-black', '#bdae82');
      document.documentElement.style.setProperty('--btn-gold-to-gold-bg', '#bdae82');
      document.documentElement.style.setProperty('--btn-white-to-white-color', '#fff');
      document.documentElement.style.setProperty('--btn-gold-to-black-bg', '#bdae82');
      document.documentElement.style.setProperty('--background-image768', 'url(../assets/img/tablet/hero-bg.png)')
      document.documentElement.style.setProperty('--background-image768-contacts', 'url(../assets/img/tablet/contacts.png)')
      document.documentElement.style.setProperty('--active-class-bg', '#bdae82');
      document.documentElement.style.setProperty('--active-class-color', '#fff');
    }
  }

  /*--------------------- video-player --------------------- */

  const videoWrapper = document.querySelector('.video-player');
  const videoPlayer = document.querySelector('.video-player-viewer');
  const progressLine = document.querySelector('.progress');
  const progressBar = document.querySelector('.progress-filled');
  const skipBtns = document.querySelectorAll('[data-skip]');
  const playBtn = document.querySelector('.btn-play');
  const playIcon = document.querySelector('.play');
  const pauseIcon = document.querySelector('.pause');
  const volumeBtn = document.querySelector('.volume-btn');
  const mute = document.querySelector('.mute');
  const volumeLine = document.querySelector('.volume-slider');
  const volumeSlider = document.querySelector('.volume-slider-filled');
  const volumeBtns = document.querySelectorAll('.player-btn-volume');
  const fullscreenBtn = document.querySelector('.full-screen');


  // toggle play/pause + show/hide playBtn
  function togglePlay () {
    const method = videoPlayer.paused ? 'play' : 'pause';
    videoPlayer[method]();
    playBtn.classList.toggle('hide');
  }

  // update play/pause btn
  function updateBtn () {
    if(this.paused) {
      pauseIcon.classList.add('hide');
      playIcon.classList.remove('hide');
      pauseIcon.classList.remove('show')
      playIcon.classList.add('show');
    } else {
      playIcon.classList.remove('show');
      playIcon.classList.add('hide');
      pauseIcon.classList.add('show');
      pauseIcon.classList.remove('hide');
    }
  }

  // changing time of video by clicking on button with certain dataset
  function skip () {
    videoPlayer.currentTime += parseFloat(this.dataset.skip)
  }

  // chanage values in range inputs
  function handleRangeUpdate () {
    videoPlayer[this.name] = this.value;
  }

  // change width of progressBar
  function handleProgress () {
    const percent = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    progressBar.style.width = `${percent}%`;
    if(videoPlayer.ended) {
      playBtn.classList.add('show');
    }
  }

  // scrub through progressLine
  function scrub (e) {
    const scrubTime = (e.offsetX / progressLine.offsetWidth) * videoPlayer.duration;
    videoPlayer.currentTime = scrubTime;
  }

  let endVolume = 1;

  // change width of volume bar & hide vol btn if vol = 0
  function handleProgressVolume (e) {
    let volumeOffset = e.offsetX / volumeLine.offsetWidth;
    if(volumeOffset < 0.1) {
      volumeOffset = 0;
    }
    if(volumeOffset > 0.9) {
      volumeOffset = 1;
    }
    volumeSlider.style.width = `${volumeOffset * 100}%`;
    videoPlayer.volume = volumeOffset;

    if(volumeOffset > 0) {
      mute.classList.remove('show');
      mute.classList.add('hide');
      volumeBtn.classList.remove('hide');
      volumeBtn.classList.add('show');
    }
    if(volumeOffset === 0) {
      mute.classList.remove('hide');
      mute.classList.add('show');
      volumeBtn.classList.remove('show');
      volumeBtn.classList.add('hide');
    }
    endVolume = volumeOffset;
  }

  function toggleVolume () {
    if(mute.classList.contains('show')) {
      mute.classList.remove('show');
      mute.classList.add('hide');
      volumeBtn.classList.remove('hide');
      volumeBtn.classList.add('show');
      videoPlayer.volume = 0.5;
    }
    else {
      mute.classList.remove('hide');
      mute.classList.add('show');
      volumeBtn.classList.remove('show');
      volumeBtn.classList.add('hide');
      videoPlayer.volume = 0;
    }
  }

//  View in fullscreen 
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  videoPlayer.classList.add('video-fullscreen');
}

//  Close fullscreen 
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  videoPlayer.classList.remove('video-fullscreen');
}

  let fullscreen = false;

  function togglefullScreen () {
    !fullscreen ? openFullscreen(videoWrapper) : closeFullscreen();
    fullscreen = !fullscreen;
  }

  videoPlayer.addEventListener('click', togglePlay);
  videoPlayer.addEventListener('play', updateBtn);
  videoPlayer.addEventListener('pause', updateBtn);
  videoPlayer.addEventListener('timeupdate', handleProgress);

  playIcon.addEventListener('click', updateBtn);
  playIcon.addEventListener('click', togglePlay);

  pauseIcon.addEventListener('click', updateBtn);
  pauseIcon.addEventListener('click', togglePlay);

  playBtn.addEventListener('click', togglePlay);

  skipBtns.forEach(x => x.addEventListener('click', skip))

  volumeLine.addEventListener('click', handleProgressVolume);

  // move through progress line
  let mouseDown = false;
  progressLine.addEventListener('click', scrub)
  progressLine.addEventListener('mousemove', (e) => mouseDown && scrub(e));
  progressLine.addEventListener('mousedown', () => (mouseDown = true));
  progressLine.addEventListener('mouseup', () => (mouseDown = false));

  volumeBtns.forEach(btn => btn.addEventListener('click', toggleVolume))

  fullscreenBtn.addEventListener('click', togglefullScreen);
  
 }); //domContentLoaded

