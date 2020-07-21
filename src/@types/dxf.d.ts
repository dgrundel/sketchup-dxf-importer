declare module 'dxf' {

    export interface V2 {
        x: number;
        y: number;
    }

    export interface V3 extends V2 {
        z: number;
    }

    export interface Entity {
        type: string;
        layer: number;
        colorNumber: number;
        start: V3;
        end: V3;
    }

    export interface Tables {
        layers: any;
        styles: any;
    }

    export interface ParsedDxf {
        blocks: any[];
        entities: Entity[];
        header: any;
        tables: Tables;
    }

    export interface Box2 {
        min: V2;
        max: V2;
        width: number;
        height: number;
        valid: boolean;
    }

    export type Rgb = [number, number, number];
    export type Vertex = [number, number];

    export interface Polyline {
        rgb: Rgb;
        vertices: [Vertex, Vertex];
    }

    export interface PolylineGroup {
        bbox: Box2;
        polylines: Polyline[];
    }

    export class Helper {
        constructor(contents: string);
        parsed: ParsedDxf;
        denormalised: Entity[];
        groups: Record<number, Entity[]>;
        toSVG(): string;
        toPolylines(): PolylineGroup;
    }
}