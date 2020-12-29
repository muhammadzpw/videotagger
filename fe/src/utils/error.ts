import { AxiosError } from 'axios';

function isAxiosError(isError: any): isError is AxiosError {
  return !!isError && !!(isError as AxiosError).config;
}

export const extractServiceErrorMessage = (error: Error): string => {
  if (error && isAxiosError(error) && error.response && error.response.data) {
    const errorMessage = error.response.data.message;
    return errorMessage;
  }
  return '';
};
