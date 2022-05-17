import Translator, { languages } from './translator';
import customPtBr from './translator/translations/custom-pt-br';

const translator = new Translator(languages.pt_br);
translator.addTranslations(customPtBr);

export default translator;
