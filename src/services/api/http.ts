import axios, { type AxiosInstance } from "axios";

export class HttpAxiosInstance {
  private static instance: HttpAxiosInstance;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    this.axiosInstance.interceptors.request.use(async (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  public static getInstance(): HttpAxiosInstance {
    if (!HttpAxiosInstance.instance) {
      HttpAxiosInstance.instance = new HttpAxiosInstance();
    }
    return HttpAxiosInstance.instance;
  }

  public get axios() {
    return this.axiosInstance;
  }
}
