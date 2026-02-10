/**
 * Regex Crossword Levels Data
 */

export const levels = [
    {
        id: 1,
        title: "The Beginning",
        difficulty: "Easy",
        rows: 2,
        cols: 2,
        rowRegex: ["HE|LL", "O!"],
        colRegex: ["H.O", "E.!"]
    },
    {
        id: 2,
        title: "Binary Logic",
        difficulty: "Easy",
        rows: 3,
        cols: 3,
        rowRegex: ["[01]{3}", "101", "[^1]+"],
        colRegex: ["110", "000", "110"]
    },
    {
        id: 3,
        title: "Character Classes",
        difficulty: "Medium",
        rows: 3,
        cols: 3,
        rowRegex: ["A-Z{3}", "\\d\\s\\d", "[cat]{3}"],
        colRegex: ["A\\d[ca]", "[A-S]\\sc", "[A-Z]\\dt"]
    },
    {
        id: 4,
        title: "Quantifiers",
        difficulty: "Medium",
        rows: 3,
        cols: 4,
        rowRegex: ["RE*X", "A+BC", "12{2}3", "D.F."],
        colRegex: ["RA1D", "EB2.", "XB{2}F", "..3."]
    }
];
