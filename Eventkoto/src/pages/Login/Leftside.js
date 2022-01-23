import banner from "../../images/banner.png"

function LeftSide() {
    return ( 
        <>
            <img src={banner} />
            <h2 className="animate__animated animate__fadeIn">EVENTKOTO</h2>
            <p className="animate__animated animate__fadeIn px-12">Your one-stop shop at executing large-scale events, conferences, conventions, concerts, trade shows, festivals, and ceremonies and ensuring that you can enjoy each and every event happening at your school</p>
        </>
     );
}

export default LeftSide;
