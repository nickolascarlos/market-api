import Translator, { languages } from './translator';
import customPtBr from './translator/translations/custom-pt-br';
import customEo from './translator/translations/custom-eo';

const translator = new Translator();

// Português
translator.addTranslations(languages.pt_br, 'pt-BR');
translator.addTranslations(customPtBr, 'pt-BR');

// Esperanto
translator.addTranslations(languages.eo, 'eo');
translator.addTranslations(customEo, 'eo');

export default translator;
