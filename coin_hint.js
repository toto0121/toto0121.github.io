const contentObj = allInfo.coin;

const contentName = contentObj.name;
const difficulty = contentObj.difficulty;

addObj(svg, "rect", ["width", 900, "height", 1600, "fill", "#EEEEEE"])

const hintText = [
    [
        "C,O,I,Nを1文字ずつ表示",
        "させることで、",
        "クリア条件を満たすことが",
        "できます。",
        "3列のコインはいずれも",
        "C,O,I,Nに1文字ずつ",
        "対応しているので、",
        "それを1つずつ押せば",
        "銅ランククリアはできます。"
    ],
    [
        "コインを押したときに、",
        "押したコインとは異なる",
        "表示に変化することが",
        "あります。その条件を",
        "整理してみましょう。",
        "変化のパターンは",
        "2通りあります。"
    ],
    [
        "XX IN XX、もしくは",
        "XX ON XX となるボタンの",
        "押し方をすると、",
        "INやONが前置詞である",
        "かのように文字が配置",
        "されます。",
        "金ランククリアには、",
        "前置詞を2つ使って",
        "COINを1文字ずつ表示する",
        "必要があります。"
    ],
    [
        "3列のコインはCOINを表し、",
        "押したコインでできる文が",
        "上に表示されます。",
        "ただし、INやONが含まれる",
        "文はそれが前置詞として",
        "読まれます。",
        "クリア条件はCOINを1文字ずつ",
        "表示させることですが、",
        "その際に押したコインの",
        "枚数によってクリアランクが",
        "変化します。金ランクには",
        "最大の8枚のコインを押す",
        "必要があり、その押し方は",
        "C ON I IN IN しかありません。"
    ]
];