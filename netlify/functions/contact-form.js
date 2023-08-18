const axios = require("axios");

exports.handler = async (event, context) => {
  console.log(event);

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const formData = JSON.parse(event.body);

  console.log("Console log line 17" + formData);
  // Construct the GraphQL mutation query
  const mutationQuery = `
   mutation CreateItem($boardId: Int!, $itemName: String!, $columnValues: JSON!) {
     create_item(board_id: $boardId, item_name: $itemName, column_values: $columnValues) {
       id
     }
   }
  `;

  const variables = {
    boardId: process.env.CONTACTBOARD_ID, // Replace with your actual board ID
    itemName: formData.name,
    columnValues: {
      email: formData._replyto,
      phone: formData.phone,
      message: formData.message,
      status: getStatusLabel(formData.options),
    },
  };

  try {
    // Send data to Monday.com using the API
    const response = await axios.post(
      process.env.MONDAY_API,
      { query: { mutationQuery, variables } },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          Authorization: process.env.MONDAY_API_KEY, // Replace with your actual Monday.com API key
        },
      }
    );

    console.log("Monday.com response:", response.data);

    return {
      statusCode: 302, // Redirect
      headers: {
        Location: "http://localhost:8888/thanks-contact", // Redirect to the thank you page
      },
      body: "",
    };
  } catch (error) {
    console.error("Error sending data to Monday.com:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};

// Implement the getStatusLabel function
function getStatusLabel(selectedOption) {
  // Implement the logic to map your form select options to Monday.com status labels
  // For example:
  if (selectedOption === "I'm looking to hire an apprentice") {
    return "Hiring Apprentice";
  } else if (selectedOption === "I'm applying for a course") {
    return "Applying for a course";
  } else if (selectedOption === "Something else") {
    return "General";
  } else if (
    selectedOption === "I'm currently a learner on a Coders Guild programme"
  ) {
    return "Current Learner";
  } else if (selectedOption === "I'm from the media") {
    return "Media";
  } else {
    return "General"; // Replace with an appropriate default status
  }
}
