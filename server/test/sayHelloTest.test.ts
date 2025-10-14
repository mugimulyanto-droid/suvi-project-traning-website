import sayHello from "../src/sayHello";
import { describe, it, expect } from "@jest/globals";

describe("halo", () => {
  it("should be say hello", function (): void {
    expect(sayHello("Suvi")).toBe("Hello, Suvi!");
  });
});
