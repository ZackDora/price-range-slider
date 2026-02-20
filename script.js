const minPrice = document.getElementById('min-price');
const maxPrice = document.getElementById('max-price');

const sliderRange = document.getElementById('slider-range');

const minRange = document.getElementById('min-range');
const maxRange = document.getElementById('max-range');

const summaryMin = document.getElementById('summary-min');
const summaryMax = document.getElementById('summary-max');

const minGap = 50;


function formatCurrency(value) {
  return "$" + Number(value).toLocaleString();
}




/* keeps the thumbs apart, moves the colored bar, and updates the text. */

function updateSlider(event) {

  let minValue = Number(minRange.value);
  let maxValue = Number(maxRange.value);

  /* Prevent the min thumb from crossing the max thumb */
  if (maxValue - minValue <= minGap) {
    if (event && event.target === minRange) {
      minValue = maxValue - minGap;
      minRange.value = minValue;
    } else {
      maxValue = minValue + minGap;
      maxRange.value = maxValue;
    };
  }

  const rangeMin = Number(minRange.min);
  const rangeMax = Number (maxRange.max);

  const leftPercentage = ((minRange.value - rangeMin) / (rangeMax - rangeMin)) * 100;

  const rightPercentage = ((rangeMax - maxRange.value) / (rangeMax - rangeMin)) * 100;

  sliderRange.style.left = leftPercentage + '%';
  sliderRange.style.right = rightPercentage + '%';

  minPrice.value = minRange.value;
  maxPrice.value = maxRange.value;

  summaryMin.textContent = formatCurrency(minRange.value);
  summaryMax.textContent = formatCurrency(maxRange.value);
};


function updateMinFromInput() {

  let minValue = Number(minPrice.value);

  // If the value is NaN, fall back to the min slider's value
  if (Number.isNaN(minValue)) {
    minValue = Number(minRange.value)
  }

  /*
    The min value needs to bigger than 0
    The min value at most = max - minGap
  */
  const clamped = Math.max(0, Math.min(minValue, Number(maxRange.value) - minGap));
  const step = 10;
  const rounded = Math.round(clamped / step) * step;
  const roundedClamped = Math.max(0, Math.min(rounded, Number(maxRange.value) - minGap));

  minRange.value = roundedClamped;
  minPrice.value = roundedClamped;

  updateSlider();
};


function updateMaxFromInput() {

  let maxValue = Number(maxPrice.value);

  // If the value is NaN, fall back to the min slider's value
  if (Number.isNaN(maxValue)) {
    maxValue = Number(maxRange.value)
  }

  /*
    The max value cannot go under min + minGap
    The max value at most is max range
  */
  const clamped = Math.min(Number(maxRange.max), Math.max(maxValue, Number(minRange.value) + minGap));
  const step = 10;
  const rounded = Math.round(clamped / step) * step;
  const roundedClamped = Math.min(Number(maxRange.max),
    Math.max(rounded, Number(minRange.value) + minGap));

  maxRange.value = roundedClamped;
  maxPrice.value = roundedClamped;

  updateSlider();
}

minPrice.addEventListener("change", updateMinFromInput);
maxPrice.addEventListener("change", updateMaxFromInput);

minRange.addEventListener("input", updateSlider);
maxRange.addEventListener("input", updateSlider);

updateSlider();

