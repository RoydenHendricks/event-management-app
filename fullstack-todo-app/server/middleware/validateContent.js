// function that checks the length of the description
const validateContent = (req, res, next) => {
  // getting the description from the request body
  const { description } = req.body;

  // if no description was provided return a message
  if (!description) {
    return res.status(400).json({ message: "No description was provided" });
  }

  // if the description is greater than 40 characters return a message
  if (description.length > 140) {
    return res
      .status(400)
      .json({ message: "Description can not exceed 40 characters" });
  }

  next();
};

module.exports = validateContent;
