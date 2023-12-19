import axios from "axios";
const HTTP_SERVER = "http://localhost:7890"
// const HTTP_SERVER = "http://192.168.2.140:7890"
export class LocalServiceClient {
  post = async (info: string) => {
    await axios.post<string>(`${HTTP_SERVER}/`, info);
  };

  getKeys = async () => {
    const res = await axios.get<void, {
      data: {
        tests: {
          id: number,
        }[]
      }}>(`${HTTP_SERVER}/keys`);
    return res.data.tests.map(({id}) => id)
  };

  get = async (id: number) => {
    return await axios.get<string, {
      data: {
        id: number,
        info: string,
      }
    }>(`${HTTP_SERVER}/?id=${id}`);
  };

  delete = async (id: number) => {
    await axios.delete(`${HTTP_SERVER}/?id=${id}`)
  };

  rgb2hsv = async (image: string) => {
    return await axios.post(`${HTTP_SERVER}/rgb2hsv`, image)
  }

  average = async (image: string) => {
    return await axios.post(`${HTTP_SERVER}/average`, image)
  }
}

export const localServiceClient = new LocalServiceClient();
