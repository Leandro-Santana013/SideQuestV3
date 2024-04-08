import { useState } from "react";

let isSignUpActiveState = false;

export const setIsSignUpActive = (value) => {
  isSignUpActiveState = value;
};

export const useIsSignUpActive = () => {
  return isSignUpActiveState;
};
