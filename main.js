const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    e.preventDefault();

    const targetEl = document.querySelector(href);
    if (!targetEl) return;

    if (prefersReduced) {
        targetEl.scrollIntoView();

        targetEl.setAttribute('tabindex', '-1');
        targetEl.focus({ preventScroll: true });
        return;
    }

    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start'});

    setTimeout(() => {
        targetEl.setAttribute('tabindex', '-1');
        targetEl.focus({ preventScroll: true});
    }, 500);
});

let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        header.classList.add('header-hide');
    } else {
        header.classList.remove('header-hide');
    }
    lastScrollTop = scrollTop;
});

window.addEventListener('load', () => {
  const header = document.querySelector('header');
  const sobreSection = document.querySelector('#sobre');
  const headerHeight = header.offsetHeight;
  sobreSection.style.paddingTop = `${headerHeight + 20}px`; // +20 para espaçar um pouquinho mais
});

window.addEventListener('resize', () => {
  const header = document.querySelector('header');
  const sobreSection = document.querySelector('#sobre');
  const headerHeight = header.offsetHeight;
  sobreSection.style.paddingTop = `${headerHeight + 20}px`;
});

document.getElementById('form-contato').addEventListener('submit', function(e){
    e.preventDefault();

    const nome = document.querySelector('input[name="nome"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const mensagem = document.querySelector('textarea[name="mensagem"]').value.trim();
    const feedback = document.createElement('p');

    const anterior = document.querySelector('.feedback');
    if (anterior) anterior.remove();

    feedback.classList.add('feedback');
    this.appendChild(feedback);

    if (!nome || !email || !mensagem) {
        feedback.textContent = 'Por favor, preencha todos os campos.';
        feedback.style.color = 'red';
        return;
    }

     const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    feedback.textContent = 'Digite um e-mail válido.';
    feedback.style.color = 'red';
    return;
  }


  feedback.textContent = 'Mensagem enviada com sucesso! ✅';
  feedback.style.color = 'green';

  
  this.reset();
});


const btnTopo = document.getElementById('btn-topo');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    btnTopo.style.display = 'block';
  } else {
    btnTopo.style.display = 'none';
  }
});

btnTopo.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

