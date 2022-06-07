import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api';
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTAzZTBiMjAyZGE5OGJkOTA4ZjdkYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NDM5MzI5MywiZXhwIjoxNjU0NDc5NjkzfQ.yiBO7ydMH_gQnAlrP_OmU6xZgAryTMZoyacd5HRTaEo';
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
