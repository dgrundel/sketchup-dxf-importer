import { V3 } from 'dxf';

/**
 * Order is important here.
 * The indexes match those in Sketchup.
 */
export const UNIT_LABELS = [
    'in',
    'ft',
    'mm',
    'cm',
    'm',
    'yd',
];

export enum Unit {
    in = 0,
    ft = 1,
    mm = 2,
    cm = 3,
    m = 4,
    yd = 5,
}

// convert from inches, which Sketchup uses internally
const CONVERT_FROM_INCHES: Array<(n: number) => number> = [
    n => n, // 'in'
    n => n/12.0, // 'ft',
    n => n*25.4, // 'mm',
    n => n*2.54, // 'cm',
    n => n*0.0254, // 'm',
    n => n/36.0 // 'yd'
];

export const convertFromInches = (n: number, toUnit: Unit) => CONVERT_FROM_INCHES[toUnit](n);

const CONVERT_TO_INCHES: Array<(n: number) => number> = [
    n => n, // 'in'
    n => n*12.0, // 'ft',
    n => n/25.4, // 'mm',
    n => n/2.54, // 'cm',
    n => n/0.0254, // 'm',
    n => n*36.0 // 'yd'
];

export const convertToInches = (n: number, fromUnit: Unit) => CONVERT_TO_INCHES[fromUnit](n);

export const convertV3ToInches = (v3: V3, fromUnit: Unit) => ({
    x: convertToInches(v3.x, fromUnit),
    y: convertToInches(v3.y, fromUnit),
    z: convertToInches(v3.z, fromUnit),
})