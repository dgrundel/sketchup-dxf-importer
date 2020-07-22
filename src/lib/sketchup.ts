
// const UNIT_NAMES = ['in', 'ft', 'mm', 'cm', 'm', 'yd'];

// convert from inches, which Sketchup uses internally
// const CONVERT_FROM_INCHES: Array<(n: number) => number> = [
//     n => n, // 'in'
//     n => n/12.0, // 'ft',
//     n => n*25.4, // 'mm',
//     n => n*2.54, // 'cm',
//     n => n*0.0254, // 'm',
//     n => n/36.0 // 'yd'
// ];

// const CONVERT_TO_INCHES: Array<(n: number) => number> = [
//     n => n, // 'in'
//     n => n*12.0, // 'ft',
//     n => n/25.4, // 'mm',
//     n => n/2.54, // 'cm',
//     n => n/0.0254, // 'm',
//     n => n*36.0 // 'yd'
// ];

export interface ImportInputData {
    modelUnits: number; // Sketchup.active_model.options['UnitsOptions']['LengthUnit'],
    fileContents: string;
}

export type Point3d = [number, number, number];

export interface Line {
    start: Point3d;
    end: Point3d;
}

export interface ImportedGeometry {
    opName: string;
    lines: Line[];
}

export interface SketchUpReceiver {
    receiveImportInput: (data: ImportInputData) => void;
}

const assertSketchUpReceiver = () => {
    const receiver = (window as any).sketchUpReceiver;
    if (!receiver) {
        throw new Error('window.sketchUpReceiver is undefined!');
    }
};

export const setSketchUpReceiver = (receiver: SketchUpReceiver) => {
    (window as any).sketchUpReceiver = receiver;
}

interface SketchupWindow {
    getImportInput: () => void;
    insertGeometry: (geometry: string) => void;
}

class SketchupEmitter {
    private readonly sketchup: SketchupWindow = (window as any).sketchup;

    getImportInput() {
        assertSketchUpReceiver();
        this.sketchup.getImportInput();
    }

    insertGeometry (geometry: ImportedGeometry) {
        assertSketchUpReceiver();
        this.sketchup.insertGeometry(JSON.stringify(geometry));
    };
}

export const sketchupEmitter = new SketchupEmitter();
