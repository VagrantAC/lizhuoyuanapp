import {Component, ReactNode} from 'react';

import {IMinePage} from './types';
import {observer} from 'mobx-react';

import {cosClient} from '../../service/cos';
import {VERSION} from "../../configs";
import {CloudDownloadOutlined} from "@ant-design/icons";
import {Button, message} from "antd";

@observer
export class MinePage extends Component<IMinePage> {
  render(): ReactNode {
    return (
      <div>
        <div>
          <div style={{
              paddingTop: '3rem',
              display: 'flex',
              justifyContent: 'center',
              fontSize: '1.2rem',
          }}>
            我的设置
          </div>
          <Button
              style={{
                  width: '70%',
                  height: '3rem',
                  marginTop: '3rem',
                  marginLeft: '15%',
              }}
              type="primary"
            onClick={async () => {
              const version = await cosClient.getNewVersion();
              if (version === VERSION) {
                message.info('这已经是最新版本了');
                return;
              }
              window.open(
                'https://lizhuoyuan-rn-project-1305502573.cos.ap-nanjing.myqcloud.com/apk/app-v' +
                  version, '_blank'
              );
            }}>
            <div style={{
                display: 'flex',
                paddingLeft: '1rem',
                fontSize: '1rem',
            }}>
                <CloudDownloadOutlined />
                下载最新版本
            </div>
          </Button>
        </div>
      </div>
    );
  }
}
