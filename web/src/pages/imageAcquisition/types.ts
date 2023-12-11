import {IRootStore} from "../../stores/types.ts";
import {RefObject} from "react";
import {CameraType} from "react-camera-pro";

export interface IImageAcquisitionStore {
    rootStore: IRootStore;
    ref: RefObject<CameraType>;
    errorMessages: {
        noCameraAccessible?: string;
        permissionDenied?: string;
        switchCamera?: string;
        canvas?: string;
    }

    takePhoto: () => void;
}

export interface IImageAcquisitionPageType {
    imageAcquisitionStore?: IImageAcquisitionStore;
}