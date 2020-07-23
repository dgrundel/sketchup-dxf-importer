import { PrimaryButton } from '@fluentui/react';
import { Helper, V3 } from 'dxf';
import * as React from 'react';
import { ImportedGeometry, ImportInputData, Point3d, setSketchUpReceiver, sketchupEmitter, SketchUpReceiver } from '../lib/sketchup';
import { Unit, convertV3ToInches } from '../lib/units';
import { SVG } from './SVG';
import { UnitDropdown } from './UnitDropdown';

const v3ToPoint3d = (v: V3): Point3d => [v.x, v.y, v.z];

interface State {
    helper?: Helper;
    fileUnits: Unit;
}

export class App extends React.Component<{}, State> implements SketchUpReceiver {
    
    constructor(props: any) {
        super(props);

        this.state = {
            fileUnits: Unit.in,
        };
        setSketchUpReceiver(this);
    }
    
    render() {
        return <div>
            <div>
                {this.state.helper && <SVG html={this.state.helper.toSVG()}/>}
            </div>
            <p>
                <UnitDropdown 
                    label="DXF File Units"
                    onChange={this.setFileUnits.bind(this)}
                />
            </p>
            <p style={{ textAlign: 'right' }}>
                <PrimaryButton text="Import" onClick={this.insertGeometry.bind(this)} />
            </p>
        </div>;
    }

    componentDidMount() {
        sketchupEmitter.getImportInput();
    }

    componentWillUnmount() {
        setSketchUpReceiver(undefined);
    }

    setFileUnits(fileUnits?: Unit) {
        if (fileUnits) {
            this.setState({ fileUnits });
        }
    }

    receiveImportInput(data: ImportInputData) {
        const helper = new Helper(data.fileContents);
        this.setState({ helper });
    }

    insertGeometry() {
        const helper = this.state.helper;
        const fileUnits = this.state.fileUnits;
        if (helper) {


            const geom: ImportedGeometry = {
                opName: 'Import',
                lines: helper.denormalised.map(entity => ({
                    start: v3ToPoint3d(convertV3ToInches(entity.start, fileUnits)),
                    end: v3ToPoint3d(convertV3ToInches(entity.end, fileUnits)),
                }))
            };
    
            sketchupEmitter.insertGeometry(geom);
        }
    }
}