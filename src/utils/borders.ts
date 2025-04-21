const borders = {
  active: {
    borderColor: "green",
  },
  default: {
    borderColor: undefined,
  }
};

export function border(isActive: boolean) {
  return isActive ? borders.active : borders.default;
}
