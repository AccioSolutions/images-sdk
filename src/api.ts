import Axios from "axios";

import { SERVER_API } from "./constants";

export const api = Axios.create({
  baseURL: SERVER_API,
});
