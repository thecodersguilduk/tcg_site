require("dotenv").config({ path: "../../.env" });
const axios = require("axios");

const MONDAY_API_KEY = process.env.MONDAY_API_KEY;
const BOARD_ID = process.env.POLICIESBOARD_ID;

const policies = async () => {
  try {
    const url = `https://api.monday.com/v2/`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: MONDAY_API_KEY,
    };

    const query = `query {
                boards(ids: ${BOARD_ID}) {
                  items{
                    name
                    column_values(ids : ["checkbox", "file"]){
                      id
                      value
                    }
                  }
                }
              }
            `;

    const response = await axios.post(url, { query }, { headers });

    const items = response.data.data.boards[0].items;
    const filteredItems = items.filter((item) => {
      const checkboxValue = item.column_values.find(
        (column) => column.id === "checkbox"
      );

      if (checkboxValue.value) {
        const checkboxData = JSON.parse(checkboxValue.value);
        return checkboxData.checked === "true";
      }

      return false;
    });

    const mappedItems = filteredItems.map((item) => {
      const columnValues = item.column_values;
      let fileLink;

      if (columnValues) {
        const parsedColumnValues = JSON.parse(columnValues[0].value);
        fileLink = parsedColumnValues.files[0].linkToFile;
      } else {
        fileLink = "";
      }

      return {
        name: item.name,
        link: fileLink,
      };
    });

    return mappedItems;
  } catch (error) {
    console.error("Error fetching data from Monday.com API:", error);
    return error;
  }
};

console.log(policies());

module.exports = policies;
