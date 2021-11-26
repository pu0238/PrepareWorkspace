import assert from "assert";

export function validateField(
    name: string,
    value: any,
    type: string | object,
    required: boolean = true
  ) {
    try {
      if (!required && !value) {
        return;
      }
      assert.ok(value !== undefined);
      assert.ok(value !== null);
      assert.ok(value !== "");
  
      if (typeof type === "string") {
        assert.ok(typeof value === type);
      } else {
        assert.ok(Object.values(type).includes(value));
      }
    } catch (e: any) {
      const message = `Invalid value of ${name}: ${type} = ${value} \n Expect type: ${type}. Received type ${typeof value}`;
      const stack = new Error(message).stack || "";
      e.stack =
        e.stack +
        "\nCaused by: " +
        stack.split("\n").slice(0, 2).join("\n") +
        "\n";
      throw e;
    }
  }