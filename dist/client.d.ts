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
export declare class AccioClient {
    private options;
    constructor(options: ClientOptions);
    uploadFromPath(path: string): Promise<UploadResponse>;
    private _upload;
}
export default AccioClient;
//# sourceMappingURL=client.d.ts.map