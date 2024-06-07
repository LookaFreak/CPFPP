// import TempImg from "Assets/Images/noImg.png"

const ImgURL = (imgObj) => {
    // let BaseUrl = window.location.CustomURL;
    let BaseUrl = process.env?.REACT_APP_BASE_URL + "/static";
    if (imgObj && imgObj?.storage && imgObj?.url) {
        if (imgObj?.storage == "local") {
            return `${BaseUrl}/${imgObj?.url}`
        } else if (imgObj?.storage == "react") {
            return imgObj?.url
        } else if (imgObj?.storage == "aws_s3") {
            return imgObj?.url
        }
    } else {
        // return TempImg
        return imgObj
    }
}

export default ImgURL