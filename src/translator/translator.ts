import {
  RawTranslation,
  ProcessedTranslation,
} from './interfaces/Translation.interface';
import ValidationError from './interfaces/ValidationError.interface';
import { format, objectMap } from './utils';

export class Translator {
  private translations: {
    [key: string]: ProcessedTranslation[];
  };

  constructor(silent = false) {
    this.translations = {};
    if (!silent) console.log('Translator initialized');
  }

  translateError(error: string, language: string): string | undefined {
    // Só traduz se alguma língua tiver sido especificada
    if (language)
      for (let i = 0; i < this.translations[language].length; i++) {
        const { pattern, translation } = this.translations[language][i];
        const match = error.match(pattern);
        if (match) return format(translation, ...match.slice(1));
      }
    return error; // Se não encontra uma tradução, retorna o erro não traduzido
  }

  translateClassValidatorErrors(errors: ValidationError[], language: string) {
    if (!errors || errors.length <= 0) return [];

    return errors.map((error) => ({
      ...error,
      ...(error.constraints
        ? {
            constraints: objectMap(error.constraints, (e) =>
              this.translateError(e, language),
            ),
          }
        : {}),
      ...(error.children && error.children.length !== 0
        ? {
            children: this.translateClassValidatorErrors(
              error.children,
              language,
            ),
          }
        : {}),
    }));
  }

  addTranslation(pattern: string, translation: string, language: string) {
    if (!this.translations[language]) this.translations[language] = [];
    this.translations[language].push({
      pattern: Translator.processPattern(pattern),
      translation: translation,
    });
  }

  addTranslations(translations: RawTranslation[], language) {
    if (!this.translations[language]) this.translations[language] = [];
    this.translations[language].push(
      ...Translator.processTranslations(translations),
    );
  }

  private static processPattern(pattern: string): RegExp {
    return new RegExp(pattern.replace('{#}', '((?:[0-9a-zA-Z_$])+)'));
  }

  private static processTranslations(
    translations: RawTranslation[],
  ): ProcessedTranslation[] {
    return translations.map((translation) => ({
      ...translation,
      pattern: Translator.processPattern(translation.pattern),
    }));
  }
}
