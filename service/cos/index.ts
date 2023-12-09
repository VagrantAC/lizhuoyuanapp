import axios from 'axios';

export class COSClient {
  axios = axios.create({
    baseURL:
      'https://lizhuoyuan-rn-project-1305502573.cos.ap-nanjing.myqcloud.com/apk',
  });
  async getNewVersion() {
    try {
      const res = await this.axios.get<string>('/VERSION');
      return res.data;
    } catch (e) {
      console.error(e);
    }
    return '';
  }
}

export const cosClient = new COSClient();
