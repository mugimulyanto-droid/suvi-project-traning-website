import { describe, it, expect } from "@jest/globals";
import supertest from "supertest";
import { web } from "../src/application/web";

describe("Name of the group", () => {
  it("should return 200", async () => {
    const response = await supertest(web).get("/api/courses");

    expect(response.status).toBe(200);
  });
});
