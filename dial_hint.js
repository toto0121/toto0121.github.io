const contentName = "dial";
const difficulty = ["2.0", 1.8, 1.2, 0.7];

addObj(svg, "rect", ["width", 900, "height", 1600, "fill", "#EEEEEE"])

const hintText = [
    [
        "丸ボタンを何度も押すと",
        "黒い線が回転します。",
        "黒い線がある条件を満たすと",
        "その下のランプが点灯します。",
        "12個あるランプには、左上から",
        "1~12の番号が振られています。",
        "(上段が1~6、下段が7~12。)",
        "これらを全て点灯させることが",
        "クリア条件です。"
    ],
    [
        "黒線の角度と、灰色の長方形に",
        "意味があります。ランプの配置は",
        "関係ありません。",
        "黒い線のうち1本だけが縦向きで、",
        "残りが横向きのとき1のランプが",
        "点灯します。同様に、2本だけが",
        "縦向きだと2のランプが、",
        "3本だけが縦向きだと3のランプが",
        "点灯します。しかし4本のときは",
        "反応しません。縦に1本~3本の",
        "線と数字の対応といえば何が",
        "あるでしょうか。"
    ],
    [
        "隣り合う二つの黒線を＼／の",
        "状態にし、残りを横向きに",
        "すると、10番目のランプが",
        "点灯します。黒い線の延長線が",
        "長方形と重なる部分に着目",
        "すれば、法則は分かるはずです。"
    ],
    [
        "黒い線の延長線と長方形の重なる",
        "部分に現れる形がローマ数字と",
        "一致するとき、それに対応する",
        "ランプが点灯する仕組みになって",
        "いました。IからXIIまで全ての",
        "ローマ数字を作ることで",
        "全てのランプを点灯させることが",
        "できます。"
    ]
];