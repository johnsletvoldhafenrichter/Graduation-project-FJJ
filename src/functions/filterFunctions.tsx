export async function getCoursesByFilter(str: string) {
    let filteredCourses: any;
    switch(str) {
        case 'Kategori':
            filteredCourses = await ['Kategori', 'Kategori'];
            break;
        case 'Lokasjon':
            filteredCourses = await ['Lokasjon', 'Lokasjon'];
            break;
        case 'Posisjon':
            filteredCourses = await ['Posisjon', 'Posisjon'];
            break;
        case 'Spesialisering':
            filteredCourses = await ['Spesialisering', 'Spesialisering'];
            break;
    }
    return filteredCourses;
}