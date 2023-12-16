import {Component, ReactNode} from 'react';

import {inject, observer} from 'mobx-react';
import type {IHistoricalDataPage} from './types';
import type {IStores} from '../../stores/types';
import {Card, Image, List} from "antd";

@inject(({historicalDataStore}: IStores) => ({historicalDataStore}))
@observer
export class HistoricalDataPage extends Component<IHistoricalDataPage> {
  render(): ReactNode {
    const {historicalDataStore} = this.props;
    console.log(
      'log historicalDataStore?.historicalDatas:',
      historicalDataStore?.historicalDatas?.length,
    );
    return (
        <div>
            <div style={{
                paddingTop: '3rem',
                paddingBottom: '1rem',
                display: 'flex',
                justifyContent: 'center',
                fontSize: '1.2rem',
            }}>
                实验数据
            </div>
            <div
                id="scrollableDiv"
                style={{
                    height: 750,
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
            >
                <List
                    dataSource={historicalDataStore?.historicalDatas}
                    renderItem={({timestamp, rgbBase64}, id) => {
                        const date = new Date(Number(timestamp));
                        return (
                            <List.Item
                                key={timestamp}
                               onClick={() => {
                                   historicalDataStore!.setCheckedDataId(id);
                               }}
                            >
                                <Card title={`${date.toLocaleString()} 实验`} style={{
                                    height: '14rem',
                                    width: '100%',
                                }} bodyStyle={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}>
                                    <Image
                                        width="8rem"
                                        height="8rem"
                                        src={rgbBase64}
                                        alt="Picture of a Flower"
                                    />
                                </Card>
                            </List.Item>
                        )
                    }}
                />
            </div>
        </div>
    );
  }
}
