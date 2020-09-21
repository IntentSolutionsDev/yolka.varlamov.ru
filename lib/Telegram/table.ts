import { table, getBorderCharacters } from "table";

const voidBorder = getBorderCharacters("void");
voidBorder.bodyJoin = " ";

const options = {
  border: voidBorder,
  columnDefault: {
    paddingLeft: 0,
    paddingRight: 1,
  },
  drawHorizontalLine: () => false,
};

const createTable = (data: string[][]): string => {
  if (data.length === 0) {
    return "Нет данных";
  }

  const lines = table(data, options);

  return `\`\`\`\n${lines}\`\`\``;
};

export default createTable;
