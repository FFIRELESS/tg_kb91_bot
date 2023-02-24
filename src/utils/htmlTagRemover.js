module.exports = removeTags = (string) => {
    return string.replace(/( |<([^>]+)>)/ig, "");
}