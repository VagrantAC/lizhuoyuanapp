import axios from "axios";


export class AsyncStorageClient {
  post = async (info: string) => {
    try {
      await axios.post<string>(`http://localhost:7890/`, info);
    } catch (e) {
      console.error(e)
    }
  };

  getKeys = async () => {
    try {
      const res = await axios.post<void, {tests: {
          id: string,
        }[]}>(`http://localhost:7890/keys`);
      return res.tests.map(({id}) => id)
    } catch (e) {
      console.error(e)
    }
    return []
  };

  get = async (id: string) => {
    try {
      return await axios.get<string, string>(`http://localhost:7890/?id=${id}`);
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  delete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:7890/?id=${id}`)
    } catch (e) {
      console.error(e);
    }
  };
}

export const asyncStorageClient = new AsyncStorageClient();
