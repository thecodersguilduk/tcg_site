require("dotenv").config({ path: "../../.env" });
const axios = require("axios");

const MONDAY_API_KEY = process.env.MONDAY_API_KEY;
const BOARD_ID = process.env.POLICIESBOARD_ID;

const fetchPolicies = async () => {
  try {
    const url = `https://api.monday.com/v2/`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: MONDAY_API_KEY,
    };

    const query = `query {
      boards(ids: ${BOARD_ID}) {
        items {
          name
          column_values(ids: ["checkbox", "checkbox5", "file"]) {
            id
            value
          }
        }
      }
    }`;

    const response = await axios.post(url, { query }, { headers });

    const items = response.data.data.boards[0].items;
    const policies = items.map((item) => {
      const isPublicCheckbox = item.column_values.find(
        (column) => column.id === "checkbox"
      );

      const checkbox5Value = item.column_values.find(
        (column) => column.id === "checkbox5"
      );

      const parsedPublicCheckboxValue = isPublicCheckbox.value
        ? JSON.parse(isPublicCheckbox.value)
        : "false";

      const parsedCheckbox5Value = checkbox5Value.value
        ? JSON.parse(checkbox5Value.value)
        : "false";

      const fileValue = item.column_values.find(
        (column) => column.id === "file"
      );

      const inFooter =
        checkbox5Value && parsedCheckbox5Value.checked === "true";

      const isPublic =
        isPublicCheckbox && parsedPublicCheckboxValue.checked === "true";

      let fileLink = "";
      if (fileValue) {
        const parsedFileValue = JSON.parse(fileValue.value);
        if (parsedFileValue.files.length > 0) {
          fileLink = parsedFileValue.files[0].linkToFile;
        }
      }

      return {
        name: item.name,
        inFooter: inFooter,
        fileLink: fileLink,
        isPublic: isPublic,
      };
    });

    return policies;
  } catch (error) {
    console.error("Error fetching data from Monday.com API:", error);
    return error;
  }
};

module.exports = fetchPolicies;
