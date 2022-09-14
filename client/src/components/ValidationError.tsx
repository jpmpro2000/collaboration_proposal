import { FieldError } from "react-hook-form";

type Props = {
  error: FieldError | undefined;
};

export const ValidationError = ({ error }: Props) => {
  return <p className="validation-error">{error?.message}</p>;
};
