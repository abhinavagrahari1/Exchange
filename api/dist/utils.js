"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomClientId = getRandomClientId;
function getRandomClientId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
