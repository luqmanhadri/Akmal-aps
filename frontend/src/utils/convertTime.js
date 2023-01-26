export const convertTime = (time) => {
    return new Date(time).toLocaleDateString('en-GB' ,{
        year: 'numeric',
        month: 'long',
        day: "numeric",
    })
}