import {inject, observer} from 'mobx-react';
import {Component, ReactNode} from 'react';
import {ITestCardPage} from './types';
import {IStores} from "../../stores/types.ts";
import {StepBackwardOutlined, StepForwardOutlined} from "@ant-design/icons";
import {Image} from "antd-mobile";

@inject(({historicalDataStore}: IStores) => ({historicalDataStore}))
@observer
export class TestCardPage extends Component<ITestCardPage> {
  render(): ReactNode {
    const {historicalDataStore} = this.props;
    const checkedData = historicalDataStore?.getCheckedData();
    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                fontSize: '1.6rem',
                padding: '1rem',
            }}>
                <div>
                    <StepBackwardOutlined onClick={() => {
                        historicalDataStore?.setCheckedDataId(
                            Number(historicalDataStore?.checkedDataId) - 1,
                        );
                    }}/>
                </div>

                <div>
                    #第{Number(historicalDataStore?.checkedDataId) + 1}次实验
                </div>

                <div>
                    <StepForwardOutlined onClick={() => {
                        historicalDataStore?.setCheckedDataId(
                            Number(historicalDataStore?.checkedDataId) - 1,
                        );
                    }}/>
                </div>
            </div>
            <div style={{
                padding: '0.5rem',
                fontSize: '1rem',
            }}>原照片
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '1rem',
            }}>
                <Image src={checkedData?.rgbBase64} height="40%" width="40%"/>
            </div>
            <div style={{
                padding: '0.5rem',
                fontSize: '1rem',
            }}>灰度照片
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '1rem',
            }}>
                <Image src={checkedData?.hsvBase64} height="40%" width="40%"/>
            </div>
        </div>
    )
        ;
  }
}
