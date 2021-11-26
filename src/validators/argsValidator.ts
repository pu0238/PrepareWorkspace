import { validateField } from "./validation";

export function argsValidator(
  args: object,
  argName: string,
  type: string
): void {
  validateField(`args.${argName}`, args[argName], type);
}
