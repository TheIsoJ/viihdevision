export function getInitials(fullName: string) {
    var initials: string = ""
    const parts = fullName.split(" ")
    for (let i = 0; i < parts.length; i++) {
        if (parts[i].length > 0 && parts[i] !== "") {
            initials += parts[i][0]
        }
    }
    return initials
}