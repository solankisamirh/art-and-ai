import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// default code 

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal') as HTMLDivElement;
  const modalImg = document.getElementById('modalImage') as HTMLImageElement;
  const captionText = document.getElementById('caption') as HTMLDivElement;
  const closeSpan = document.querySelector('.close') as HTMLSpanElement;
  const body = document.body;

  function openModal(event: Event): void {
      if (event.target instanceof HTMLImageElement) {
          modal.style.display = "block";
          modalImg.src = event.target.src;
          captionText.innerHTML = event.target.alt;
          body.classList.add('modal-open');

          const padding = 20; // Set consistent padding
          const screenWidth = window.innerWidth;
          const screenHeight = window.innerHeight;

          const maxWidth = screenWidth - (padding * 2);
          const maxHeight = screenHeight - (padding * 2);

          modalImg.style.maxWidth = `${maxWidth}px`;
          modalImg.style.maxHeight = `${maxHeight}px`;
          modalImg.style.padding = `${padding}px`;

          modalImg.onload = () => {
              // Calculate ratio to fit image within modal while maintaining aspect ratio
              let ratio = Math.min(maxHeight / modalImg.height, maxWidth / modalImg.width);
              modalImg.style.height = `${modalImg.height * ratio}px`;
              modalImg.style.width = `${modalImg.width * ratio}px`;
              modalImg.style.position = 'fixed';
              modalImg.style.top = '50%';
              modalImg.style.left = '50%';
              modalImg.style.transform = 'translate(-50%, -50%)';
          };

          document.addEventListener('keydown', closeModalOnEsc);
      }
  }

  function closeModalOnEsc(event: KeyboardEvent) {
      if (event.key === 'Escape') {
          closeModal();
      }
  }

  function closeModal() {
      modal.style.display = "none";
      body.classList.remove('modal-open');
      modalImg.style.cssText = ''; // Reset all styles
      document.removeEventListener('keydown', closeModalOnEsc);
  }

  // Adding click event listeners to all images in sections
  document.querySelectorAll('section img').forEach(img => {
      img.addEventListener('click', openModal);
  });

  // Close modal when clicking the 'X'
  closeSpan.onclick = closeModal;

  // Close modal if clicked outside of it
  window.onclick = (event: MouseEvent) => {
      if (event.target === modal) {
          closeModal();
      }
  };
});