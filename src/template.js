/**
 * Html
 * This Html.js file acts as a template that we insert all our generated
 * application strings into before sending it to the client.
 */
module.exports = function (body, title) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${title}</title>
        <link href="css/bootstrap.min.css" rel="stylesheet" >
        <link href="css/main.css" rel="stylesheet">
      </head>
      <body>
        <div class="HcardApp">${body}</div>
        <script src="https://unpkg.com/react@15/dist/react.js"></script>
        <script src="https://unpkg.com/react-dom@15/dist/react-dom.js"></script>
        <script src="js/main.js"></script>
      </body>
    </html>
  `;
};
