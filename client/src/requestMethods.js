import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api';
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTAzZTBiMjAyZGE5OGJkOTA4ZjdkYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NDMxNDkyMiwiZXhwIjoxNjU0NDAxMzIyfQ.CV7XbAWdgWVHzrx-UpCrH1D_7NE78SQ8UCrbZApc0vI';
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
