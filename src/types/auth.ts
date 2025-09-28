export namespace AuthModel {
  export interface FromApi {
    body: { accessToken: string };
    status: number;
  }

  export interface Response {
    token: string;
    status: number;
  }
}
