import type {IRootStore} from "../../stores/types.ts";
import {CameraType} from "react-camera-pro";
import {createRef, RefObject} from "react";
import {IImageAcquisitionStore} from "./types.ts";

export class ImageAcquisitionStore implements IImageAcquisitionStore {
    rootStore: IRootStore;

    ref: RefObject<CameraType> = createRef();

    errorMessages = {};

    constructor(rootStore: IRootStore) {
        this.rootStore = rootStore;
    }

    takePhoto() {
        const photo = this.ref?.current?.takePhoto();
        console.log(photo);
    }
}