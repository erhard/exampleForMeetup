import EventBus from 'src/services/eventBus';

export const set_lang = async (lang, vueThis) => {
  console.log('Langggg');
  console.log(lang);
  vueThis.$i18n.locale = lang.value;
  vueThis.$store.dispatch('auth/language', { language: lang.value });
  // set quasar's language too!!
  try {
    const language = await import(`quasar/lang/${lang.value}`);
    vueThis.$q.lang.set(language.default);
    localStorage.locale = language.default.isoName;
    EventBus.$emit('LOCALE_CHANGE', { locale: language.default });
  } catch (err) {
    console.log(err);
    const dialogObject = {
      message: 'Bitte nochmals versuchen',
      sub_message: err.message,
      nextRoute: '/en'
    };
    EventBus.$emit('DIALOG', dialogObject);
    console.log('ERROR');
  }
};
