const uploadPreview = document.querySelector('.img-upload__preview');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = effectLevel.querySelector('.effect-level__value');
const effectList = document.querySelector('.effects__list');
const uploadPreviewImg = uploadPreview.querySelector('.img-upload__preview img');
const reductionButton = document.querySelector('.scale__control--smaller');
const zoomButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');

effectLevel.classList.add('hidden');
let currentEffect;
let initialScaleValue = 100;
const scaleStep = 25;

const updatePreview = () => {
  uploadPreviewImg.style.transform = `scale(${initialScaleValue / 100})`;
  scaleValue.value = `${initialScaleValue}%`;
};

reductionButton.addEventListener('click', () => {
  if (initialScaleValue > 25) {
    initialScaleValue -= scaleStep;
    updatePreview();
  }
});

zoomButton.addEventListener('click', () => {
  if (initialScaleValue < 100) {
    initialScaleValue += scaleStep;
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
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
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
  const value = effectLevelValue.value;

  if (filter === 'invert' || filter === 'blur') {
    uploadPreviewImg.style.filter = `${filter}(${value}${filter === 'invert' ? '%' : 'px'})`;
  } else {
    uploadPreviewImg.style.filter = `${filter}(${value})`;
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
    uploadPreviewImg.style.filter = 'none';
  }
});

const resetValues = () => {
  effectLevelSlider.noUiSlider.reset();
  initialScaleValue = 100;
  uploadPreviewImg.style.transform = null;
};

export {resetValues};
