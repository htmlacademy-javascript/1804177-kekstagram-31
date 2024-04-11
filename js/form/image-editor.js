const uploadPreview = document.querySelector('.img-upload__preview');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = effectLevel.querySelector('.effect-level__value');
const effectList = document.querySelector('.effects__list');
const uploadPreviewImg = uploadPreview.querySelector('.img-upload__preview img');
const reductionButton = document.querySelector('.scale__control--smaller');
const zoomButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');

const maxValue = 100;
const initialScalePercentage = 100;
const zoomThreshold = 100;
const reductionThreshold = 25;
const scaleStep = 25;

let currentValue = maxValue;
let currentEffect;

effectLevel.classList.add('hidden');

const updatePreview = () => {
  uploadPreviewImg.style.transform = `scale(${currentValue / initialScalePercentage})`;
  scaleValue.value = `${currentValue}%`;
};

reductionButton.addEventListener('click', () => {
  if (currentValue > reductionThreshold) {
    currentValue -= scaleStep;
    updatePreview();
  }
});

zoomButton.addEventListener('click', () => {
  if (currentValue < zoomThreshold) {
    currentValue += scaleStep;
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

const Effects = {
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
    updateEffect(Effects[currentEffect].filter);
  }
});

effectList.addEventListener('change', (evt) => {
  effectLevel.classList.remove('hidden');
  if (Effects[evt.target.value]) {
    currentEffect = evt.target.value;
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: Effects[currentEffect].range.min,
        max: Effects[currentEffect].range.max,
      },
      step: Effects[currentEffect].step
    });
    effectLevelSlider.noUiSlider.set(maxValue);
  } else {
    effectLevel.classList.add('hidden');
    uploadPreviewImg.style.filter = 'none';
  }
});

const resetValues = () => {
  effectLevelSlider.noUiSlider.reset();
  currentValue = maxValue;
  uploadPreviewImg.style.transform = null;
};

export {resetValues};
