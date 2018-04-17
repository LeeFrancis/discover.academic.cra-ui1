const UNAUTHORIZED = 401;

export const axiosUnauthorized = {
  intercept: (error, win) => {
    if (typeof window !== "object") {
      return;
    }

    win = win || window;

    if (
      typeof error === "object" &&
      typeof error.response === "object" &&
      typeof error.response.status === "number" &&
      error.response.status === UNAUTHORIZED
    ) {
      win.location.assign(win.location.href);
    }
  }
};
