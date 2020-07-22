import { Helper, V3 } from 'dxf';

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

const v3ToPoint3d = (v: V3): Point3d => [v.x, v.y, v.z];

interface ImportInputData {
    modelUnits: number; // Sketchup.active_model.options['UnitsOptions']['LengthUnit'],
    fileContents: string;
}

type Point3d = [number, number, number];

interface Line {
    start: Point3d;
    end: Point3d;
}

interface ImportedGeometry {
    opName: string;
    lines: Line[];
}

interface SketchupWindow {
    getImportInput: () => void;
    insertGeometry: (geometry: string) => void;
}

class SketchupEmitter {
    private readonly sketchup: SketchupWindow = (window as any).sketchup;

    getImportInput() {
        this.sketchup.getImportInput();
    }

    insertGeometry (geometry: ImportedGeometry) {
        this.sketchup.insertGeometry(JSON.stringify(geometry));
    };
}

class SketchUpReceiver {
    receiveImportInput(data: ImportInputData) {
        const helper = new Helper(data.fileContents);
        
        // const svgElement = document.createElement('svg');
        // svgElement.innerHTML = helper.toSVG();
        // document.body.appendChild(svgElement);

        // const elem = (name: string, parent: HTMLElement, text?: string) => {
        //     const el = document.createElement(name);
        //     if (text) {
        //         el.textContent = text;
        //     }
        //     parent.appendChild(el);
        //     return el;
        // }

        // const table = elem('table', document.body);
        
        // const thead = elem('thead', table);
        // const tr = elem('tr', thead);                
        // elem('th', tr, 'group');
        // elem('th', tr, 'type');
        // elem('th', tr, 'start');
        // elem('th', tr, 'end');
        // elem('th', tr, 'layer');
        // elem('th', tr, 'colorNumber');
        
        // const tbody = elem('tbody', table);

        // Object.keys(helper.groups).forEach(group => {
        //     const entities = helper.groups[group as any];
        //     entities.forEach(entity => {
        //         const tr = elem('tr', tbody);
                
        //         elem('td', tr, group);
        //         elem('td', tr, entity.type);
        //         elem('td', tr, JSON.stringify(entity.start));
        //         elem('td', tr, JSON.stringify(entity.end));
        //         elem('td', tr, entity.layer.toString());
        //         elem('td', tr, entity.colorNumber.toString());
        //     });
        // });

        // table.appendChild(tbody);
        // document.body.appendChild(table);
        
        // console.log(helper);

        const geom: ImportedGeometry = {
            opName: 'Import',
            lines: helper.denormalised.map(entity => ({
                start: v3ToPoint3d(entity.start),
                end: v3ToPoint3d(entity.end),
            }))
        };

        sketchupEmitter.insertGeometry(geom);
    }
}

const sketchupEmitter = new SketchupEmitter();
const sketchUpReceiver = new SketchUpReceiver();
(window as any).sketchUpReceiver = sketchUpReceiver;

sketchupEmitter.getImportInput();