const contentName = "just_fit";
const difficulty = [3.5, 3.2, 2.8, "2.0"];

addObj(svg, "rect", ["width", 900, "height", 1600, "fill", "#EEEEEE"])

const hintText = [
    [
        "この謎の目的は、赤い24を作る",
        "ことです。特定の入力をすると",
        "出力の数字が赤くなります。",
        "例えば、3を6回入力したときや、",
        "4を4回入力したときや、6を3回",
        "入力したときに赤くなります。",
        "ここから何か",
        "連想できないでしょうか。"
    ],
    [
        "入力の数字が2以下のときは",
        "ENTERを押すことができません。",
        "これは非常に重要な性質です。",
        "入力しているものはいったい",
        "何なのか、タイトルからも",
        "連想できるかもしれません。"
    ],
    [
        "入力しているのは、図形です。",
    ],
    [
        "入力した数字の数の辺を持つ",
        "正多角形をある頂点が中心に",
        "来るように時計回りにしきつめる",
        "操作を行っていました。数字が",
        "赤くなるのは、しきつめた図形が",
        "ぴったり1周したときです。",
        "例えば、正三角形は6つで1周し、",
        "正方形は4つで一周します。",
        "そして、出力の数字はしきつめて",
        "できた図形の辺の数を表して",
        "いました。ぴったり1周し、かつ",
        "辺が24本となる組み合わせを",
        "考えると、正三角形、正九角形、",
        "正十八角形をしきつめる",
        "場合しかありません。"
    ]
];