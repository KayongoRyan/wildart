declare module "flutterwave-node-v3" {
  class Flutterwave {
    constructor(publicKey: string, secretKey: string);
    Payment: { initiate(payload: unknown): Promise<unknown>; verify(payload: unknown): Promise<unknown> };
    Transaction: { verify(payload: unknown): Promise<unknown> };
  }
  export = Flutterwave;
}
