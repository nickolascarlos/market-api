import Translator, { languages } from './translator';
import customPtBr from './translator/translations/custom-pt-br';

const translator = new Translator(languages.pt_br);
translator.addTranslations(customPtBr);

// Função utilitária para tradução
const __ = (str) => translator.translateError(str);

export default translator;
export { __ };
