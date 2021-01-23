"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccioClient = void 0;
const form_data_1 = __importDefault(require("form-data"));
const fs_1 = __importDefault(require("fs"));
const api_1 = require("./api");
const defaultOptions = {
    clientId: "",
    clientSecret: "",
};
function validateOptions(options, requiredFields) {
    const required = requiredFields.split(" ");
    for (const key of required) {
        if (!options[key])
            throw new Error(`${key} is required`);
    }
}
class AccioClient {
    constructor(options) {
        validateOptions(options, "clientId clientSecret");
        this.options = Object.assign(defaultOptions, options);
        api_1.api.interceptors.request.use((config) => {
            const nConfig = { ...config };
            nConfig.headers["X-Client-ID"] = this.options.clientId;
            nConfig.headers["X-Client-Secret"] = this.options.clientSecret;
            return nConfig;
        });
    }
    async uploadFromPath(path) {
        if (!path)
            throw new Error("Path is required");
        const fileExists = fs_1.default.existsSync(path);
        if (!fileExists)
            throw new Error(`File on path ${path} not exists`);
        const stream = fs_1.default.createReadStream(path);
        return this._upload(stream);
    }
    async _upload(content) {
        const fd = new form_data_1.default();
        fd.append("image", content);
        try {
            const { data: response } = await api_1.api.post("/admin/upload", fd, {
                headers: {
                    ...fd.getHeaders(),
                },
                maxBodyLength: Infinity,
                maxContentLength: Infinity,
            });
            return response;
        }
        catch (error) {
            throw new Error(error?.response?.data?.message || "An error has occurred");
        }
    }
}
exports.AccioClient = AccioClient;
exports.default = AccioClient;
//# sourceMappingURL=client.js.map