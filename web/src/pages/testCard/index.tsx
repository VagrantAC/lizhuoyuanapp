import {inject, observer} from 'mobx-react';
import {Component, ReactNode} from 'react';
import {ITestCardPage} from './types';
import {IStores} from "../../stores/types.ts";
import {StepBackwardOutlined, StepForwardOutlined} from "@ant-design/icons";
import {Image} from "antd-mobile";
import {getColor, getGray, rgbToHsv} from "./utils.ts";

@inject(({historicalDataStore}: IStores) => ({historicalDataStore}))
@observer
export class TestCardPage extends Component<ITestCardPage> {
  render(): ReactNode {
    const {historicalDataStore} = this.props;
    const checkedData = historicalDataStore?.getCheckedData();
    const color = getColor(checkedData?.avgRgbColor?.r, checkedData?.avgRgbColor?.g, checkedData?.avgRgbColor?.b);
    const hsv = rgbToHsv(checkedData?.avgRgbColor?.r, checkedData?.avgRgbColor?.g, checkedData?.avgRgbColor?.b);
    const gray = getGray(checkedData?.avgRgbColor?.r, checkedData?.avgRgbColor?.g, checkedData?.avgRgbColor?.b);
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
                paddingLeft: '0.5rem',
                fontSize: '1rem',
            }}>原照片
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '0.5rem',
            }}>
                <Image src={checkedData?.rgbBase64} height="40%" width="40%"/>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <div style={{
                    width: '40%',
                    height: '1rem',
                    backgroundColor: color,
                }}/>
            </div>
            <div style={{
                paddingLeft: '0.5rem',
                fontSize: '1rem',
            }}>灰度照片
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '0.5rem',
            }}>
                <Image src={checkedData?.hsvBase64} height="40%" width="40%"/>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                fontSize: '1rem',
            }}>
                {`H: ${hsv.h.toFixed(1)}, `}
                {`S: ${hsv.s.toFixed(4)}, `}
                {`V: ${hsv.v.toFixed(4)}.`}
                <br/>
                {`灰度值: ${gray.toFixed(6)}`}
            </div>
        </div>
    )
        ;
  }
}
