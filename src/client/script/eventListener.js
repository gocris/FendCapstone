const anchor = document.getElementsByClassName('navItem');
const title = document.getElementsByClassName('title');
const button = document.getElementsByTagName('button');
const navaud = document.getElementById('navaudio');
const clickaud = document.getElementById('clickaudio');
const headaud = document.getElementById('headaudio');
const buttonaud = document.getElementById('buttonaudio');
const buttonclickaud = document.getElementById('buttonclickaudio');
const leaving = document.getElementsByClassName('leaving');

const events = (function() {
    for (let i = 0; i < anchor.length; i++) {
        anchor[i].addEventListener('mouseenter', function() { 
            navaud.play();
        });
    }

    for (let i = 0; i < anchor.length; i++) {
        anchor[i].addEventListener('click', function() { 
            clickaud.volume = .5;
            clickaud.play();
        });
    }

    for (let i = 0; i < title.length; i++) {
        title[i].addEventListener('mouseenter', function() { 
            headaud.volume = .03;
            headaud.play();
        });
    }

    for (let i = 0; i < button.length; i++) {
        button[i].addEventListener('mouseenter', function() { 
            buttonaud.volume = .3;
            buttonaud.play();
        });
    }

    for (let i = 0; i < button.length; i++) {
        button[i].addEventListener('click', function() { 
            buttonclickaud.volume = .3;
            buttonclickaud.play();
        });
    }

    for (let i = 0; i < leaving.length; i++) {
        leaving[i].addEventListener('click', function() { 
            alert(`You are now leaving Cristian's Capstone Project!`);
        });
    }


    window.onscroll = function() {
      const navScroll = "100";
    
      if (window.pageYOffset > navScroll) {
        document.getElementById("stickyNavBar").style.top = "50px";
      } 
      else {
        document.getElementById("stickyNavBar").style.top = "-100px";
      }
    }
    
})();

export { events }