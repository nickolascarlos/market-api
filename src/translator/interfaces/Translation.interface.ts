export interface RawTranslation {
  pattern: string;
  translation: string;
}

export interface ProcessedTranslation {
  pattern: RegExp;
  translation: string;
}
