const tableSection = document.getElementById("table-container");

const getFromLS = () => {
  // check if we have anything in the LS
  const highscores = localStorage.getItem("highscores");
  if (highscores) {
    // parse object in ls
    return JSON.parse(highscores);
  } else {
    return [];
  }
};

const creatTable = () => {
  // creat table element
  const table = document.createElement("table");
  table.setAttribute("class", "score-table");

  // create tr element
  const tableRow = document.createElement("tr");
  tableRow.setAttribute("class", "table");

  const tableheader1 = document.createElement("th");
  tableheader1.setAttribute("class", "table-title");
  tableheader1.textContent = "RANK";

  const tableheader2 = document.createElement("th");
  tableheader2.setAttribute("class", "table-title");
  tableheader2.textContent = "NAME";

  const tableheader3 = document.createElement("th");
  tableheader3.setAttribute("class", "table-title");
  tableheader3.textContent = "SCORE";

  // append section and main
  tableRow.append(tableheader1, tableheader2, tableheader3);
  table.append(tableRow);
  let data = getFromLS();
  console.log(data);
  data = data.sort((a, b) => b.usersScore - a.usersScore);

  const renderScore = (score, index) => {
    // create tr element
    const tableRow = document.createElement("tr");
    tableRow.setAttribute("class", "table");

    // create td element
    const tableData1 = document.createElement("td");
    tableData1.setAttribute("class", "table-info");
    tableData1.textContent = index + 1;

    const tableData2 = document.createElement("td");
    tableData2.setAttribute("class", "table-info");
    tableData2.textContent = score.usersName;

    const tableData3 = document.createElement("td");
    tableData3.setAttribute("class", "table-info");
    tableData3.textContent = score.usersScore;

    tableRow.append(tableData1, tableData2, tableData3);
    table.append(tableRow);
  };

  data.forEach(renderScore);

  tableSection.append(table);
};

const onLoad = () => {
  // creat the dynamic table
  creatTable();
};

window.onload = onLoad;
