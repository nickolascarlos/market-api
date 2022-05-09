import {
  RawTranslation,
  ProcessedTranslation,
} from './interfaces/Translation.interface';
import ValidationError from './interfaces/ValidationError.interface';
import { format, objectMap } from './utils';

export class Translator {
  private translations: ProcessedTranslation[];

  constructor(translations: RawTranslation[], silent = false) {
    this.translations = Translator.processTranslations(translations);
    if (!silent) console.log('Translator initialized');
  }

  translateError(error: string): string | undefined {
    for (let i = 0; i < this.translations.length; i++) {
      const { pattern, translation } = this.translations[i];
      const match = error.match(pattern);
      if (match) return format(translation, ...match.slice(1));
    }
  }

  translateClassValidatorErrors(errors: ValidationError[]) {
    if (!errors || errors.length <= 0) return [];

    return errors.map((error) => ({
      ...error,
      ...(error.constraints
        ? {
            constraints: objectMap(error.constraints, (e) =>
              this.translateError(e),
            ),
          }
        : {}),
      ...(error.children && error.children.length !== 0
        ? {
            children: this.translateClassValidatorErrors(error.children),
          }
        : {}),
    }));
  }

  addTranslation(pattern: string, translation: string) {
    this.translations.push({
      pattern: Translator.processPattern(pattern),
      translation: translation,
    });
  }

  addTranslations(translations: RawTranslation[]) {
    this.translations.push(...Translator.processTranslations(translations));
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
