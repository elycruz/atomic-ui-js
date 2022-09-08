export const throwNoOverrideError = () => {
    throw new Error(`Should override method from extending class.`);
  },
  waitFor = async (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout || 0);
    });
  };
