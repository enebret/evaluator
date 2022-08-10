"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransformType;
(function (TransformType) {
    TransformType["uppercase"] = "uppercase";
    TransformType["title"] = "title";
    TransformType["capitalize"] = "capitalize";
    TransformType["lowercase"] = "lowercase";
    TransformType["initial"] = "initial";
})(TransformType = exports.TransformType || (exports.TransformType = {}));
/**
 * Transforms a string with CSS-like properties
 * @param text
 * @param transformType
 * @return {string}
 */
function textTransform(text, transformType) {
    switch (transformType) {
        case 'lowercase':
            return text.toLowerCase();
        case 'uppercase':
            return text.toUpperCase();
        case 'title':
            return text
                .split(' ')
                .map(function (word) { return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase(); })
                .join(' ');
        case 'capitalize':
            return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
        case 'initial':
            return text;
        default:
            return text;
    }
}
exports.textTransform = textTransform;
