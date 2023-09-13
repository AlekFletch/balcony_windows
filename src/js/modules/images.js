const images = () => {
  const imgPopup = document.createElement('div'),
      workSection = document.querySelector('.works'),
      bigImage = document.createElement('img');

      imgPopup.classList.add('popup');
      workSection.appendChild(imgPopup);

      imgPopup.style.justifyContent = 'center';
      imgPopup.style.alignItems = 'center';
      imgPopup.style.display = 'none';
      imgPopup.appendChild(bigImage);

      workSection.addEventListener('click', (e) => {
          e.preventDefault();
          let target = e.target;

          if(target && target.classList.contains('preview')) {
              imgPopup.style.display = 'flex';
              document.body.style.overflow = 'hidden';
              const path = target.parentNode.getAttribute('href');
              bigImage.setAttribute('src', path);

              // Установка размеров изображения в 70% от размера экрана
              const screenHeight = window.innerHeight;
              const imageHeight = screenHeight * 0.7;
              bigImage.style.maxHeight = `${imageHeight}px`;

              const screenWidth = window.innerWidth;
              const imageWidth = screenWidth * 0.6;
              bigImage.style.maxWidth = `${imageWidth}px`;
          }

          if (target && target.matches('div.popup')) {
              imgPopup.style.display = 'none';
              document.body.style.overflow = 'auto';
          }
      });

};
export default images;