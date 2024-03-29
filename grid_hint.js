const contentObj = grid;

const contentName = contentObj.name;
const difficulty = contentObj.difficulty;

addObj(svg, "rect", ["width", 900, "height", 1600, "fill", "#EEEEEE"])

const hintText = [
    [
        "全てのブロックに×がつかない",
        "状態で配置することが、",
        "クリアの条件です。",
        "×がつかないマスに注目すると",
        "法則が分かりやすいかも",
        "しれません。",
    ],
    [
        "真ん中の点を中心に、",
        "点対称に配置すると×が",
        "消えるようです。しかし、",
        "ブロックは合計で奇数マス分",
        "なので、このままではどう配置",
        "しても点対称にはできません。",
        "何かほかにできることは",
        "ないでしょうか。",
    ],
    [
        "出てくるブロックを変える",
        "方法が存在します。",
    ],
    [
        "全てのブロックを点対称に",
        "配置することがクリア条件です。",
        "ブロックが合計7マス分で、",
        "奇数マスではどう配置しても",
        "点対称にはなりませんが、",
        "一番小さいブロックを",
        "「NEXT」のところに置くことで",
        "次に出てくるブロックを2×2の",
        "大きいブロックにすることが",
        "できます。└ブロックを左下に、",
        "┐ブロックを右上に、大きい",
        "ブロックを真ん中に置くと",
        "クリアできます。",
    ]
];