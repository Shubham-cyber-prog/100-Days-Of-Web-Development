export const StoryNodes = {
    'START': {
        description: "SYSTEM_REBOOT_COMPLETE. You are inside a Cryo Chamber. The air is thick with frost. A diagnostic screen flickers in front of you.",
        actions: {
            look: (engine) => "You see several frozen tubes. One is open. A maintenance panel is sparking nearby.",
            scan: (engine) => {
                engine.player.energy -= 5;
                return "SCAN_COMPLETE: Identified [MAINTENANCE_PANEL]. Risk level: LOW.";
            },
            move: (engine) => {
                engine.processNode('CORRIDOR_A');
                return "Moving to SECTOR: CORRIDOR_A...";
            }
        }
    },
    'CORRIDOR_A': {
        description: "The corridor is dark. Red emergency lights pulse like a slow heartbeat. To the north is the Bridge, to the south is Life Support.",
        actions: {
            look: (engine) => "Security cameras are offline. There's a data pad on the floor.",
            pick: (engine) => {
                engine.player.inventory.push("DATA_PAD");
                return "Item [DATA_PAD] added to Logistics Deck.";
            },
            move: (engine) => "Specify destination: Bridge or Life_Support."
        }
    }
};
