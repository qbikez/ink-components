const borders = {
    active: {
        borderColor: "green",
    },
    default: {
        borderColor: undefined,
    }
};
export function border(isActive) {
    return isActive ? borders.active : borders.default;
}
//# sourceMappingURL=borders.js.map