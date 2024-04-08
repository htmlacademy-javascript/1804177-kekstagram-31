const uploadPreview = document.querySelector('.img-upload__preview');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = effectLevel.querySelector('.effect-level__value');
const effectList = document.querySelector('.effects__list');
const uploadPreviewImg = uploadPreview.querySelector('.img-upload__preview img');
const reductionButton = document.querySelector('.scale__control--smaller');
const zoomButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');

let currentEffect;
let initialValue = 100;
const STEP = 25;

const updatePreview = () => {
  uploadPreviewImg.style.transform = `scale(${initialValue / 100})`;
  scaleValue.value = `${initialValue}%`;
};

reductionButton.addEventListener('click', () => {
  if (initialValue > 25) {
    initialValue -= STEP;
    updatePreview();
  }
});

zoomButton.addEventListener('click', () => {
  if (initialValue < 100) {
    initialValue += STEP;
    updatePreview();
  }
});

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

const effects = {
  chrome: {
    filter: 'grayscale',
    range: {min: 0, max: 1},
    step: 0.1
  },
  sepia: {
    filter: 'sepia',
    range: {min: 0, max: 1},
    step: 0.1
  },
  marvin: {
    filter: 'invert',
    range: {min: 0, max: 100},
    step: 1,
  },
  phobos: {
    filter: 'blur',
    range: {min: 0, max: 3},
    step: 0.1,
  },
  heat: {
    filter: 'brightness',
    range: {min: 1, max: 3},
    step: 0.1
  }
};

const updateEffect = (filter) => {
  if (filter === 'invert') {
    uploadPreview.style.filter = `${filter}(${effectLevelValue.value}%)`;
  } else if (filter === 'blur') {
    uploadPreview.style.filter = `${filter}(${effectLevelValue.value}px)`;
  } else {
    uploadPreview.style.filter = `${filter}(${effectLevelValue.value})`;
  }
};

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  if (currentEffect) {
    updateEffect(effects[currentEffect].filter);
  }
});

effectList.addEventListener('change', (evt) => {
  effectLevel.classList.remove('hidden');
  if (effects[evt.target.value]) {
    currentEffect = evt.target.value;
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: effects[currentEffect].range.min,
        max: effects[currentEffect].range.max,
      },
      step: effects[currentEffect].step
    });
    effectLevelSlider.noUiSlider.set(100);
  } else {
    effectLevel.classList.add('hidden');
    uploadPreview.style.filter = 'none';
  }
});

const resetValues = () => {
  effectLevelSlider.noUiSlider.reset();
  initialValue = 100;
  uploadPreviewImg.style.transform = null;
};

export {resetValues};
