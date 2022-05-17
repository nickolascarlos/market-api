import Translator, { languages } from './translator';
import customPtBr from './translator/translations/custom-pt-br';

const translator = new Translator();

// Português
translator.addTranslations(languages.pt_br, 'pt-BR');
translator.addTranslations(customPtBr, 'pt-BR');

export default translator;
