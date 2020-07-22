import { Helper } from 'dxf';

const UNIT_NAMES = ['in', 'ft', 'mm', 'cm', 'm', 'yd'];

// convert from inches, which Sketchup uses internally
const CONVERT_FROM_INCHES: Array<(n: number) => number> = [
    n => n, // 'in'
    n => n/12.0, // 'ft',
    n => n*25.4, // 'mm',
    n => n*2.54, // 'cm',
    n => n*0.0254, // 'm',
    n => n/36.0 // 'yd'
];

const CONVERT_TO_INCHES: Array<(n: number) => number> = [
    n => n, // 'in'
    n => n*12.0, // 'ft',
    n => n/25.4, // 'mm',
    n => n/2.54, // 'cm',
    n => n/0.0254, // 'm',
    n => n*36.0 // 'yd'
];

interface Sketchup {
    getFile: () => void;
}

interface ImportData {
    modelUnits: number; // Sketchup.active_model.options['UnitsOptions']['LengthUnit'],
    fileContents: string;
}

class SketchUpConnector {
    private readonly sketchup: Sketchup;

    constructor() {
        this.sketchup = (window as any).sketchup;
    }

    getFile() {
        this.sketchup.getFile();
    }

    receiveFileContents(data: ImportData) {
        const helper = new Helper(data.fileContents);
        const svg = helper.toSVG();

        const el = document.createElement('svg');
        el.innerHTML = svg;
        document.body.appendChild(el);

        console.log(helper);
    }
}

const sketchupConnector = new SketchUpConnector();
(window as any).sketchupConnector = sketchupConnector;


const el = document.createElement('h1');
el.textContent = 'Hello, TypeScript!';
document.body.appendChild(el);

sketchupConnector.getFile();