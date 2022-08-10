export enum TransformType {
  uppercase = 'uppercase',
  title = 'title',
  capitalize = 'capitalize',
  lowercase = 'lowercase',
  initial = 'initial',
}

/**
 * Transforms a string with CSS-like properties
 * @param text
 * @param transformType
 * @return {string}
 */
export function textTransform(text: string, transformType: TransformType): string {
  switch (transformType) {
    case 'lowercase':
      return text.toLowerCase();
    case 'uppercase':
      return text.toUpperCase();
    case 'title':
      return text
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
        .join(' ');
    case 'capitalize':
      return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
    case 'initial':
      return text;
    default:
      return text;
  }
}
