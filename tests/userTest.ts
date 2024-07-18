import request from "supertest"
import app from "../src/index"
import * as db from './db'

describe("API endpoint /users", () => {
  beforeAll(async () => {
    await db.connect()
  })

  afterEach(async () => {
    // await db.clearDatabase()
  })

  afterAll(async () => {
    await db.clearDatabase()
    await db.closeDatabase()
  })

  describe("POST /api/v1/users/register", () => {
    const user = {
      username: 'tonystark',
      email: 'tonystark@mail.com',
      password: 'mark42',
    }

    it("Succes response", async () => {  
      const res = await request(app)
        .post("/api/v1/users/register")
        .send(user)
        .expect("Content-Type", /json/);
        
      expect(res.status).toEqual(200);
      expect(res.body.error).toBeFalsy()
      expect(res.body.message).toContain('User successfully registered')
  
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data).toHaveProperty('username');
      expect(res.body.data).toHaveProperty('email');
      expect(res.body.data).toHaveProperty('token');
    });

    it("User exist", async () => {
      const user = {
        username: 'tonystark',
        email: 'tonystark@mail.com',
        password: 'mark42',
      }
  
      const res = await request(app)
        .post("/api/v1/users/register")
        .send(user)
        .expect("Content-Type", /json/);
        
      expect(res.status).toEqual(400);
      expect(res.body.error).toBeTruthy()
      expect(res.body.message).toContain('Bad request')
  
      expect(res.body.data).toHaveProperty('reason', 'User with the given email already exist')
    });

    it("Invalid request body", async () => {
      const user = {
        username: 'tonystark',
        email: 'tonystark@mail.com'
      }
  
      const res = await request(app)
        .post("/api/v1/users/register")
        .send(user)
        .expect("Content-Type", /json/);
        
      expect(res.status).toEqual(400);
      expect(res.body.error).toBeTruthy()
      expect(res.body.message).toContain('Bad request')
  
      expect(res.body.data).toHaveProperty('reason', 'Invalid request body')
      expect(res.body.data).toHaveProperty('additional')
    });
  })
  
  describe('POST /api/v1/users/login', () => {
    it("Success response", async () => {
      const user = {
        email: 'tonystark@mail.com',
        password: 'mark42',
      }
  
      const res = await request(app)
        .post("/api/v1/users/login")
        .send(user)
        .expect("Content-Type", /json/);
        
      expect(res.status).toEqual(200);
      expect(res.body.error).toBeFalsy()
  
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data).toHaveProperty('username');
      expect(res.body.data).toHaveProperty('email');
      expect(res.body.data).toHaveProperty('token');
    });
    it("Invalid request body", async () => {
      const user = {
        email: 'tonystark@mail.com'
      }
  
      const res = await request(app)
        .post("/api/v1/users/login")
        .send(user)
        .expect("Content-Type", /json/);
        
      expect(res.status).toEqual(400);
      expect(res.body.error).toBeTruthy()
      expect(res.body.message).toContain('Bad request')
  
      expect(res.body.data).toHaveProperty('reason', 'Invalid request body')
      expect(res.body.data).toHaveProperty('additional')
    });
    it("Invalid username or password", async () => {
      const user = {
        email: 'tonystark@mail.com',
        password: "simplepassword"
      }
  
      const res = await request(app)
        .post("/api/v1/users/login")
        .send(user)
        .expect("Content-Type", /json/);
        
      expect(res.status).toEqual(401);
      expect(res.body.error).toBeTruthy()
      expect(res.body.message).toContain('Unauthorized')
  
      expect(res.body.data).toHaveProperty('reason', 'Invalid email or password')
    });

    it("Not registered user", async () => {
      const user = {
        email: 'tonykark@mail.com',
        password: "mark42"
      }
  
      const res = await request(app)
        .post("/api/v1/users/login")
        .send(user)
        .expect("Content-Type", /json/);
        
      expect(res.status).toEqual(401);
      expect(res.body.error).toBeTruthy()
      expect(res.body.message).toContain('Unauthorized')
  
      expect(res.body.data).toHaveProperty('reason', 'User with this email not registered')
    });
  })
});