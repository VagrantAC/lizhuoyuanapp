import {inject, observer} from 'mobx-react';
import {Component, ReactNode} from 'react';
import {IPageController, IPagesKey} from './types';
import {ImageAcquisitionPage} from './imageAcquisition';
import {MinePage} from './mine';
import {HistoricalDataPage} from './historicalData';
import {MediaPage} from './media';
import {TestCardPage} from './testCard';
import {IStores} from "../stores/types.ts";
import {BarChartOutlined, CameraOutlined, UserOutlined} from "@ant-design/icons";
import {TabBar} from "antd-mobile";

@inject(({pageControllerStore}: IStores) => ({pageControllerStore}))
@observer
export class PageController extends Component<IPageController> {
  render(): ReactNode {
    const {pageControllerStore} = this.props;
    const tabBars = [
        {
            key: IPagesKey.ImageAcquisition,
            desc: '图像采集',
            icon: <CameraOutlined />,
        },
        {
            key: IPagesKey.HistoricalData,
            desc: '历史数据',
            icon: <BarChartOutlined />,
        },
        {
            key: IPagesKey.Mine,
            desc: '我的',
            icon: <UserOutlined />,
        },
    ];
    return (
      <>
        <div style={{
            height: '92%',
            width: '100%',
        }}>
          {pageControllerStore?.checkedPage === IPagesKey.ImageAcquisition ? (
            <ImageAcquisitionPage />
          ) : null}
          {pageControllerStore?.checkedPage === IPagesKey.Mine ? (
            <MinePage />
          ) : null}
          {/*{pageControllerStore?.checkedPage === IPagesKey.HistoricalData ? (*/}
          {/*  <HistoricalDataPage />*/}
          {/*) : null}*/}
          {/*{pageControllerStore?.checkedPage === IPagesKey.Media ? (*/}
          {/*  <MediaPage />*/}
          {/*) : null}*/}
          {pageControllerStore?.checkedPage === IPagesKey.TestCard ? (
            <TestCardPage />
          ) : null}
        </div>
          <TabBar style={{
              position: 'absolute',
              bottom: '1rem',
              width: '100%'
          }}
          onChange={(key) => {
              pageControllerStore?.setCheckedPage(tabBars[Number(key)].key);
          }}>
            {tabBars.map(({key, desc, icon}) => {
              return <TabBar.Item key={key} icon={icon} title={desc} />;
            })}
          </TabBar>
          </>
    );
  }
}
