import FormData from "form-data";
import fs from "fs";

import { api } from "./api";

export interface ClientOptions {
  clientId: string;
  clientSecret: string;
}

export interface UploadResponse {
  deleteHash: string;
  uuid: string;
  url: string;
  directUrl: string;
  createdAt: string;
  updatedAt: string;
}

const defaultOptions = {
  clientId: "",
  clientSecret: "",
};

function validateOptions(options: ClientOptions, requiredFields: string): void {
  const required = requiredFields.split(" ");
  for (const key of required) {
    if (!options[key]) throw new Error(`${key} is required`);
  }
}

export class AccioClient {
  private options: ClientOptions;

  constructor(options: ClientOptions) {
    validateOptions(options, "clientId clientSecret");

    this.options = Object.assign(defaultOptions, options);

    api.interceptors.request.use((config) => {
      const nConfig = { ...config };
      nConfig.headers["X-Client-ID"] = this.options.clientId;
      nConfig.headers["X-Client-Secret"] = this.options.clientSecret;
      return nConfig;
    });
  }

  async uploadFromPath(path: string): Promise<UploadResponse> {
    if (!path) throw new Error("Path is required");
    const fileExists = fs.existsSync(path);

    if (!fileExists) throw new Error(`File on path ${path} not exists`);

    const stream = fs.createReadStream(path);

    return this._upload(stream);
  }

  private async _upload(
    content: fs.ReadStream | Buffer,
  ): Promise<UploadResponse> {
    const fd = new FormData();

    fd.append("image", content);

    try {
      const { data: response } = await api.post<UploadResponse>(
        "/admin/upload",
        fd,
        {
          headers: {
            ...fd.getHeaders(),
          },
          maxBodyLength: Infinity,
          maxContentLength: Infinity,
        },
      );
      return response;
    } catch (error) {
      throw new Error(
        error?.response?.data?.message || "An error has occurred",
      );
    }
  }
}

export default AccioClient;
