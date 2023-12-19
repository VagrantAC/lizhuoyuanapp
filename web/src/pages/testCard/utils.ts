export function getColor(r: number = 0xff, g: number = 0xff, b: number = 0xff) {
    return `rgb(${r}, ${g}, ${b})`;
}

export function rgbToHsv(r: number = 0xff, g: number = 0xff, b: number = 0xff) {
    r /= 255;
    g /= 255;
    b /= 255;
    const maxValue = Math.max(r, g, b);
    const minValue = Math.min(r, g, b);

    const delta = maxValue - minValue;
    const eps = 1e-6;

    let h;
    if (delta < eps) {
        h = 0;
    } else if (Math.abs(maxValue-r) < eps && g >= b) {
        h = 60 * (g-b) / (maxValue-minValue);
    } else if (Math.abs(maxValue-r) < eps && g < b) {
        h = 60 * (g-b) / (maxValue-minValue) + 360;
    } else if (Math.abs(maxValue-g) < eps) {
        h = 60 * (b - r) / delta + 120;
    } else {
        h = 60 * (r - g) / delta + 240;
    }

    const s = Math.abs(maxValue) < eps ? 0 : delta / maxValue;
    const v = maxValue;

    return { h, s, v };
}

export function getGray(r: number = 0xff, g: number = 0xff, b: number = 0xff) {
    return 0.299 * r + 0.587 * g + 0.114 *b;
}