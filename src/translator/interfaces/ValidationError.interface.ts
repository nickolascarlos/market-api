export default interface ValidationError {
  target?: Record<string, any>;
  property: string;
  value?: any;
  constraints?: {
    [type: string]: string;
  };
  children: ValidationError[];
}
