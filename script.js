
// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '▀!<>-_\\/[]{}—=+*^?#________';
      this.update = this.update.bind(this);
    }
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => this.resolve = resolve);
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    update() {
      let output = '';
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}
  
// ——————————————————————————————————————————————————
// Calling Text Scramble
// ——————————————————————————————————————————————————

const phrases = [
    'CHECK THIS OUT MOM',
    '༼ つ ▀_▀ ༽つ',
];
  
const el = document.querySelector('.header-text');
const fx = new TextScramble(el);
  
let counter = 0;
const next = () => {
    fx.setText('CHECK THIS OUT MOM')
    // if (counter === 0) {
    //   fx.setText(phrases[counter]).then(() => {
    //     setTimeout(next, 10000);
    //   });
    // } else {
    //   fx.setText(phrases[counter]).then(() => {
    //     setTimeout(next, 3000);
    //   });
    // }
    // counter = (counter + 1) % phrases.length;
};
next();

// ——————————————————————————————————————————————————
// Cursor
// ——————————————————————————————————————————————————

document.addEventListener("DOMContentLoaded", function() {
    const cursor = document.createElement("div");
    cursor.className = "cursor";
    document.body.appendChild(cursor);

    // Set color based on mouse movement
    document.addEventListener("mousemove", function(e) {
        // Calculate cursor position
        const cursorX = e.clientX - cursor.offsetWidth / 2;
        const cursorY = e.clientY - cursor.offsetHeight / 2;

        // Update cursor position
        cursor.style.left = cursorX + "px";
        cursor.style.top = cursorY + "px";

        // Calculate hue based on position
        // const hue = Math.round((e.clientX / window.innerWidth) * 360);

        // // Update color
        // cursor.style.backgroundColor = "hsl(" + hue + ", 100%, 50%)";

    })
})