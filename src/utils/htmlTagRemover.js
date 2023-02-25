export const removeTags = (string) => {
    return string.replace(/( |<([^>]+)>)/ig, "");
}

export default removeTags;