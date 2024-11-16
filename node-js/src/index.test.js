const express = require("express");
const supertest = require("supertest");
const app = express(); // Create an instance of express
const request = supertest(app);

// Define the route
app.get("/", function (req, res) {
    res.status(200).send("practise with kubernetes");
});

// Test suite
describe("GET /", function () {
    it("should return 200 OK", function (done) {
        request
            .get("/") // Make a GET request to the root route
            .expect(200) // Expect a 200 OK status
            .expect("practise with kubernetes") // Optionally check the response body
            .end(function (err, res) {
                if (err) return done(err); // Handle errors
                done(); // Call done to indicate the test is complete
            });
    });
});