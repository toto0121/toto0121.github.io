function infoObj(name, date, difficulty)
{
    this.name = name;
    this.date = date;
    this.difficulty = difficulty;
}

const grid = new infoObj("grid", "2022年10月7日", ["1.3", "1.2", "1.1", "0.7"]);

let allInfo = {};
allInfo.grid = grid;
allInfo.art = new infoObj("art", "2022年10月14日", ["1.2", "1.0", "0.9", "0.6"]);
allInfo.spin = new infoObj("spin", "2022年10月21日", ["1.7", "1.5", "1.1", "0.7"]);
allInfo.bingo = new infoObj("bingo", "2022年10月28日", ["1.2", "1.1", "1.0", "0.6"]);
allInfo.coin = new infoObj("coin", "2022年11月4日", ["1.2", "1.1", "1.0", "0.6"]);