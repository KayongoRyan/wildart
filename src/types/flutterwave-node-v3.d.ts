declare module "flutterwave-node-v3" {
  interface CustomerPayload {
    email: string;
    phonenumber?: string;
    name?: string;
  }

  interface CustomizationsPayload {
    title?: string;
    description?: string;
    logo?: string;
  }

  interface InitiatePayload {
    tx_ref: string;
    amount: string | number;
    currency: string;
    redirect_url: string;
    customer: CustomerPayload;
    customizations?: CustomizationsPayload;
    payment_options?: string;
    [key: string]: unknown;
  }

  interface FlutterwaveResponse {
    status: "success" | "error";
    message: string;
    data: {
      link: string;
      [key: string]: unknown;
    };
  }

  interface VerifyResponse {
    status: "success" | "error";
    message: string;
    data: {
      status: "successful" | "failed" | "pending";
      tx_ref: string;
      id: number;
      amount: number;
      currency: string;
      [key: string]: unknown;
    };
  }

  class Flutterwave {
    constructor(publicKey: string, secretKey: string);
    Payment: {
      initiate(payload: InitiatePayload): Promise<FlutterwaveResponse>;
      verify(payload: { id: string }): Promise<VerifyResponse>;
    };
    Transaction: {
      verify(payload: { id: string }): Promise<VerifyResponse>;
    };
  }

  export = Flutterwave;
}
