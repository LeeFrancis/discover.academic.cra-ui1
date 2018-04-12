const UNAUTHORIZED = 401;

export default {
  intercept: (error, win) => {
    if (typeof window !== "object") {
      return;
    }
    // eslint-disable-next-line no-undef
    const w = win || window;

    if (
      typeof error === "object" &&
      typeof error.response === "object" &&
      typeof error.response.status === "number" &&
      error.response.status === UNAUTHORIZED
    ) {
      w.location.assign(win.location.href);
    }
  }
};
