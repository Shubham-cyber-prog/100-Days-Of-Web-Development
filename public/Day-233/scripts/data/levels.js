export const Levels = [
    {
        name: "LEVEL_01: SYNAPSE_INIT",
        target: 1,
        initialNodes: [
            { id: 'src-1', type: 'IN', x: 100, y: 200, output: 1 },
            { id: 'src-2', type: 'IN', x: 100, y: 400, output: 1 },
            { id: 'out-1', type: 'OUT', x: 800, y: 300, output: 0 }
        ]
    },
    {
        name: "LEVEL_02: SIGNAL_SPLIT",
        target: 0,
        initialNodes: [
            { id: 'src-1', type: 'IN', x: 100, y: 300, output: 1 },
            { id: 'out-1', type: 'OUT', x: 800, y: 300, output: 0 }
        ]
    }
];
