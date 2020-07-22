import * as React from 'react';
import { Text } from '@fluentui/react';
import { Helper, V3 } from 'dxf';
import { sketchupEmitter, SketchUpReceiver, ImportInputData, ImportedGeometry, Point3d, setSketchUpReceiver } from '../lib/sketchup';
import { SVG } from './SVG';

const v3ToPoint3d = (v: V3): Point3d => [v.x, v.y, v.z];

interface State {
    svg?: string;
}

export class App extends React.Component<{}, State> implements SketchUpReceiver {
    
    constructor(props: any) {
        super(props);

        this.state = {};
        setSketchUpReceiver(this);
    }
    
    render() {
        return <div>
            <Text variant={'mega'} block>
                Hello, React!
            </Text>

            <div>
                {this.state.svg && <SVG html={this.state.svg}/>}
            </div>
        </div>;
    }

    componentDidMount() {
        sketchupEmitter.getImportInput();
    }

    componentWillUnmount() {
        setSketchUpReceiver(undefined);
    }

    receiveImportInput(data: ImportInputData) {
        const helper = new Helper(data.fileContents);
        
        this.setState({ svg: helper.toSVG() });

        const geom: ImportedGeometry = {
            opName: 'Import',
            lines: helper.denormalised.map(entity => ({
                start: v3ToPoint3d(entity.start),
                end: v3ToPoint3d(entity.end),
            }))
        };

        // sketchupEmitter.insertGeometry(geom);
    }
}