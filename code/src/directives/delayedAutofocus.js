import { Platform } from 'quasar';

export const delayedAutofocus = {
  inserted(el, binding) {
    let input = el.querySelector('.q-field__native');
    console.log(input);
    let delay = binding.value;
    setTimeout(() => {
      input.focus();
    }, delay);
  }
};
