export declare enum TransformType {
    uppercase = "uppercase",
    title = "title",
    capitalize = "capitalize",
    lowercase = "lowercase",
    initial = "initial"
}
/**
 * Transforms a string with CSS-like properties
 * @param text
 * @param transformType
 * @return {string}
 */
export declare function textTransform(text: string, transformType: TransformType): string;
