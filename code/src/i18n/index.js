import enUS from './en-us';
import deDE from './de';
import numberFormats from './number-formats';

console.log('enUs');
console.log(enUS);
console.log('DE');
console.log(deDE);

const messages = {
  'en-us': enUS,
  de: deDE
};
console.log('enUS');
console.log(enUS);

console.log('jjjjjhhhh');
console.log(messages);

export { messages, numberFormats };
