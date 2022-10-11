function infoObj(name, date, difficulty)
{
    this.name = name;
    this.date = date;
    this.difficulty = difficulty;
}

const grid = new infoObj("grid", "2022年10月7日", ["1.3", "1.2", "1.1", "0.7"]);

let allInfo = {};
allInfo.grid = grid;
allInfo.sort = new infoObj("sort", "2022年10月14日", ["1.3", "1.2", "1.1", "0.7"]);
allInfo.art = new infoObj("art", "2022年10月14日", ["1.3", "1.2", "1.1", "0.7"]);