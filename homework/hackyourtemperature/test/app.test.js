import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("POST /weather", () => {
  describe("if requested city name is valid", () => {
    it("Server will respond with a 200 status code", async () => {
      const response = await request
        .post("/weather")
        .send({ cityName: "Amsterdam" });
      expect(response.statusCode).toBe(200);
    });
  });

  describe("if the requested city name is not valid ", () => {
    it("Server will respond with a status code 404", async () => {
      const response = await request
        .post("/weather")
        .send({ cityName: "blaa_blaa" });
      if (!response.body.cityName) {
        expect(response.statusCode).toBe(404);
      }
    });
  });
  describe("if the requested city name is Empty ", () => {
    it("Server will respond with a status code 400", async () => {
      const response = await request.post("/weather").send({ cityName: "" });
      expect(response.statusCode).toBe(400);
    });
  });
});
