import { Helper } from 'dxf';

interface Sketchup {
    getFile: () => void;
}

class SketchUpConnector {
    private readonly sketchup: Sketchup;

    constructor() {
        this.sketchup = (window as any).sketchup;
    }

    getFile() {
        this.sketchup.getFile();
    }

    receiveFileContents(contents: string) {
        const helper = new Helper(contents);
        const svg = helper.toSVG();

        const el = document.createElement('svg');
        el.innerHTML = svg;
        document.body.appendChild(el);
    }
}

const sketchupConnector = new SketchUpConnector();
(window as any).sketchupConnector = sketchupConnector;


const el = document.createElement('h1');
el.textContent = 'Hello, TypeScript!';
document.body.appendChild(el);

sketchupConnector.getFile();