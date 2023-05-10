export const typeImage = (filename : string) : string =>{
    if ( /\.(jpe?g|png|gif|bmp|webp)$/i.test(filename) ) {
        return 'url_cover'
    }

    if ( /\.(mp4|wmv)$/i.test(filename) ) {
        return 'url_video'
    }

    return 'not_found';

}