const contentName = "alter";

addObj(svg, "rect", ["width", 900, "height", 1600, "fill", "#EEEEEE"])

const hintText = [
    [
        "丸ボタンを何度も押すと",
        "ENTERボタンが緑色に点灯",
        "します。まずは点灯する条件を",
        "整理することが解読への",
        "近道です。例えば、同じ",
        "ボタンを連打した場合、",
        "左上のボタンは2回、その",
        "右隣は7回、その右隣は13回",
        "でENTERが点灯します。",
        "下の段の左端は63回で、",
        "残りの二つはもっと押す",
        "必要があるようです。"
    ],
    [
        "ボタンを押すと何かが一定値",
        "加算され、その合計がある値に",
        "達するとENTERが点灯する",
        "ようです。各ボタンの持つ",
        "正確な値は分からなくとも、",
        "おおよその比をつきとめる",
        "ことはできます。このような",
        "比を持つ、身近にある何かが",
        "この謎の題材となっています。",
        "全部で6種類あるのもヒントに",
        "なると思います。"
    ],
    [
        "ずばり、ボタンは日本の硬貨に",
        "対応しています。硬貨を",
        "一定金額以上選択すると、",
        "商品が購入可能になりENTERが",
        "点灯します。そしてscoreに",
        "ついてですが、これは「支払った",
        "硬貨の枚数」と何かの和に",
        "なっています。実際に買い物を",
        "する際、この値をどうしたいかを",
        "考えれば、おのずとクリア条件を",
        "導くことができるはずです。"
    ],
    [
        "ボタンは日本の硬貨に",
        "対応していました。硬貨を",
        "一定金額以上選択すると、",
        "商品が購入可能になりENTERが",
        "点灯します。6種の硬貨を使って",
        "実験すると、商品は623円だと",
        "分かります。(この謎の公開日",
        "に対応しています。) そして",
        "scoreは支払いとお釣りの",
        "硬貨の合計枚数を表していま",
        "した。これが最小になる支払い",
        "が現実では理想的であり、",
        "かつこの謎のクリア条件です。",
    ]
];